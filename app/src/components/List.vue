<template>
  <ul>
    <li v-for="(val, key) in value" :key="key">
      <span v-if="!key.startsWith('_')">
        <b class="is-capitalized">{{ key }} : </b>{{ String(val) }}
      </span>
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
