<template><div></div></template>
<script>
import { LOGIN_QUERY } from '@/graphql/user';
export default {
  apollo: {
    login: LOGIN_QUERY
  }
};
</script>
