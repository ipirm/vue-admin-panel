<template>
  <div class="form-container price-schedule">
    <div class="form-content">
      <h6>Create a pricing schedule</h6>
      <label>When does your schedule start?</label>
      <div class="radio-buttons-list">
        <div class="radio-button-item">
          <input v-model="tour.startType" value="start" type="radio" />
          <div class="title">Start Date</div>
        </div>
        <div class="radio-button-item second">
          <input v-model="tour.startType" value="period" type="radio" />
          <div class="title">Period</div>
        </div>
      </div>
      <div v-if="tour.startType == 'period'" class="period">
        <base-select
          label="When does your schedule start?"
          width="230px"
          max-width="230px"
          inputWidth="230px"
          class="group-select"
          :options="periods"
        ></base-select>
        <base-select
          label="When does your schedule start?"
          width="230px"
          max-width="230px"
          inputWidth="230px"
          class="group-select"
          :options="periods"
        ></base-select>
      </div>
      <div v-if="tour.startType == 'start'" class="start">
        <base-select
          label="When does your schedule start?"
          width="230px"
          max-width="230px"
          inputWidth="230px"
          class="group-select"
          :options="periods"
        ></base-select>
      </div>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(11)"
      @keyup.enter="next(11)"
      class="button dark long"
      type="button"
    >Next</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      tour: {
        startType: null
      },
      periods: ["Aug,6 2019", "Aug,7 2019", "Aug,8 2019"]
    };
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep"]),

    next(val) {
      this.fetchSetStep({
        step: val
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 315px;
  margin-top: 20px;
  margin-bottom: 15px;
}
</style>