# Grubstakers Drop Player
This is a helpful tool for ruining podcasts for friends/family/loved ones.

This is also to show that I have baseline competence in implementing
Vue.js applications. If you happen to be hiring JS developers and the
implementation here doesn't cause you to immediately spew all over your
keyboard, desk, and monitor, feel free to contact and hire me to work at
your august organization.

The app itself is available [here](https://grubdropper.herokuapp.com/).

## Setup
Get the node packages:
```
npm install
```

Compile this baby on a local server:
```
npm run serve
```

## Change Drops
Drop mp3s are stored in `public/drops`. After adding or removing files,
run `node plantSeed.js` to update the `src/assets/seed.js` file array.


## Other Vue Things
### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
