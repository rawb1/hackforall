<template>
  <b-navbar
    wrapper-class="container dash-navbar"
    type="is-white"
    shadow
    :mobile-burger="false"
  >
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'admin' }">
        Overview
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'hackers' }">
        Hackers
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'hackathon' }">
        Hackathon
      </b-navbar-item>
      <b-navbar-item :href="filesLink" target="_blank">
        Files
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
// TODO create a mobile navbar
import { FILES_LINK_QUERY } from '@/graphql/fileQueries';

export default {
  apollo: {
    filesLink: FILES_LINK_QUERY
  }
};
</script>
