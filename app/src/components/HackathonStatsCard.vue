<template>
  <div>
    <div class="card has-border">
      <div v-if="hackathon" class="card-content">
        <div class="media">
          <div class="media-content">
            <p>
              <span class="title is-4"> {{ hackathon.name }} </span>
              <span class="subtitle is-6"
                >@<span class="has-text-secondary">{{
                  hackathon.status
                }}</span></span
              >
            </p>
          </div>
        </div>
        <nav v-if="hackathonStats" class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Hackers</p>
              <p class="title">
                <span class="has-text-secondary">
                  {{ hackathonStats.hackers }}
                </span>
                <span>/ {{ hackathon.limits.hackers }}</span>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Applications</p>
              <p class="title has-text-secondary">
                {{ hackathonStats.applications }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Teams</p>
              <p class="title has-text-secondary">{{ hackathonStats.teams }}</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <p class="subtitle is-7 has-text-right m-2">
      Last update : {{ hackathonStats.date }}
    </p>
  </div>
</template>
<script>
import { HACKATHON_STATS_QUERY } from '@/graphql/statsQueries';
import { HACKATHON_QUERY } from '@/graphql/hackathonQueries';

export default {
  data: () => ({
    hackathonStats: {}
  }),
  apollo: {
    hackathon: HACKATHON_QUERY,
    hackathonStats: { query: HACKATHON_STATS_QUERY, pollInterval: 60000 }
  }
};
</script>
