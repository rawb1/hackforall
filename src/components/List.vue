<template>
  <ul>
    <li v-for="(val, key) in value" :key="key">
      <b class="is-capitalized">{{ key }} : </b>{{ String(val) }}
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    value: { type: Object, default: null }
  }
};
</script>
