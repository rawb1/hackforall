<template>
  <div class="card has-border">
    <div v-if="stats" class="card-content">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Hackathons</p>
            <p class="title">{{ stats.hackathons }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Users</p>
            <p class="title">{{ stats.users }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Applications</p>
            <p class="title">{{ stats.applications }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Teams</p>
            <p class="title">{{ stats.teams }}</p>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import { STATS_QUERY } from '@/graphql/statsQueries';

export default {
  data: () => ({
    stats: {}
  }),
  apollo: {
    stats: {
      query: STATS_QUERY,
      pollInterval: 5 * 60 * 1000
    }
  }
};
</script>
