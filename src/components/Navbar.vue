<template>
  <b-navbar wrapper-class="container" type="is-primary" class="main-navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        <img src="@/assets/logo.png" alt="Placeholder image" />
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        <span
          v-if="hackathon"
          class="has-text-weight-bold is-capitalized is-size-4"
        >
          {{ hackathon.name }}
        </span>
        <span v-else class="has-text-weight-bold is-capitalized is-size-4">
          HACKFORALL
        </span>
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
      <b-navbar-item v-if="!me" tag="router-link" :to="{ name: 'login' }">
        Login
      </b-navbar-item>
      <b-navbar-item v-if="!me" tag="router-link" :to="{ name: 'register' }">
        Register
      </b-navbar-item>

      <b-navbar-item
        v-if="me && !isOnDash"
        tag="router-link"
        :to="{ name: 'dash' }"
      >
        Dashboard
      </b-navbar-item>
      <b-navbar-item
        v-if="me && me && me.role === 'ADMIN' && !isOnAdmin"
        tag="router-link"
        :to="{ name: 'admin' }"
      >
        Admin
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
  computed: {
    isOnDash: function() {
      return this.$route.path.includes('dash');
    },
    isOnAdmin: function() {
      return this.$route.path.includes('admin');
    }
  },
  apollo: {
    me: ME_QUERY,
    hackathon: HACKATHON_QUERY
  }
};
</script>
