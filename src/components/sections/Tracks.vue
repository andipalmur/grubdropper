<template>
  <div>
    <div class="d-none d-md-block">
      <h2 class="d-none d-md-block">
        Tracks:
      </h2>
      <div class="directions">
        (click on a track to send to play tray)
      </div>
    </div>
    <div>
      <input class="form-control" v-model="dropSearch" placeholder="search drops">
    </div>
    <div>
      <ul id="track-list" class="list-group overflow-auto border border-1">
        <li v-for="track in filteredTracks" :key="track.id">
          <div
            :id="track.label"
            @click="prepareTrack(track)"
            class="track list-group-item user-select-none"
          >
            {{ track.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
const trackSeed = require('../../assets/seed.js');

export default {
  name: 'Tracks',
  data () {
    return {
      tracks: trackSeed.Seed,
      dropSearch: '',
    }
  },
  computed: {
    filteredTracks() {
      let result = {};

      for (const key in this.tracks) {
        if (this.tracks[key].name.includes(this.dropSearch)) {
          result[key] = this.tracks[key];
        }
      }

      return result;
    }
  },
  methods: {
    ...mapActions([
      'addTrack',
    ]),
    prepareTrack(track) {
      let payload = {
        track: track,
        audioCtx: this.$audioCtx,
        gainNode: this.$gainNode,
      };
      this.addTrack(payload);
    }
  }
}
</script>

<style>
.track:hover {
  background-color: #FF0;
}

.directions {
  font-weight: bold;
  color: #4BB;
}

#track-list {
  margin-top: 20px;
  height:400px;
  width:100%;
}

@media only screen and (max-width: 768px) {
  #track-list {
    height:300px;
  }
}

@media only screen and (min-width: 768px) {
  #track-list {
    height:400px;
  }
}

@media only screen and (min-width: 1200px) {
  #track-list {
    height:420px;
  }
}
</style>
