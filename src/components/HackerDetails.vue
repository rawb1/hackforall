<template>
  <b-tabs v-model="activeTab" style="display:grid">
    <b-tab-item label="Profile">
      <List v-model="hacker.application.form.profile" />
    </b-tab-item>
    <b-tab-item
      v-if="hacker.application.form.profile.needHardware"
      label="Hardware"
    >
      <List v-model="hacker.application.form.hardware" />
    </b-tab-item>
    <b-tab-item
      v-if="hacker.application.form.profile.needTravelReimbursement"
      label="Travel"
    >
      <List v-model="hacker.application.form.travel" />
    </b-tab-item>
    <b-tab-item
      v-if="hacker.application.form.profile.needHosting"
      label="Hosting"
    >
      <List v-model="hacker.application.form.hosting" />
    </b-tab-item>
    <b-tab-item label="Terms">
      <List v-model="hacker.application.form.terms" />
    </b-tab-item>
  </b-tabs>
</template>
<script>
import List from '@/components/List.vue';

export default {
  components: { List },
  props: {
    hacker: { type: Object, default: null }
  },
  data: () => ({
    activeTab: 0
  })
};
</script>
