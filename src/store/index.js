import { createStore } from 'vuex';

const state = {
  // Track objects
  playTray: {},
  activeTrack: {},
  soundGroup: {},

  // Control settings
  volumeVal: 50,
  reverbVal: 0,
  delayVal: 0,
  paused: false,
  stopped: false,

  // Audio API objects
  audioCtx: {},
  gainNode: {},
  effectsNode: {},
  convolver: {},
  delay: {},
}

const mutations = {
  ADD_TRACK (state, payload) {
    let newTrack = payload.track;
    let key = newTrack.label;
    if ( !(key in state.playTray) ) {
      state.playTray[key] = newTrack;

      // Get mp3
      let request = new XMLHttpRequest();
      request.open('GET', newTrack.src, true);
      request.responseType = 'arraybuffer';
      request.onload = function() {
        // Convert mp3 to buffer
        payload.audioCtx.decodeAudioData(request.response, function(buffer) {
          // Add buffer and duration info to tray object
          state.playTray[key].buffer = buffer;
          state.playTray[key].duration = buffer.duration;
          state.playTray[key].durationDisp = Math.floor(buffer.duration);

          // Give the short tracks some dignity
          if ( state.playTray[key].durationDisp === 0) {
            state.playTray[key].durationDisp = 1;
          }
        }, function(e) {
          console.log("Error with decoding audio data " + e.err);
        })
      }
      request.send();
    }
  },
  REMOVE_TRACK (state, payload) {
    let doomedTrack = payload;
    if ( doomedTrack.label in state.playTray ) {
      delete state.playTray[doomedTrack.label];
    }
  },
  PLAY_TRACK (state, payload) {
    let track = payload;

    state.activeTrack = track;

    // Generate unique sound key
    let soundKey = track.label + String(Date.now());

    // Create new sound object with key and add to state.soundGroup
    state.soundGroup[soundKey] = {
      key: soundKey,
      name: track.name,
      duration: track.duration
    };

    // Temporary - the buffer will be disentangled from the play action later
    state.soundGroup[soundKey].source = state.audioCtx.createBufferSource();
    state.soundGroup[soundKey].source.buffer = track.buffer;
    state.soundGroup[soundKey].source.connect(state.effectsNode);
    state.soundGroup[soundKey].source.start();
    state.soundGroup[soundKey].source.addEventListener('ended', () => {
      delete state.soundGroup[soundKey];
    })

    state.stopped = false;
  },
  VOLUME_INPUT (state, payload) {
    state.volumeVal = payload;
    state.gainNode.gain.value = Math.pow(state.volumeVal/100,2);
  },
  REVERB_INPUT (state, payload) {
    state.reverbVal = payload;
    state.convolver.mix = state.reverbVal/100;
    state.convolver.setMix();
  },
  DELAY_INPUT (state, payload) {
    state.delayVal = payload;
    state.delay.mix = state.delayVal/100;
    state.delay.setMix();
  },
  STOP (state) {
    if (state.paused) {
      state.audioCtx.resume();
    }
    for (const soundKey in state.soundGroup){
      state.soundGroup[soundKey].source.stop();
    }
    state.paused = false;
    state.stopped = true;
  },
  PAUSE (state) {
    state.audioCtx.suspend();
    state.paused = true;
  },
  PLAY_AGAIN (state) {
    state.audioCtx.resume();
    state.paused = false;
  },
  INIT_AUDIO (state, payload) {
    // Initialize nodes
    state.audioCtx = payload.audioCtx;
    state.effectsNode = state.audioCtx.createGain();
    state.gainNode = state.audioCtx.createGain();

    // Create convolver object
    state.convolver = {
      input: state.audioCtx.createGain(),
      wetNode: state.audioCtx.createGain(),
      dryNode: state.audioCtx.createGain(),
      output: state.audioCtx.createGain(),
      mix: 0,
      setConnections() {
        this.input.connect(this.wetNode);
        this.input.connect(this.dryNode);
        this.dryNode.connect(this.output);
      },
      setMix() {
        this.dryNode.gain.value = 1 - this.mix;
        this.wetNode.gain.value = this.mix;
      },
      createConvolver() {
        let request = new XMLHttpRequest();
        let obj = this;
        // Call impulse response file to build reverb/convolver node
        request.open('GET', '/irFiles/57_IR_IR1_High_Atten.wav', true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
          state.audioCtx.decodeAudioData(request.response, function(buffer) {
            obj.convolverNode = state.audioCtx.createConvolver();
            obj.convolverNode.buffer = buffer;
            obj.wetNode.connect(obj.convolverNode);
            obj.convolverNode.connect(obj.output);
          }, function(e) {
            console.log("Error with decoding audio data " + e.err);
          })
        }
        request.send();
      },
      initialize() {
        this.setConnections();
        this.setMix();
        this.createConvolver();
      }
    };

    // Create delay object
    state.delay = {
      input: state.audioCtx.createGain(),
      wetNode: state.audioCtx.createGain(),
      dryNode: state.audioCtx.createGain(),
      output: state.audioCtx.createGain(),
      delayNode: state.audioCtx.createDelay(3.0),
      feedback: state.audioCtx.createGain(),
      filter: state.audioCtx.createBiquadFilter(),
      mix: 0,
      setConnections() {
        // Dry node
        this.input.connect(this.dryNode);
        this.dryNode.connect(this.output);

        // Feedback loop
        this.input.connect(this.delayNode);
        this.delayNode.connect(this.feedback);
        this.feedback.connect(this.filter);
        this.filter.connect(this.delayNode);

        // Connect to wet node
        this.delayNode.connect(this.wetNode);
        this.wetNode.connect(this.output);
      },
      setMix() {
        this.wetNode.gain.value = this.mix*0.6;
      },
      setParameters() {
        this.dryNode.gain.value = 1;
        this.delayNode.delayTime.value = 0.35;
        this.feedback.gain.value = 0.6;
        this.filter.frequency.value = 1000;
      },
      initialize() {
        this.setParameters();
        this.setConnections();
        this.setMix();
      }
    };

    // Set connections
    state.convolver.initialize();
    state.delay.initialize();
    state.effectsNode.connect(state.convolver.input);
    state.convolver.output.connect(state.delay.input);
    state.delay.output.connect(state.gainNode);
    state.gainNode.connect(state.audioCtx.destination);

    // Set initial conditions
    state.gainNode.gain.value = 0.25;
  }
}

