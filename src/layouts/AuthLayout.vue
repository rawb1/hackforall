<template>
  <div class="flex h-full">
    <div class="flex-auto">
      <img
        src="https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
        alt=""
      />
    </div>
    <div class="flex-1 bg-gray-600">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  components: {}
};
</script>
