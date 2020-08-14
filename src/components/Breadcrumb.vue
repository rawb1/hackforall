<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path" class="is-capitalized">
          {{ getName(route) }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  computed: {
    routes: function() {
      return this.$route.matched;
    }
  },
  methods: {
    getName: function(route) {
      return route.name || route.path.split('/').slice(-1)[0];
    }
  }
};
</script>
