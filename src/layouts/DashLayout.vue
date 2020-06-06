<template>
  <main>
    <Navbar />
    {{ me }}
    <router-view></router-view>
  </main>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import { ME_QUERY } from '@/graphql/user';

export default {
  components: {
    Navbar
  },
  apollo: {
    me: {
      query: ME_QUERY,
      update: data => data.me,
      errorPolicy: 'ignore'
    }
  }
};
</script>
