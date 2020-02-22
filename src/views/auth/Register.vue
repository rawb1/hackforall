<template>
  <el-container direction="vertical">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"
      label-position="right"
      label-width="90px"
      size="medium"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input
          v-model="form.pass"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input
          v-model="form.checkPass"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">Login</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
import { LOGIN_QUERY } from '@/graphql/user';

export default {
  data() {
    return {
      form: {
        email: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        email: [
          { type: 'email', required: true, message: 'lol', trigger: 'blur' }
        ],
        pass: [
          { type: 'string', required: true, message: 'lol', trigger: 'blur' },
          { min: 8, max: 16, message: 'wat', trigger: 'blur' }
        ],
        checkPass: [
          { type: 'string', required: true, trigger: 'blur' },
          {
            validator: (rule, value, cb) =>
              value === this.form.pass
                ? cb()
                : cb(new Error("Two inputs don't match!")),
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          // eslint-disable-next-line no-console
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  apollo: {
    login: LOGIN_QUERY
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
  justify-content: center;
}
</style>
