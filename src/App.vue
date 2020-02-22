<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { ME_QUERY } from '@/graphql/user';

export default {
  name: 'App',
  data() {
    return {
      me: null
    };
  },
  apollo: {
    me: ME_QUERY
  }
};
</script>

<style scoped>
#app {
  max-height: 100vh;
  width: 100%;
}
</style>
