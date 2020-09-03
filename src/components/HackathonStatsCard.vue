<template>
  <div class="card has-border">
    <div v-if="stat" class="card-content is-full-height">
      <div class="media">
        <div class="media-content is-capitalized">
          <p class="title is-4">{{ stat }}</p>
          <p class="subtitle is-1">{{ hackathonStats[stat] }}</p>
        </div>
        <div class="media-right">
          <b-icon
            :icon="icon"
            size="is-large"
            custom-size="fa-3x"
            type="is-primary"
          >
          </b-icon>
        </div>
      </div>
      <p class="has-text-right">
        {{ new Date(hackathonStats.date).toLocaleTimeString() }}
      </p>
    </div>
  </div>
</template>
<script>
import { HACKATHON_STATS_QUERY } from '@/graphql/statsQueries';

export default {
  props: {
    stat: {
      type: String,
      default: null,
      validator: function(value) {
        return ['hackers', 'applications', 'teams'].indexOf(value) !== -1;
      }
    }
  },
  data: () => ({
    hackathonStats: {}
  }),
  apollo: {
    hackathonStats: {
      query: HACKATHON_STATS_QUERY,
      pollInterval: 5 * 60 * 1000
    }
  },
  computed: {
    icon: function() {
      switch (this.stat) {
        case 'hackers':
          return 'fas fa-user-secret';
        case 'applications':
          return 'far fa-address-card';
        case 'teams':
          return 'fas fa-users';

        default:
          return 'fas fa-user-secret';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  white-space: nowrap;
}
</style>
