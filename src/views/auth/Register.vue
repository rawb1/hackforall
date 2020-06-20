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
          <p class="subtitle is-6">@register</p>
        </div>
      </div>
      <form @submit.prevent="submit">
        <b-field type="is-danger" :message="error"> </b-field>
        <b-field label="Username">
          <b-input
            ref="username"
            v-model="form.username"
            type="text"
            minlength="2"
            maxlength="16"
            required
            :has-counter="false"
          ></b-input>
        </b-field>
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
          <b-button type="is-primary" expanded @click.prevent="submit"
            >Register</b-button
          >
        </b-field>
        <p class="has-text-centered">
          By registering you agree to the
          <router-link :to="'terms'">
            Terms of Use
          </router-link>
        </p>
      </form>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          Already have an account ?
          <router-link :to="{ name: 'login' }">
            Login now
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
import { CONNECTED_MUTATION } from '@/apollo/state';
import { REGISTER_MUTATION } from '@/graphql/user';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      error: null
    };
  },
  methods: {
    async submit() {
      const isUsernameValid = this.$refs.username.checkHtml5Validity();
      const isEmailValid = this.$refs.email.checkHtml5Validity();
      const isPasswordValid = this.$refs.password.checkHtml5Validity();

      if (isUsernameValid && isEmailValid && isPasswordValid) {
        this.register();
      }
    },
    async register() {
      try {
        await this.$apollo.mutate({
          mutation: REGISTER_MUTATION,
          variables: {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          }
        });
        await this.$apollo.mutate({
          mutation: CONNECTED_MUTATION,
          variables: {
            connected: true
          }
        });
        this.$router.push({ name: 'dash' });
      } catch (err) {
        this.$log.debug(err);
        this.error = err.graphQLErrors[0].message;
      }
    }
  }
};
</script>
