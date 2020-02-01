<template>
  <div id="app" class="h-screen inset-0 bg-gray-100">
    hello {{ user }}
    <router-view></router-view>
  </div>
</template>

<script>
import { ME_QUERY } from '@/graphql/user';

export default {
  name: 'app',
  data() {
    return {
      user: null
    };
  },
  apollo: {
    user: ME_QUERY
  }
};
</script>
