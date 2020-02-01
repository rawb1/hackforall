<template>
  <div id="app" class="h-screen inset-0 bg-gray-100">
    hello {{ me.username }}
    <router-view></router-view>
  </div>
</template>

<script>
// import ME_QUERY from '@/graphql/user';
import gql from 'graphql-tag';

export default {
  name: 'app',
  data() {
    return {
      me: null
    };
  },
  apollo: {
    me: gql`
      # query {
      #   me {
      #     username
      #   }
      # }
      query {
        me: login(user: { username: "robin", password: "proqrobi" })
      }
    `
  }
};
</script>
