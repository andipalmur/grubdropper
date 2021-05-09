import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

// Initialize for iOS by playing a half-second silence on the first click event
const init = require('./initialize.js')
init.mobile();

// Initialize global audio context variable
const audioCtx = new (window.AudioContext|| window.webkitAudioContext)();

const app = createApp(App)
app.config.globalProperties.$audioCtx = audioCtx;
app.use(store).mount('#app');
