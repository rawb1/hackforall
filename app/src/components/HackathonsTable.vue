<template>
  <b-table
    :data="hackathons"
    striped
    hoverable
    paginated
    :loading="$apollo.queries.hackathons.loading"
  >
    <b-table-column v-slot="props" field="name" label="Name" sortable>
      {{ props.row.name }}
    </b-table-column>
    <b-table-column v-slot="props" field="dates.start" label="Start" sortable>
      {{ new Date(props.row.dates.start).toLocaleDateString() }}
    </b-table-column>
    <b-table-column v-slot="props" field="dates.end" label="End" sortable>
      {{ new Date(props.row.dates.end).toLocaleDateString() }}
    </b-table-column>
    <b-table-column v-slot="props" field="createdAt" label="Creation" sortable>
      {{ new Date(props.row.createdAt).toLocaleDateString() }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      field="updatedAt"
      label="Last update"
      sortable
    >
      {{ new Date(props.row.updatedAt).toLocaleDateString() }}
    </b-table-column>

    <b-table-column v-slot="props" width="90" centered label="Actions">
      <b-field v-if="!props.row.active">
        <b-button
          size="is-small"
          type="is-success"
          icon-left="far fa-check-circle"
          outlined
          class="mx-1"
          @click="activate(props.row)"
        >
        </b-button>
        <b-button
          size="is-small"
          type="is-danger"
          icon-left="fas fa-trash-alt"
          outlined
          @click="remove(props.row)"
        ></b-button>
      </b-field>
    </b-table-column>
  </b-table>
</template>

<script>
import {
  HACKATHON_QUERY,
  HACKATHONS_QUERY,
  ACTIVATE_HACKATHON_MUTATION,
  DELETE_HACKATHON_MUTATION
} from '@/graphql/hackathonQueries';

export default {
  data: () => ({
    hackathons: []
  }),
  methods: {
    activate(hackathon) {
      this.$apollo.mutate({
        mutation: ACTIVATE_HACKATHON_MUTATION,
        variables: { id: hackathon.id },
        update: (store, { data: { activateHackathon } }) => {
          let { hackathon } = store.readQuery({ query: HACKATHON_QUERY });
          hackathon = { ...hackathon, ...activateHackathon };
          store.writeQuery({ query: HACKATHON_QUERY, data: { hackathon } });

          let { hackathons } = store.readQuery({ query: HACKATHONS_QUERY });
          hackathons.forEach(hackathon => {
            hackathon.active = hackathon.id === activateHackathon.id;
          });
          store.writeQuery({ query: HACKATHONS_QUERY, data: { hackathons } });
        }
      });
    },
    remove(hackathon) {
      this.$apollo
        .mutate({
          mutation: DELETE_HACKATHON_MUTATION,
          variables: { id: hackathon.id }
        })
        .then(() => this.$apollo.queries.hackathons.refetch());
    }
  },
  apollo: {
    hackathons: HACKATHONS_QUERY
  }
};
</script>
