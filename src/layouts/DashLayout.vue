<template>
  <main>
    <Navbar />
    <h1>hey {{ me.email }}</h1>
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
