<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical is-4">
      <div class="tile is-child">
        <MeCard />
      </div>
      <div class="tile is-child">
        <ApplicationStatusCard />
      </div>
    </div>
    <div class="tile is-parent is-vertical is-8">
      <div class="tile is-child">
        <HackathonStatsCard />
      </div>
      <div class="tile is-child">
        <TimelineCard class="tile is-child" />
      </div>
    </div>
  </div>
</template>

<script>
import { authMixin } from '@/mixins';
import MeCard from '@/components/MeCard.vue';
import ApplicationStatusCard from '@/components/ApplicationStatusCard.vue';
import HackathonStatsCard from '@/components/HackathonStatsCard.vue';
import TimelineCard from '@/components/TimelineCard.vue';

export default {
  components: {
    MeCard,
    ApplicationStatusCard,
    HackathonStatsCard,
    TimelineCard
  },
  mixins: [authMixin]
};
</script>
