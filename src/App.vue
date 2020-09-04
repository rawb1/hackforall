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

.step-navigation {
  justify-content: center;
  display: flex;
}

.b-steps .steps + .step-content {
  padding: 2rem 0;
}

.tile {
  flex-grow: 0;
}

@media screen and (min-width: $widescreen) {
  .main-navbar {
    height: 75px;
  }
}
</style>
