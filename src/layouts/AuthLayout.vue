<template>
  <el-container id="auth-layout">
    <el-main>
      <el-row>
        <el-col :xs="0" :sm="12" :md="14" :lg="16" :xl="18" class="bg-color">
          <Showcase></Showcase>
        </el-col>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import Showcase from '@/components/Showcase.vue';
export default {
  components: { Showcase }
};
</script>

<style scoped>
#auth-layout.el-container {
  width: 100%;
  height: 100vh;
}

.el-row,
.el-col {
  height: 100%;
}

.el-main {
  padding: 0;
}
</style>
