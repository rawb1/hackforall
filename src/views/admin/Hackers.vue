<template>
  <div class="card is-full-width">
    <div class="card-content">
      <b-table
        :data="hackers"
        :columns="columns"
        striped
        hoverable
        paginated
        detailed
        :loading="$apollo.queries.hackers.loading"
      >
        <template slot="detail" slot-scope="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  {{ props.row.application }}
                </p>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { HACKERS_QUERY } from '@/graphql/userQueries';
export default {
  data: () => ({
    hackers: [],
    columns: [
      {
        field: '_id',
        label: 'ID',
        width: '40'
      },
      {
        field: 'username',
        label: 'Username'
      },
      {
        field: 'application.status',
        label: 'Status',
        sortable: true
      },
      {
        field: 'application.updatedAt',
        label: 'Last update'
      }
    ]
  }),
  apollo: {
    hackers: HACKERS_QUERY
  }
};
</script>
