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

        <b-table-column v-slot="props" width="90" centered label="Actions">
          <b-field>
            <p class="control">
              <b-button
                size="is-small"
                type="is-success"
                icon-left="far fa-thumbs-up"
                rounded
                @click="accept(props.row)"
              ></b-button>
            </p>
            <p class="control">
              <b-button
                size="is-small"
                type="is-danger"
                icon-left="fas fa-ban"
                @click="refuse(props.row)"
              ></b-button>
            </p>
          </b-field>
        </b-table-column>

        <template slot="detail" slot-scope="props">
          <HackerDetails :hacker="props.row" />
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { HACKERS_QUERY } from '@/graphql/userQueries';
import HackerDetails from '@/components/HackerDetails.vue';
import { ACCEPT_MUTATION, REFUSE_MUTATION } from '@/graphql/applicationQueries';
import { applicationMixin } from '@/mixins';
import _ from 'lodash';

export default {
  components: { HackerDetails },
  mixins: [applicationMixin],
  data: () => ({
    hackers: []
  }),
  methods: {
    accept: function(hacker) {
      this.$apollo.mutate({
        mutation: ACCEPT_MUTATION,
        variables: { id: hacker.application.id },
        update: (store, { data: { accept } }) => {
          const { hackers } = store.readQuery({
            query: HACKERS_QUERY
          });
          hackers[_.findIndex(hackers, { id: hacker.id })].application.status =
            accept.status;
          store.writeQuery({
            query: HACKERS_QUERY,
            data: { hackers }
          });
        }
      });
    },
    refuse: function(hacker) {
      this.$apollo.mutate({
        mutation: REFUSE_MUTATION,
        variables: { id: hacker.application.id },
        update: (store, { data: { refuse } }) => {
          const { hackers } = store.readQuery({
            query: HACKERS_QUERY
          });
          hackers[_.findIndex(hackers, { id: hacker.id })].application.status =
            refuse.status;
          store.writeQuery({
            query: HACKERS_QUERY,
            data: { hackers }
          });
        }
      });
    }
  },
  apollo: {
    hackers: HACKERS_QUERY
  }
};
</script>
