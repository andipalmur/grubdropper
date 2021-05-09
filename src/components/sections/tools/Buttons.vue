<template>
  <div class="col">
    <h2>
      Controls:
    </h2>
    <div>
      <h4 v-if="playBtn" @click="playAgain" id="play" class="user-select-none">
        play
      </h4>
      <h4 v-if="pauseBtn" @click="pause" id="pause" class="user-select-none">
        pause
      </h4>
      <h4 v-if="!playBtn && !pauseBtn" class="disabled">
        pause
      </h4>
    </div>
    <div>
      <h4 v-if="stopBtn" @click="stop" id="stop" class="user-select-none">
        stop <span v-if="playBtn">(clear)</span>
      </h4>
      <h4 v-if="!stopBtn" class="disabled">
        stop
      </h4>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Buttons',
  computed: {
    ...mapGetters([
      'soundGroup',
      'audioCtx',
      'paused'
    ]),
    playBtn () {
      return !!(Object.keys(this.soundGroup).length && this.paused);
    },
    pauseBtn () {
      return !!(Object.keys(this.soundGroup).length && !this.paused);
    },
    stopBtn () {
      return !!(Object.keys(this.soundGroup).length);
    }
  },
  methods: {
    ...mapActions([
      'stop',
      'pause',
      'playAgain',
    ])
  }
}
</script>

<style>
#play:hover {
  color: #0F8;
  background-color: #EFE;
}

#pause:hover {
  color: #08F;
  background-color: #EEF;
}

#stop:hover {
  color: #F00;
  background-color: #FEE;
}

.disabled {
  color: #CCC;
}
</style>
