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
        v-if="connected && !isOnDash"
        tag="router-link"
        :to="{ name: 'dash' }"
      >
        Dashboard
      </b-navbar-item>
      <b-navbar-item
        v-if="connected && me.role === 'ADMIN' && !isOnAdmin"
        tag="router-link"
        :to="{ name: 'admin' }"
      >
        Admin
      </b-navbar-item>
      <b-navbar-item v-if="connected" @click.prevent="logout">
        Logout
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import { authMixins } from '@/mixins';
import { ME_QUERY } from '@/graphql/userQueries';

export default {
  mixins: [authMixins],
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
    me: {
      query: ME_QUERY
    }
  }
};
</script>
