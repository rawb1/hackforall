<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="@/assets/logo.png" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">HACKFORALL</p>
          <p class="subtitle is-6">@forgot password</p>
        </div>
      </div>
      <form @submit.prevent="submit">
        <b-field type="is-danger" :message="error"> </b-field>
        <b-field label="Email">
          <b-input ref="email" v-model="form.email" type="email" required>
          </b-input>
        </b-field>
        <b-field>
          <b-button type="is-primary" expanded @click.prevent="submit"
            >Reset</b-button
          >
        </b-field>
      </form>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          Don't have an account ?
          <router-link :to="'register'">
            Register now
          </router-link>
        </span>
      </p>
      <p class="card-footer-item">
        <span>
          Remember It ?
          <router-link :to="'login'">
            Login here
          </router-link>
        </span>
      </p>
    </footer>
  </div>
</template>
<script>
import { FORGOT_QUERY } from '@/graphql/user';

export default {
  data() {
    return {
      form: {
        email: 'proquotrobin@gmail.com'
      },
      error: null
    };
  },
  methods: {
    async submit() {
      const isEmailValid = this.$refs.email.checkHtml5Validity();
      if (isEmailValid) {
        this.forgot();
      }
    },
    async forgot() {
      try {
        await this.$apollo.query({
          query: FORGOT_QUERY,
          variables: {
            email: this.form.email
          }
        });
        this.$router.replace('home');
      } catch (err) {
        this.$log.debug(err);
        this.error = err.graphQLErrors[0].message;
      }
    }
  }
};
</script>
