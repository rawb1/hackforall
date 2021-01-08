<template>
  <b-navbar type="is-primary" spaced>
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
      <b-navbar-item
        v-if="hackathon && hackathon.status === 'APPLICATIONS_OPEN'"
        tag="router-link"
        :to="{ name: 'application' }"
      >
        Application
      </b-navbar-item>
      <!-- <b-navbar-item
        v-if="hackathon && hackathon.status === 'APPLICATIONS_OPEN'"
        tag="router-link"
        :to="{ name: 'team' }"
      >
        Team
      </b-navbar-item> -->
      <b-navbar-item tag="router-link" :to="{ name: 'hackers' }">
        Hackers
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'hackathons' }">
        Hackathons
      </b-navbar-item>
      <b-navbar-item :href="filesLink" target="_blank">
        Files
      </b-navbar-item>
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
import { FILES_LINK_QUERY } from '@/graphql/fileQueries';

export default {
  mixins: [authMixin],
  data: () => ({
    me: null
  }),
  apollo: {
    me: ME_QUERY,
    hackathon: HACKATHON_QUERY,
    filesLink: FILES_LINK_QUERY
  }
};
</script>
