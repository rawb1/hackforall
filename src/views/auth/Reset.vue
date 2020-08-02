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
        <b-field
          :type="{ 'is-danger': errors.has('graphql') }"
          :message="errors.collect('graphql')"
        >
        </b-field>
        <b-field
          :type="{ 'is-danger': errors.has('resetToken') }"
          :message="errors.collect('resetToken')"
        >
          <b-input
            v-model="form.resetToken"
            v-validate="'required'"
            class="is-hidden"
            type="text"
            name="resetToken"
          >
          </b-input>
        </b-field>
        <b-field label="New Password">
          <b-input
            v-model="form.newPassword"
            v-validate="'required|min:8|max:32'"
            type="password"
            name="password"
            maxlength="32"
            password-reveal
          >
          </b-input>
        </b-field>
        <b-field>
          <b-button
            type="is-primary"
            expanded
            native-type="submit"
            @click.prevent="submit"
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
import { RESET_MUTATION } from '@/graphql/userQueries';

export default {
  data() {
    return {
      form: {
        resetToken: null,
        newPassword: ''
      }
    };
  },
  created() {
    this.form.resetToken = this.$route.params.resetToken;
  },
  methods: {
    async submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.$apollo
            .mutate({
              mutation: RESET_MUTATION,
              variables: {
                newPassword: this.form.newPassword,
                resetToken: this.form.resetToken
              }
            })
            .then(() => this.$router.replace({ name: 'login' }))
            .catch(err => {
              this.errors.remove('graphql');
              err.graphQLErrors.forEach(err => {
                this.errors.add({
                  field: 'graphql',
                  msg: err.message
                });
              });
            });
        } else {
          this.errors.remove('graphql');
        }
      });
    }
  }
};
</script>
