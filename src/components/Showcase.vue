<template>
  <el-container direction="vertical">
    <h1>HackForAll</h1>
    <el-main>
      <el-card class="box-card" shadow="hover">
        <el-carousel :autoplay="false" height="60vh">
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <img :src="image" alt="" align="center" />
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data: () => {
    return {
      images: [
        'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
      ]
    };
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
  max-width: 90%;
  margin: 0 auto;
}

.el-main {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.el-carousel__item {
  display: flex;
  justify-content: center;
}

.el-card {
  border: none;
  border-radius: 0;
}
</style>
