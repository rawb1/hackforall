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
    <b-tab-item label="Files">
      <ul>
        <li>
          <b-button
            v-if="hacker.application.form.profile.resume"
            outlined
            icon-left="far fa-file-pdf"
            @click.prevent="
              download(hacker.application.form.profile.resume.bucket)
            "
          >
            Resume
          </b-button>
        </li>
        <li>
          <b-button
            v-if="
              hacker.application.form.profile.needTravelReimbursement &&
                hacker.application.form.travel.travelReceipt
            "
            outlined
            icon-left="far fa-file-pdf"
            @click.prevent="
              download(hacker.application.form.travel.travelReceipt.bucket)
            "
          >
            Travel Receipt
          </b-button>
        </li>
      </ul>
    </b-tab-item>
  </b-tabs>
</template>
<script>
import List from '@/components/List.vue';
import { FILE_LINK_QUERY } from '@/graphql/fileQueries';

export default {
  components: { List },
  props: {
    hacker: { type: Object, default: null }
  },
  data: () => ({
    activeTab: 0
  }),
  methods: {
    async download(bucket) {
      const {
        data: { fileLink }
      } = await this.$apollo.query({
        query: FILE_LINK_QUERY,
        variables: { bucket },
        fetchPolicy: 'network-only'
      });

      const { data } = await this.$http({
        method: 'get',
        url: fileLink.link,
        responseType: 'arraybuffer'
      });

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileLink.name);
      const el = document.body.appendChild(link);
      link.click();
      document.body.removeChild(el);
    }
  }
};
</script>
