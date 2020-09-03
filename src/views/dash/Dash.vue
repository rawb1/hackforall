<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical is-4">
      <MeCard class="tile is-child" />
      <ApplicationCard class="tile is-child" />
    </div>
    <div class="tile is-vertical is-8">
      <div class="tile">
        <div class="tile is-parent is-4">
          <HackathonStatsCard stat="hackers" class="tile is-child" />
        </div>
        <div class="tile is-parent is-4">
          <HackathonStatsCard stat="applications" class="tile is-child" />
        </div>
        <div class="tile is-parent is-4">
          <HackathonStatsCard stat="teams" class="tile is-child" />
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-primary">
          <p class="title">Vertical...</p>
          <p class="subtitle">Top tile</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import MeCard from '@/components/MeCard.vue';
import ApplicationCard from '@/components/ApplicationCard.vue';
import HackathonStatsCard from '@/components/HackathonStatsCard.vue';

export default {
  components: {
    MeCard,
    ApplicationCard,
    HackathonStatsCard
  }
};
</script>
