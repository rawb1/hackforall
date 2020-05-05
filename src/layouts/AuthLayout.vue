<template>
  <el-container class="authLayout">
    <el-main>
      <el-row type="flex" justify="center" align="middle" style="height:100%">
        <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      footer for now
    </el-footer>
  </el-container>
</template>
<style>
.authLayout {
  height: 100vh;
}
</style>
