<template>
  <section class="auth columns is-flex is-centered is-vcentered">
    <div class="column has-margin-10 is-auth-card-width">
      <router-view class="has-margin-bottom-25"></router-view>
      <Footer class="has-padding-10"></Footer>
    </div>
  </section>
</template>
<script>
import Footer from '@/components/Footer.vue';
export default {
  components: {
    Footer
  }
};
</script>
<style lang="scss" scoped>
.auth {
  min-height: 100%;
}
.is-auth-card-width {
  max-width: 480px;
}
</style>
