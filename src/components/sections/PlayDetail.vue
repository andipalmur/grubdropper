<template>
  <div class="static">
    {{ sound.name }} <samp>
      (<span class="countdown">{{display}}s</span>)
    </samp>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PlayDetail',
  props: ['sound'],
  data () {
    return {
      display: this.sound.durationDisp,
    }
  },
  mounted () {
    this.duration();
  },
  computed: {
    ...mapGetters([
      'paused',
    ]),
  },
  methods: {
    duration () {
      let time = Math.round(Number(this.sound.duration)*100)/100;
      let interval = 100;
      let intervalSec = interval/1000;
      this.display = Math.round(time);
      this.sound.source.addEventListener('ended', () => {
        clearInterval(counter);
      })

      let counter = setInterval(() => {
        this.display = Math.floor(time);
        if (!this.paused) {
          time -= intervalSec;
        }
        if (time - intervalSec < 0) {
          this.display = 0;
          clearInterval(counter);
        }
      }, interval);
      counter;
    }
  }
}
</script>

<style>
.countdown {
  color: #C3F;
  font-weight: bold;
}

.active {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 3s, opacity 3s linear;
}
</style>
