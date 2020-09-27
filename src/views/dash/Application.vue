<template>
  <div v-if="!$apollo.queries.application.loading">
    <ApplicationCreationCard v-if="!application" />
    <ApplicationFormCard v-else />
  </div>
</template>
<script>
import { APPLICATION_QUERY } from '@/graphql/applicationQueries';
import ApplicationFormCard from '@/components/ApplicationFormCard.vue';
import ApplicationCreationCard from '@/components/ApplicationCreationCard.vue';

export default {
  components: {
    ApplicationCreationCard,
    ApplicationFormCard
  },
  apollo: {
    application: APPLICATION_QUERY
  }
};
</script>
