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
      ></b-table>
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
      }
    ]
  }),
  apollo: {
    hackers: HACKERS_QUERY
  }
};
</script>
