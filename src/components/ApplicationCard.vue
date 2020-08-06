<template>
  <div v-if="application" class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <b-icon
            icon="fas fa-graduation-cap"
            size="is-large"
            type="is-primary"
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
  apollo: {
    application: APPLICATION_QUERY
  }
};
</script>
