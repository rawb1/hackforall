<template>
  <div>
    <HackathonCard />
    <div class="divider">others</div>
    <HackathonsTable />
  </div>
</template>
<script>
import HackathonCard from '@/components/HackathonCard.vue';
import HackathonsTable from '@/components/HackathonsTable.vue';

export default {
  components: { HackathonCard, HackathonsTable }
};
</script>
