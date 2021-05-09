<template>
  <div class="info container-fluid d-none d-md-block fixed-top">
    This tool allows users to ruin podcasts for themselves and loved ones.
    Source available at
    <a href="https://github.com/andipalmur/grubdropper">github</a>.
  </div>

  <div class="container web d-none d-md-block d-flex">
    <div class="row h-auto">
      <div class="col-lg-4 col-md-3 p-1 d-flex flex-column">
        <div class="border border-1 rounded p-4">
          <Controls />
        </div>
        <div class="border border-1 rounded p-4 mt-2 flex-grow-1">
          <Playing />
      </div>
      </div>
      <div class="col-lg-4 col-md-5 p-1 d-flex">
        <div class="border border-1 rounded p-4 flex-grow-1">
          <PlayTray />
        </div>
      </div>
      <div class="col-lg-4 col-md-4 p-1">
        <div class="border border-1 rounded p-4 flex-grow-1">
          <Tracks />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Controls from './sections/Controls';
import PlayTray from './sections/PlayTray';
import Playing from './sections/Playing';
import Tracks from './sections/Tracks';

export default {
  name: 'Mobile',
  components: {
    Controls,
    PlayTray,
    Playing,
    Tracks,
  }
}
</script>

<style>
#app .web {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

.info {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 10px;
  color: #456;
}

.info a, a:visited {
  text-decoration: none;
  color: #44C;
}

.info a:hover {
  text-decoration: none;
  color: #446;
}

.info, a:active  {
  text-decoration: none;
  color: #557;
}

.directions {
  font-weight: bold;
  color: #4BB;
}
</style>
