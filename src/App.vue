<template>
  <div id="app" class="has-page-width has-page-height has-background-white-bis">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
@import './style';

.main-navbar {
  z-index: 31;
}

@media screen and (min-width: $widescreen) {
  .main-navbar {
    height: 80px;
  }
}
</style>
