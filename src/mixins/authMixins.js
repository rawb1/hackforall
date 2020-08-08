import { CONNECTED_MUTATION, CONNECTED_QUERY } from '@/apollo/state';
import { LOGIN_QUERY, LOGOUT_QUERY, FORGOT_QUERY } from '@/graphql/userQueries';

export default {
  data: () => ({
    connected: false
  }),
  methods: {
    login: function(variables) {
      return this.$apollo
        .query({
          query: LOGIN_QUERY,
          variables
        })
        .then(() =>
          this.$apollo.mutate({
            mutation: CONNECTED_MUTATION,
            variables: {
              connected: true
            }
          })
        )
        .then(() => this.$router.replace({ name: 'dash' }));
    },
    logout: function() {
      return this.$apollo
        .query({
          query: LOGOUT_QUERY
        })
        .then(() =>
          this.$apollo.mutate({
            mutation: CONNECTED_MUTATION,
            variables: {
              connected: false
            }
          })
        )
        .then(() => this.$router.replace({ name: 'home' }));
    },
    forgot(variables) {
      return this.$apollo
        .query({
          query: FORGOT_QUERY,
          variables
        })
        .then(() => this.$router.replace({ name: 'home' }));
    }
  },
  apollo: {
    connected: {
      query: CONNECTED_QUERY
    }
  }
};
