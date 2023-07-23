<script setup>

</script>

<template>
  <div class="container rounded-4 col-lg-5 col-md-8 shadow-lg">
    <form class="py-2 px-1" action="" method="post">
      <div class="mb-4">
        <h2 class="form-title text-center mt-2">Sign Up</h2>
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
        <label class="form-label">Username</label>
        <input
            required
            type="email"
            class="form-control"
            placeholder="Enter email"
            maxlength="255"
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
      <div class="mb-4">
        <label class="form-label">Password confirmation</label>
        <input
            required
            type="password"
            class="form-control"
            placeholder="Enter password confirmation"
            maxlength="32"
        >
      </div>
      <hr>
      <div class="text-center">
        <button type="submit" class="btn btn-outline-primary">Sign Up</button>
      </div>
      <div class="text-center mt-2">
        <p>
          <span class="my-0 pe-1">Already registered ?</span>
          <router-link
              :to="{name: 'login'}"
              class="link-primary text-decoration-none"
          >
            Login to your account
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped lang="sass">

</style>