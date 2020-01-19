<template>
  <div id="app" class="h-screen inset-0 bg-gray-100">
    {{ getUser }}
    <router-view></router-view>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'app',
  apollo: {
    getUser: gql`
      query {
        getUser {
          username
        }
      }
    `
  }
};
</script>
