<template>
  <el-container>
    <el-main>
      <el-row :gutter="10">
        <el-col :xs="0" :sm="12" :md="14" :lg="16" :xl="18">
          <Showcase></Showcase>
        </el-col>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
          text
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
