<template>
  <b-navbar wrapper-class="container dash-navbar" type="is-white" shadow>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'dash' }">
        Dashboard
      </b-navbar-item>
    </template>
    <template slot="start">
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
export default {};
</script>
