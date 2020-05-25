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
          <p class="subtitle is-6">@reset password</p>
        </div>
      </div>
      <form @submit.prevent="submit">
        <b-field type="is-danger" :message="error"> </b-field>
        <b-field label="New Password">
          <b-input
            ref="newPassword"
            v-model="form.newPassword"
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
            >Reset</b-button
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
import { RESET_MUTATION } from '@/graphql/user';

export default {
  data() {
    return {
      form: {
        newPassword: ''
      },
      error: null
    };
  },
  methods: {
    async submit() {
      const isNewPasswordValid = this.$refs.newPassword.checkHtml5Validity();
      if (isNewPasswordValid && this.$route.params.resetToken) {
        this.reset();
      }
    },
    async reset() {
      try {
        await this.$apollo.mutate({
          mutation: RESET_MUTATION,
          variables: {
            newPassword: this.form.newPassword,
            resetToken: this.$route.params.resetToken
          }
        });
        this.$router.replace({ name: 'login' });
      } catch (err) {
        this.$log.debug(err);
        this.error = err.graphQLErrors[0].message;
      }
    }
  }
};
</script>
