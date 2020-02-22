<template>
  <div class="home">
    <router-link :to="{ name: 'login' }">Login</router-link>
    <Navbar />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    Navbar
  }
};
</script>
