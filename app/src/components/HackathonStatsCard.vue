<template>
  <div class="card has-border">
    <div v-if="hackathonStats" class="card-content">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Hackers</p>
            <p class="title">{{ hackathonStats.hackers }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Applications</p>
            <p class="title">{{ hackathonStats.applications }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Teams</p>
            <p class="title">{{ hackathonStats.teams }}</p>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import { HACKATHON_STATS_QUERY } from '@/graphql/statsQueries';

export default {
  data: () => ({
    hackathonStats: {}
  }),
  apollo: {
    hackathonStats: { query: HACKATHON_STATS_QUERY }
  }
};
</script>