const actions = {
  addTrack ({ commit }, payload) {
    commit('ADD_TRACK', payload);
  },
  deleteTrack ({ commit }, payload) {
    commit('REMOVE_TRACK', payload);
  },
  playTrack ({ commit }, payload) {
    commit('PLAY_TRACK', payload);
  },
  pause ({ commit }) {
    commit('PAUSE');
  },
  stop ({ commit }) {
    commit('STOP');
  },
  playAgain ({ commit }) {
    commit('PLAY_AGAIN');
  },
  volumeInput ({ commit }, payload) {
    commit('VOLUME_INPUT', payload);
  },
  reverbInput ({ commit }, payload) {
    commit('REVERB_INPUT', payload);
  },
  delayInput ({ commit }, payload) {
    commit('DELAY_INPUT', payload);
  },
  initAudio ({ commit }, payload) {
    commit('INIT_AUDIO', payload);
  }
}

const getters = {
  audioCtx: state => state.audioCtx,
  soundGroup: state => state.soundGroup,
  reverbVal: state => state.reverbVal,
  delayVal: state => state.delayVal,
  volumeVal: state => state.volumeVal,
  paused: state => state.paused,
  stopped: state => state.stopped,
  playTray: state => state.playTray,
}

export default createStore({
  state,
  mutations,
  actions,
  getters
});
