<template>
  <div>
    <StatsCard />
    <div class="divider">current</div>
    <HackathonCard />
    <div class="divider">others</div>
    <HackathonsTable />
  </div>
</template>
<script>
import HackathonCard from '@/components/HackathonCard.vue';
import HackathonsTable from '@/components/HackathonsTable.vue';
import StatsCard from '@/components/StatsCard.vue';

export default {
  components: { HackathonCard, HackathonsTable, StatsCard }
};
</script>
