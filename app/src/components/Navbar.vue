<template>
  <b-navbar wrapper-class="container" type="is-primary" class="main-navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'dash' }">
        <img src="@/assets/logo.png" alt="Placeholder image" />
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'dash' }">
        <span
          v-if="hackathon"
          class="has-text-weight-bold is-capitalized is-size-4 has-text-secondary"
        >
          {{ hackathon.name }}
        </span>
        <span v-else class="has-text-weight-bold is-capitalized is-size-4">
          HACKFORALL
        </span>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-dropdown label="Info" :hoverable="true">
        <b-navbar-item href="#"> About </b-navbar-item>
        <b-navbar-item href="#"> Contact </b-navbar-item>
      </b-navbar-dropdown>
    </template>
    <template slot="end">
      <b-navbar-item v-if="!me" tag="router-link" :to="{ name: 'login' }">
        Login
      </b-navbar-item>
      <b-navbar-item v-if="!me" tag="router-link" :to="{ name: 'register' }">
        Register
      </b-navbar-item>
      <b-navbar-item v-if="me" @click.prevent="logout">
        Logout
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import { authMixin } from '@/mixins';
import { ME_QUERY } from '@/graphql/userQueries';
import { HACKATHON_QUERY } from '@/graphql/hackathonQueries';
export default {
  mixins: [authMixin],
  data: () => ({
    me: null
  }),
  apollo: {
    me: ME_QUERY,
    hackathon: HACKATHON_QUERY
  }
};
</script>
