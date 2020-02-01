<template><div></div></template>
<script>
import gql from 'graphql-tag';
export default {
  apollo: {
    login: gql`
      query {
        login: login(user: { username: "robin", password: "proqrobi" })
      }
    `
  }
};
</script>
