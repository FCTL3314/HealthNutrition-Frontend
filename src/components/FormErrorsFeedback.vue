<script setup>
defineProps({
  field: {
    required: true,
  }
})
</script>

<template>
  <p class="invalid-feedback my-1" v-for="error in field.$errors" :key="error.$uid">
    {{ error.$message }}
  </p>
</template>