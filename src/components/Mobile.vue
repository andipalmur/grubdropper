<template>
  <div class="d-sm-block d-md-none">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand">
          <img src="/grub.png" width="30">
          <span class="navbar-text">
            Drop Player
          </span>
        </span>
      </div>
    </nav>
  </div>

  <div class="container-fluid mobile d-sm-block d-md-none">
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Controls&nbsp;
            <span v-if="Object.keys(soundGroup) != 0">
              <i :class="getIcon()"> </i>
            </span>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne">
          <div class="accordion-body row">
            <div class="col">
              <Controls />
            </div>
            <div class="col">
              <Playing />
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
              Play Tray
              (click on a track to play)
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo">
          <div class="accordion-body">
            <PlayTray />
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="true"
            aria-controls="collapseThree"
          >
            Tracks
            <br>
            (click on a track to send to the play tray)
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="headingThree">
          <div class="accordion-body">
            <Tracks />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Controls from './sections/Controls';
import PlayTray from './sections/PlayTray';
import Playing from './sections/Playing';
import Tracks from './sections/Tracks';

export default {
  name: 'Mobile',
  data() {
    return {
      first: true,
    };
  },
  computed: {
    ...mapGetters([
      'soundGroup'
    ])
  },
  methods: {
    getIcon() {
      let norm = "volume-up-fill";

      let icons = [
        "alarm",
        "battery-half",
        "bricks",
        "bug",
        "cash",
        "chat-square-quote",
        "cloud-sleet",
        "cpu",
        "cup-straw",
        "dice-5",
        "droplet-half",
        "earbuds",
        "emoji-wink-fill",
        "eraser",
        "eyedropper",
        "film",
        "gear-wide",
        "geo-fill",
        "globe2",
        "graph-down",
        "hand-thumbs-down",
        "hurricane",
        "info-square",
        "key",
        "joystick",
        "linked-in",
        "music-note-list",
        "music-player",
        "peace",
        "pencil",
        "plug",
        "puzzle",
        "share",
        "spellcheck",
        "stoplights",
        "suit-club-fill",
        "suit-diamond-fill",
        "suit-heart-fill",
        "suit-spade-fill",
        "sunset",
        "terminal",
        "thermometer",
        "thermometer-half",
        "thermometer-high",
        "thermometer-low",
        "thermometer-snow",
        "toggle-on",
        "tornado",
        "trash",
        "tsunami",
        "umbrella",
        "upc-scan",
        "vector-pen",
        "vinyl-fill",
        "wallet",
        "whatsapp",
        "wifi",
        "wind",
        "wrench",
      ];

      // Check for more than one track playing. If more, go nuts.
      let oneTrack = Object.keys(this.soundGroup).length === 1;
      let index = Math.floor( Math.random() * icons.length );
      let icon = oneTrack ? norm : icons[index];

      return `bi-${icon}`;
    }
  },
  components: {
    Controls,
    PlayTray,
    Playing,
    Tracks,
  }
}
</script>

<style>
#app .mobile {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
