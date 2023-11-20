<script setup>

</script>

<template>
  <div>
    <fieldset>
      <legend>Calories</legend>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="caloriesRadio1" checked>
        <label class="form-check-label" for="caloriesRadio1">
          Doesn't matter
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="caloriesRadio2">
        <label class="form-check-label" for="caloriesRadio2">
          Low-calorie
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="caloriesRadio3">
        <label class="form-check-label" for="caloriesRadio3">
          High-calorie
        </label>
      </div>
    </fieldset>
    <hr class="my-2">
    <fieldset>
      <legend>Protein</legend>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="proteinRadio1" checked>
        <label class="form-check-label" for="proteinRadio1">
          Doesn't matter
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="proteinRadio2">
        <label class="form-check-label" for="proteinRadio2">
          Low-protein
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="proteinRadio3">
        <label class="form-check-label" for="proteinRadio3">
          High-protein
        </label>
      </div>
    </fieldset>
    <hr class="my-2">
    <fieldset>
      <legend>Healthfulness</legend>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="healthfulnessCheck1">
        <label class="form-check-label" for="healthfulnessCheck1">
          High
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="healthfulnessCheck2">
        <label class="form-check-label" for="healthfulnessCheck2">
          Medium
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="healthfulnessCheck3">
        <label class="form-check-label" for="healthfulnessCheck3">
          Low
        </label>
      </div>
    </fieldset>
  </div>
</template>

<style scoped lang="sass">

</style>