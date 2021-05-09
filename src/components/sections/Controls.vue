<template>
  <div class="col">
    <Buttons />
      <!--
        Slider components shamelessly nabbed from
        https://qvault.io/javascript/how-to-make-a-custom-slider-component-in-vue/
      -->
    <Slider
      :value="volumeVal"
      :min="0"
      :max="100"
      @input="volumeInput"
      :label="`Volume`"
    />
    <Slider
      :value="reverbVal"
      :min="0"
      :max="100"
      @input="reverbInput"
      :label="`Reverb`"
    />
    <Slider
      :value="delayVal"
      :min="0"
      :max="100"
      @input="delayInput"
      :label="`Delay`"
    />
  </div>
</template>

<script>
import Buttons from './tools/Buttons';
import Slider from './tools/Slider';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Controls',
  created() {
    let payload = {
      audioCtx: this.$audioCtx,
      gainNode: this.$gainNode,
    }
    this.initAudio(payload);
  },
  computed: {
    ...mapGetters([
      'soundGroup',
      'delayVal',
      'delay',
      'reverbVal',
      'reverb',
      'volumeVal',
      'paused',
    ]),
  },
  methods: {
    ...mapActions([
      'delayInput',
      'reverbInput',
      'volumeInput',
      'initAudio',
    ]),
  },
  components: {
    Buttons,
    Slider,
  }
}
</script>
