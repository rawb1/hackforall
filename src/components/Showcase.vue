<template>
  <el-container direction="vertical">
    <el-row>
      <h1><i type="primary" class="el-icon-eleme"></i> Hackforall</h1>
    </el-row>
    <el-main>
      <el-card class="box-card" shadow="hover">
        <el-carousel :autoplay="false" height="60vh">
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <el-image :src="image" alt="" fit="cover" />
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
        'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
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
  padding: 0 20px 20px;
  align-items: center;
}

.el-carousel__item {
  display: flex;
  justify-content: center;
}

.el-card {
  border: none;
  border-radius: 0;
  width: 800px;
  max-width: 100%;
}

.el-image {
  height: inherit;
}

h1 {
  margin: 30px 0;
}
</style>
