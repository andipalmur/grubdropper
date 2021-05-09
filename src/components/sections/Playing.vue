<template>
  <div>
    <h2>Playing:</h2>
    <div class="overflow-auto h-100">
      <ul id="playing">
        <li v-for="sound in soundGroup" :key="sound.id">
          <PlayDetail :sound="sound" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlayDetail from "./PlayDetail"

export default {
  name: 'Playing',
  computed: {
    ...mapGetters([
      'soundGroup'
    ])
  },
  components: {
    PlayDetail
  }
}
</script>

<style>
#playing {
  width:100%;
  padding: 10px;
  border:1px;
  list-style-type: none;
}

@media only screen and (max-width: 768px) {
  #playing {
    height:200px;
  }
}

@media only screen and (min-width: 768px) {
  #playing {
    height:140px;
  }
}
</style>
