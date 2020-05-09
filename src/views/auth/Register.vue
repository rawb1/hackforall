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
      <form>
        <b-field label="Username">
          <b-input v-model="username"></b-input>
        </b-field>
        <b-field label="Email">
          <b-input type="email" value=""> </b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" value="iwantmytreasure" password-reveal>
          </b-input>
        </b-field>
        <b-field>
          <b-button type="is-primary" expanded>Register</b-button>
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
          <router-link :to="'login'">
            Login now
          </router-link>
        </span>
      </p>
      <p class="card-footer-item">
        <span>
          <router-link :to="'forgot'">
            Forgot your password ?
          </router-link>
        </span>
      </p>
    </footer>
  </div>
</template>
<script>
import { LOGIN_QUERY } from '@/graphql/user';
// import Terms from '@/components/Terms.vue';

export default {
  // components: { Terms },
  data() {
    return {
      drawer: false,
      error: null,
      form: {
        email: '',
        password: '',
        terms: '1'
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
        ],
        checkPassword: [
          {
            type: 'string',
            required: true,
            message: 'Please enter the password again',
            trigger: 'blur'
          },
          {
            validator: (rule, value, cb) =>
              value === this.form.password
                ? cb()
                : cb(new Error("Two passwords don't match")),
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
