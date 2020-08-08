<template>
  <div v-if="application" class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <b-icon
            icon="far fa-address-card"
            size="is-large"
            :type="statusColor"
          >
          </b-icon>
        </div>
        <div class="media-content">
          <p class="title is-4">Application</p>
          <p class="subtitle is-6">@{{ application.status }}</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris.
        <br />
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  </div>
</template>
<script>
import { APPLICATION_QUERY } from '@/graphql/applicationQueries';

export default {
  data: () => ({
    application: null
  }),
  computed: {
    statusColor: function() {
      let color;
      switch (this.application.status) {
        case 'INCOMPLETE':
          color = 'is-warning';
          break;
        case 'PENDING':
          color = 'is-info';
          break;
        case 'REFUSED':
          color = 'is-error';
          break;
        case 'ACCEPTED':
          color = 'is-success';
          break;

        default:
          color = 'is-primary';
          break;
      }
      return color;
    }
  },
  apollo: {
    application: APPLICATION_QUERY
  }
};
</script>
