<template>
  <div id="app" class="h-screen inset-0 bg-gray-100">
    hello {{ me.username }}
    <router-view></router-view>
  </div>
</template>

<script>
import { ME_QUERY } from '@/graphql/user';

export default {
  name: 'app',
  data() {
    return {
      me: null
    };
  },
  apollo: {
    me: ME_QUERY
  }
};
</script>
