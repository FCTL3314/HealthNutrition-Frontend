<template>
  <div class="comment-wrp d-flex">
    <svg
        class="comment-avatar bd-placeholder-img"
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
    <div class="placeholder-glow">
      <span class="placeholder comment-author-name col-2"/>
      <span class="placeholder placeholder-text bg-secondary col-2"/>
      <div class="placeholder-glow">
        <span class="placeholder placeholder-text col-4"/>
        <span class="placeholder placeholder-text col-3"/>
      </div>
      <div class="placeholder-glow">
        <span class="placeholder placeholder-text placeholder-text-replies col-1"/>
        <span class="placeholder placeholder-text placeholder-text-replies col-1"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/comments"
@import "@/assets/sass/variables"
@import "@/assets/sass/placeholders"
@import "bootstrap/scss/bootstrap"


.comment-wrp
  width: 100vh !important

.placeholder-glow
  width: 100%

.placeholder-text
  font-size: .9em
  margin-right: 4px

  &-replies
    color: $color-main
</style>