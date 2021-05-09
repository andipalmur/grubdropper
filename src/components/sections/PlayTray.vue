<template>
  <div>
    <div class="d-none d-md-block">
      <h2>
        Play tray:
      </h2>
      <div class="directions p-1">
        (click on a track to play)
      </div>
    </div>
    <div class="bg-light overflow-auto border border-1 rounded">
      <ul id="play-tray">
        <li v-if="Object.keys(playTray).length == 0">
          <div class="card p-1">
            <div class="card-text m-2">
              <div class="d-none d-md-block">
                Add drops by clicking on them in the tracks section
                to the right.
                <div>
                  <i class="bi-arrow-return-right"></i>
                  <i class="bi-arrow-right"></i>
                  <i class="bi-arrow-right-circle"></i>
                  <i class="bi-box-arrow-in-right"></i>
                </div>
              </div>
              <div class="d-sm-block d-md-none">
                Add drops by clicking on them in the tracks section below.
                <div>
                  <i class="bi-arrow-down-circle"></i>
                  <i class="bi-hand-thumbs-down"></i>
                  <i class="bi-arrow-down"></i>
                  <i class="bi-hand-thumbs-down-fill"></i>
                  <i class="bi-box-arrow-down"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li
          class="p-1"
          v-for="track in playTray"
          :key="track.id"
        >
          <div class="btn-group" role="group" aria-label="track.name">
            <button
              type="button"
              class="btn btn-outline-dark btn-sm"
              @click="playTrack(track)"
            >
              {{ track.name }}
              <span v-if="duration(track) != 'undefined'">
                  {{ duration(track) }}
              </span>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              aria-label="close"
              @click="deleteTrack(track)"
            >
              &times;
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  created() {
    let payload = {
      audioCtx: this.$audioCtx,
    };
    this.initAudio(payload);
  },
  computed: {
    ...mapGetters([
      'playTray',
      'soundGroup',
    ]),
  },
  methods: {
    ...mapActions([
      'deleteTrack',
      'playTrack',
      'initAudio'
    ]),
    duration(track) {
      let duration = track.durationDisp ? `(${track.durationDisp}s)` : "";
      return duration;
    }
  }
}
</script>

<style>

#play-tray {
  width:100%;
  padding: 10px;
  border:1px;
  list-style-type: none;
}

@media only screen and (max-width: 768px) {
  #play-tray {
    height:300px;
  }
}

@media only screen and (min-width: 768px) {
  #play-tray {
    height:450px;
  }
}

.directions {
  font-weight: bold;
  color: #4BB;
}

</style>
