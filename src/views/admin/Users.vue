<template>
  <b-table
    :data="users"
    :columns="columns"
    striped
    hoverable
    :loading="$apollo.queries.users.loading"
  ></b-table>
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
      },
      {
        field: 'email',
        label: 'Email'
      }
    ]
  }),
  apollo: {
    users: USERS_QUERY
  }
};
</script>
