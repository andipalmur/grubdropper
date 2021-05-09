<template>
  <Browser />
  <Mobile />
</template>

<script>
import Browser from './components/Browser';
import Mobile from './components/Mobile';

export default {
  name: 'App',
  components: {
    Browser,
    Mobile,
  }
}
</script>
