<template>
  <auth-card> </auth-card>
</template>
<script>
import AuthCard from '@/components/AuthCard.vue';
import { LOGIN_QUERY } from '@/graphql/user';

export default {
  components: {
    'auth-card': AuthCard
  },
  data() {
    return {
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

<style scoped>
.el-container {
  height: 100%;
}

.el-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 360px;
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 1.5rem;
}

.el-button--medium.is-round {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 0.9rem;
  margin: 0 0 1.5rem;
}

.space-between {
  display: flex;
  justify-content: space-between;
}
</style>
