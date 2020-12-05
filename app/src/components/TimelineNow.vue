<template>
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <p class="heading">
        Today {{ date.toLocaleDateString(undefined, options) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: { type: Date, default: new Date() },
    options: { type: Object, default: () => {} }
  }
};
</script>
