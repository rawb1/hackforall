<template>
  <div>
    <a href></a>
  </div>
</template>
<script>
import { LOGIN_QUERY } from '@/graphql/user';
export default {
  apollo: {
    login: LOGIN_QUERY
  }
};
</script>
