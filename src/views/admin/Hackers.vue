<template>
  <div class="card is-full-width">
    <div class="card-content">
      <b-table
        :data="hackers"
        striped
        hoverable
        paginated
        detailed
        :loading="$apollo.queries.hackers.loading"
      >
        <b-table-column
          v-slot="props"
          field="username"
          label="Username"
          sortable
        >
          {{ props.row.username }}
        </b-table-column>
        <b-table-column v-slot="props" field="email" label="Email">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="application.status"
          label="Status"
          sortable
        >
          <span :class="statusTextColorClass(props.row.application.status)">
            @{{ props.row.application.status }}
          </span>
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="application.updatedAt"
          label="Last update"
          sortable
        >
          {{ new Date(props.row.application.updatedAt).toLocaleDateString() }}
        </b-table-column>
        <template slot="detail" slot-scope="props">
          <b-tabs v-model="activeTab">
            <b-tab-item label="Profile">
              Lorem ipsum dolor sit amet.
            </b-tab-item>

            <b-tab-item label="Music">
              Lorem <br />
              ipsum <br />
              dolor <br />
              sit <br />
              amet.
            </b-tab-item>

            <b-tab-item :visible="showBooks" label="Books">
              What light is light, if Silvia be not seen? <br />
              What joy is joy, if Silvia be not by— <br />
              Unless it be to think that she is by <br />
              And feed upon the shadow of perfection? <br />
              Except I be by Silvia in the night, <br />
              There is no music in the nightingale.
            </b-tab-item>

            <b-tab-item label="Videos" disabled>
              Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
              congue luctus. Nullam hendrerit iaculis augue vitae ornare.
              Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </b-tab-item>
          </b-tabs>
          {{ props.row.application.form }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { HACKERS_QUERY } from '@/graphql/userQueries';
import { applicationMixin } from '@/mixins';

export default {
  mixins: [applicationMixin],
  data: () => ({
    hackers: []
  }),
  apollo: {
    hackers: HACKERS_QUERY
  }
};
</script>
