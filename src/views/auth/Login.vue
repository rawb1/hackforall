<template>
  <el-container>
    <el-main>
      <h2>Welcome Back :)</h2>
      <p>
        To keep connected with us please login with your personnal informations
        by email address and password
        <i class="el-icon-bell" style="background-color: yellow"></i>
      </p>
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        size="medium"
      >
        <el-form-item prop="email" :error="error">
          <el-input
            v-model="form.email"
            prefix-icon="el-icon-user"
            placeholder="Email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" :error="error">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            placeholder="Password"
          ></el-input>
        </el-form-item>
        <el-form-item class="space-between">
          <el-radio v-model="form.remember" label="1">Remember me</el-radio>
          <el-link href="https://element.eleme.io" target="_blank"
            >Forgot password ?</el-link
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="submitForm('form')"
            >Login Now</el-button
          >
          <el-button round @click="submitForm('form')"
            >Create Account</el-button
          >
        </el-form-item>
      </el-form>
      <p>Or you can join with</p>
      <el-row>
        <el-button icon="el-icon-search" circle disabled></el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          disabled
        ></el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          disabled
        ></el-button>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { LOGIN_QUERY } from '@/graphql/user';

export default {
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
