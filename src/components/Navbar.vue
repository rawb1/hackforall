<template>
  <b-navbar wrapper-class="container main-navbar" type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="'home'">
        <img src="@/assets/logo.png" alt="Placeholder image" />
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="'home'">
        <span class="has-text-weight-bold is-capitalized is-size-4"
          >HACKFORALL</span
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="/dash">
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
    <template v-if="!connected" slot="end">
      <b-navbar-item tag="router-link" :to="{ name: 'login' }">
        Login
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'register' }">
        Register
      </b-navbar-item>
    </template>
    <template v-else slot="end">
      <b-navbar-item tag="router-link" :to="{ name: 'dash' }">
        Dashboard
      </b-navbar-item>
      <b-navbar-item @click.prevent="logout">
        Logout
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import { ME_QUERY, LOGOUT_QUERY } from '@/graphql/user';
export default {
  data: () => ({
    me: null
  }),
  computed: {
    connected() {
      return !!this.me;
    }
  },
  methods: {
    async logout() {
      await this.$apollo.query({
        query: LOGOUT_QUERY
      });
      // eslint-disable-next-line no-console
      console.log(this.$apollo);
      this.$router.push({ name: 'home' });
    }
  },
  apollo: {
    me: {
      query: ME_QUERY,
      errorPolicy: 'ignore'
    }
  }
};
</script>
