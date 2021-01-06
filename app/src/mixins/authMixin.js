import {
  LOGIN_QUERY,
  REGISTER_MUTATION,
  LOGOUT_QUERY,
  FORGOT_QUERY,
  ME_QUERY
} from '@/graphql/userQueries';

export default {
  computed: {
    isAdmin() {
      return this.me && this.me.role === 'ADMIN';
    }
  },
  methods: {
    async login(variables) {
      await this.$apollo.query({
        query: LOGIN_QUERY,
        variables
      });
      await this.$apollo.queries.me.refetch();
      this.$router.replace({ name: 'dash' });
    },
    async register(variables) {
      await this.$apollo.mutate({
        mutation: REGISTER_MUTATION,
        variables
      });
      await this.$apollo.queries.me.refetch();
      this.$router.push({ name: 'dash' });
    },
    logout: function() {
      return this.$apollo
        .query({
          query: LOGOUT_QUERY
        })
        .then(() => this.$apollo.getClient().clearStore())
        .then(() => this.$router.replace({ name: 'login' }));
    },
    forgot(variables) {
      return this.$apollo
        .query({
          query: FORGOT_QUERY,
          variables
        })
        .then(() => this.$router.replace({ name: 'login' }));
    }
  },
  apollo: {
    me: ME_QUERY
  }
};
