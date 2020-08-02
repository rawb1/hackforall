<template>
  <b-navbar wrapper-class="container" type="is-primary" class="main-navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        <img src="@/assets/logo.png" alt="Placeholder image" />
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        <span class="has-text-weight-bold is-capitalized is-size-4"
          >HACKFORALL</span
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        Home
      </b-navbar-item>
      <b-navbar-item href="#">
        Documentation
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
    <template slot="end">
      <b-navbar-item
        v-if="!connected"
        tag="router-link"
        :to="{ name: 'login' }"
      >
        Login
      </b-navbar-item>
      <b-navbar-item
        v-if="!connected"
        tag="router-link"
        :to="{ name: 'register' }"
      >
        Register
      </b-navbar-item>

      <b-navbar-item
        v-if="connected && !dash"
        tag="router-link"
        :to="{ name: 'dash' }"
      >
        Dashboard
      </b-navbar-item>
      <b-navbar-item v-if="connected" @click.prevent="logout">
        Logout
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import { CONNECTED_QUERY, CONNECTED_MUTATION } from '@/apollo/state';
import { LOGOUT_QUERY } from '@/graphql/userQueries';

export default {
  props: { dash: Boolean },
  data: () => ({
    connected: false
  }),
  methods: {
    async logout() {
      await this.$apollo.query({
        query: LOGOUT_QUERY
      });
      await this.$apollo.mutate({
        mutation: CONNECTED_MUTATION,
        variables: {
          connected: false
        }
      });
    }
  },
  apollo: {
    connected: {
      query: CONNECTED_QUERY
    }
  }
};
</script>
