<script setup>


</script>

<template>
  <div class="container rounded-4 col-lg-4 col-md-7 col-sm-8 shadow-lg">
    <form class="py-2 px-1" action="" method="post">
      <div class="mb-4">
        <h2 class="text-center mt-2">Log In</h2>
      </div>
      <hr>
      <div class="mb-4">
        <label class="form-label">Username</label>
        <input
            required
            type="text"
            class="form-control"
            placeholder="Enter username"
            minlength="4"
            maxlength="32"
        >
      </div>
      <div class="mb-4">
        <label class="form-label">Password</label>
        <input
            required
            type="password"
            class="form-control"
            placeholder="Enter password"
            maxlength="32"
        >
      </div>
      <div class="d-flex">
        <div class="form-check me-auto">
          <input type="checkbox" class="form-check-input">
          <label class="form-check-label">Remember me</label>
        </div>
        <div>
          <a href="#" class="link-secondary text-decoration-none">Forgot password ?</a>
        </div>
      </div>
      <hr>
      <div class="text-center">
        <button type="submit" class="btn btn-outline-primary">Submit</button>
      </div>
      <div class="text-center mt-2">
        <p>
          <span class="my-0 pe-1">Not registered ?</span>
          <router-link
              :to="{name: 'registration'}"
              class="link-primary text-decoration-none"
          >
            Create an account
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped lang="sass">

</style>