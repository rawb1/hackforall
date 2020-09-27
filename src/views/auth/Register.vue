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
        <b-field
          :type="{ 'is-danger': errors.has('graphql') }"
          :message="errors.collect('graphql')"
        >
        </b-field>
        <b-field
          label="Username"
          :type="{ 'is-danger': errors.has('username') }"
          :message="errors.collect('username')"
        >
          <b-input
            v-model="form.username"
            v-validate="'required|min:2|max:16'"
            name="username"
            type="text"
          ></b-input>
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
import { authMixin } from '@/mixins';

export default {
  mixins: [authMixin],
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.register(this.form).catch(err => {
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
