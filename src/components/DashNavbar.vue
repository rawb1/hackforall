<template>
  <b-navbar
    wrapper-class="container dash-navbar"
    type="is-white"
    shadow
    :mobile-burger="false"
  >
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'dash' }">
        Dashboard
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'application' }">
        Application
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'application' }">
        Team
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
// TODO create a mobile navbar
export default {};
</script>
