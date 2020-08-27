<template>
  <b-tabs v-model="activeTab" style="display:grid">
    <b-tab-item label="Profile">
      <ul>
        <li v-for="(value, key) in profile" :key="key">
          <b>{{ key }} : </b>{{ value }}
        </li>
      </ul>
    </b-tab-item>
    <b-tab-item v-if="hacker.application.form.needHardware" label="Hardware">
    </b-tab-item>
    <b-tab-item
      v-if="hacker.application.form.needTravelReimbursement"
      label="Travel"
    >
    </b-tab-item>
    <b-tab-item
      v-if="hacker.application.form.needAccomodation"
      label="Accomodation"
    >
    </b-tab-item>
    <b-tab-item label="Terms">
      <ul>
        <li>{{ hacker.application.form.majority }}</li>
      </ul>
    </b-tab-item>
  </b-tabs>
</template>
<script>
import _ from 'lodash';
export default {
  props: {
    hacker: { type: Object, default: null }
  },
  data: () => ({
    activeTab: 0
  }),
  computed: {
    profile: function() {
      return _.pick(this.hacker.application.form, ['name', 'school']);
    }
  }
};
</script>
