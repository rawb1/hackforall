<template>
  <b-tabs v-model="activeTab" style="display:grid">
    <b-tab-item label="Profile">
      <List v-model="profile" />
    </b-tab-item>
    <b-tab-item v-if="hacker.application.form.needHardware" label="Hardware">
      <List v-model="hardware" />
    </b-tab-item>
    <b-tab-item
      v-if="hacker.application.form.needTravelReimbursement"
      label="Travel"
    >
      <List v-model="travel" />
    </b-tab-item>
    <b-tab-item v-if="hacker.application.form.needHosting" label="Hosting">
      <List v-model="terms" />
    </b-tab-item>
    <b-tab-item label="Terms">
      <List v-model="terms" />
    </b-tab-item>
  </b-tabs>
</template>
<script>
import _ from 'lodash';
import List from '@/components/List.vue';

export default {
  components: { List },
  props: {
    hacker: { type: Object, default: null }
  },
  data: () => ({
    activeTab: 0
  }),
  computed: {
    profile: function() {
      return _.pick(this.hacker.application.form, [
        'name',
        'school',
        'phone',
        'garduationYear',
        'studyFields',
        'interests',
        'github',
        'resume',
        'dietaryRestrictions',
        'teeShirtSize',
        'additionalNotes'
      ]);
    },
    hardware: function() {
      return _.pick(this.hacker.application.form, ['hardwareList']);
    },
    travel: function() {
      return _.pick(this.hacker.application.form, [
        'paypalAddress',
        'travelReceipt'
      ]);
    },
    hosting: function() {
      return _.pick(this.hacker.application.form, [
        'HostingPreferences',
        'hostMatchingDetails'
      ]);
    },
    terms: function() {
      return _.pick(this.hacker.application.form, [
        'majority',
        'liability',
        'photoRelease',
        'codeOfConduct'
      ]);
    }
  }
};
</script>
