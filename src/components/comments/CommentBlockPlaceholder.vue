<script setup>

</script>

<template>
  <div class="comment-wrp">
    <svg
        class="rounded-circle bd-placeholder-img me-3"
        width="40"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
    >
      <rect width="100%" height="100%" fill="#AFCFFF"/>
    </svg>
    <div class="placeholder-glow w-100">
      <span class="placeholder comment-author-name col-2"/>
      <span class="placeholder placeholder-text bg-secondary col-2"/>
      <div class="placeholder-glow w-100 mb-3">
        <span class="placeholder placeholder-text col-4"/>
        <span class="placeholder placeholder-text col-3"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/comments"

.placeholder-text
  font-size: 12px
  margin-right: 4px
</style>