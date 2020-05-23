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
          <p class="subtitle is-6">@login</p>
        </div>
      </div>
      <form @submit.prevent="submit">
        <b-field type="is-danger" :message="error"> </b-field>
        <b-field label="Email">
          <b-input ref="email" v-model="form.email" type="email" required>
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            ref="password"
            v-model="form.password"
            type="password"
            minlength="8"
            maxlength="36"
            required
            password-reveal
          >
          </b-input>
        </b-field>
        <b-field>
          <b-checkbox v-model="form.remember">
            Remember me
          </b-checkbox>
        </b-field>
        <b-field>
          <b-button type="is-primary" expanded @click.prevent="submit"
            >Login</b-button
          >
        </b-field>
      </form>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          Don't have an account ?
          <router-link :to="{ name: 'register' }">
            Register now
          </router-link>
        </span>
      </p>
      <p class="card-footer-item">
        <span>
          <router-link :to="{ name: 'forgot' }">
            Forgot your password ?
          </router-link>
        </span>
      </p>
    </footer>
  </div>
</template>
<script>
import { LOGIN_QUERY } from '@/graphql/user';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      error: null
    };
  },
  methods: {
    async submit() {
      const isEmailValid = this.$refs.email.checkHtml5Validity();
      const isPasswordValid = this.$refs.password.checkHtml5Validity();

      if (isEmailValid && isPasswordValid) {
        this.login();
      }
    },
    async login() {
      try {
        await this.$apollo.query({
          query: LOGIN_QUERY,
          variables: {
            email: this.form.email,
            password: this.form.password,
            remember: this.form.remember
          }
        });
        this.router.replace('dash');
      } catch (err) {
        this.$log.debug(err);
        this.error = err.graphQLErrors[0].message;
      }
    }
  }
};
</script>
