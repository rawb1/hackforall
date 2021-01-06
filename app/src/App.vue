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

.step-navigation {
  justify-content: center;
  display: flex;
}

.b-steps .steps + .step-content {
  padding: 2rem 0;
}

.b-tabs.formTabs > .tab-content {
  padding-top: 1.5rem;
}

.is-child {
  flex-grow: 0;
}

.media {
  border-top: none !important;
}
</style>
