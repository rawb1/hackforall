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
          <b-tabs v-model="activeTab" style="display:grid">
            <b-tab-item label="Profile">
              {{ props.row.application.form.name }}
            </b-tab-item>

            <b-tab-item label="Music"> </b-tab-item>
          </b-tabs>
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
