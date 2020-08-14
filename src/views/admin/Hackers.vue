<template>
  <div class="card is-full-width">
    <div class="card-content">
      <b-table
        :data="users"
        :columns="columns"
        striped
        hoverable
        paginated
        detailed
        :loading="$apollo.queries.users.loading"
      ></b-table>
    </div>
  </div>
</template>

<script>
import { USERS_QUERY } from '@/graphql/userQueries';
export default {
  data: () => ({
    users: [],
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
    users: USERS_QUERY
  }
};
</script>
