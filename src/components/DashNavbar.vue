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
      <b-navbar-dropdown label="Info" :hoverable="true">
        <b-navbar-item href="#">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>
<script>
export default {};
</script>
