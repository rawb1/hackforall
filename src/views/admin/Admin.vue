<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical is-4">
      <MeCard class="tile is-child" />
      <ApplicationStatusCard class="tile is-child" />
    </div>
    <div class="tile is-parent is-vertical is-8">
      <StatsCard class="tile is-child" />
      <TimelineCard class="tile is-child" />
    </div>
  </div>
</template>

<script>
import MeCard from '@/components/MeCard.vue';
import ApplicationStatusCard from '@/components/ApplicationStatusCard.vue';
import StatsCard from '@/components/StatsCard.vue';
import TimelineCard from '@/components/TimelineCard.vue';

export default {
  components: {
    MeCard,
    ApplicationStatusCard,
    StatsCard,
    TimelineCard
  }
};
</script>
