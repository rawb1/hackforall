<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <slot name="form"></slot>
  </el-card>
</template>
<style lang="scss"></style>
