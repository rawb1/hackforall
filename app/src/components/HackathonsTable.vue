<template>
  <div class="card is-full-width">
    <div class="card-content">
      <p class="title is-4 has-text-centered has-text-primary">Hackathons</p>
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
        <b-table-column
          v-slot="props"
          field="dates.start"
          label="Start"
          sortable
        >
          {{ new Date(props.row.dates.start).toLocaleDateString() }}
        </b-table-column>
        <b-table-column v-slot="props" field="dates.end" label="End" sortable>
          {{ new Date(props.row.dates.end).toLocaleDateString() }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="createdAt"
          label="Creation"
          sortable
        >
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
          <b-field>
            <p class="control">
              <b-button
                v-if="!props.row.active"
                size="is-small"
                type="is-success"
                icon-left="far fa-thumbs-up"
                rounded
                @click="activate(props.row)"
              ></b-button>
            </p>
            <p class="control">
              <b-button
                size="is-small"
                type="is-danger"
                icon-left="fas fa-ban"
              ></b-button>
            </p>
          </b-field>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import {
  HACKATHON_QUERY,
  HACKATHONS_QUERY,
  ACTIVATE_HACKATHON_MUTATION
} from '@/graphql/hackathonQueries';

export default {
  data: () => ({
    hackathons: []
  }),
  methods: {
    activate(hackathon) {
      return this.$apollo.mutate({
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
    }
  },
  apollo: {
    hackathons: HACKATHONS_QUERY
  }
};
</script>
