<template>
  <div class="tile is-parent has-background-white">
    <b-steps
      v-model="activeStep"
      animated
      :has-navigation="false"
      label-position="right"
      class="tile is-child py-4"
      size="is-large"
    >
      <b-step-item icon="fa fa-address-book" :clickable="true"></b-step-item>
      <b-step-item icon="account" clickable="true"></b-step-item>
      <b-step-item icon="account-plus" clickable="true"></b-step-item>
    </b-steps>
  </div>
</template>
<script>
export default {
  data: () => ({
    activeStep: 0
  })
};
</script>
