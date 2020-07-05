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
        <b-field
          :type="{ 'is-danger': errors.has('graphql') }"
          :message="errors.collect('graphql')"
        >
        </b-field>
        <b-field
          label="Email"
          :type="{ 'is-danger': errors.has('email') }"
          :message="errors.collect('email')"
        >
          <b-input
            v-model="form.email"
            v-validate="'required|email'"
            name="email"
            type="email"
          >
          </b-input>
        </b-field>
        <b-field
          label="Password"
          :type="{ 'is-danger': errors.has('password') }"
          :message="errors.collect('password')"
        >
          <b-input
            v-model="form.password"
            v-validate="'required|min:8|max:32'"
            name="password"
            type="password"
            maxlength="32"
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
          <b-button
            type="is-primary"
            expanded
            native-type="submit"
            @click.prevent="submit"
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
import { CONNECTED_MUTATION } from '@/apollo/state';
import { LOGIN_QUERY } from '@/graphql/user';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      }
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.$apollo
            .query({
              query: LOGIN_QUERY,
              variables: {
                email: this.form.email,
                password: this.form.password,
                remember: this.form.remember
              }
            })
            .then(() =>
              this.$apollo.mutate({
                mutation: CONNECTED_MUTATION,
                variables: {
                  connected: true
                }
              })
            )
            .then(() => this.$router.push({ name: 'dash' }))
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
