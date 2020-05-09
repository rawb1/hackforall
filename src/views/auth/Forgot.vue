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
      <form>
        <b-field label="Email">
          <b-input type="email" value=""> </b-input>
        </b-field>
        <b-field>
          <b-button type="is-primary" expanded>Reset</b-button>
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
// import AuthCard from '@/components/AuthCard.vue';
import { LOGIN_QUERY } from '@/graphql/user';

export default {
  components: {
    // 'auth-card': AuthCard
  },
  data() {
    return {
      name: 'John Silver',
      checkbox: false,
      error: null,
      form: {
        email: '',
        password: '',
        remember: '1'
      },
      rules: {
        email: [
          {
            type: 'email',
            required: true,
            message: 'Please enter a valid email',
            trigger: 'blur'
          }
        ],
        password: [
          {
            type: 'string',
            required: true,
            message: 'Please enter a password',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 16,
            message: 'Password length must be between 8 & 16 characters',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const me = await this.login();
          this.$log.debug(me);
        }
      });
    },
    async login() {
      try {
        this.error = null;
        this.data = await this.$apollo.query({
          query: LOGIN_QUERY,
          variables: {
            email: this.form.email,
            password: this.form.password
          }
        });
        return this.data.data.login;
      } catch (err) {
        this.error = err.graphQLErrors[0].message;
      }
    }
  }
};
</script>
