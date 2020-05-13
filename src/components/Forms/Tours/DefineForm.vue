<template>
  <div class="form-container define-block">
    <div class="form-content">
      <h6>Define Prices</h6>
      <div class="main">
        <div class="currency-block">
          <label>Pricing groups</label>
          <div class="currency">
            <div class="title">Currency:</div>
            <base-select
              @selected-option="setCurrency"
              placeholder="Select"
              width="76px"
              max-width="76px"
              inputWidth="76px"
              class="group-select"
              :options="currencies"
            ></base-select>
          </div>
        </div>
        <div class="child-adult-block">
          <div class="title-block">
            <div class="title-item first">
              <div class="writing">Suggested retail price</div>
              <svg-icon name="help"></svg-icon>
            </div>
            <div class="title-item second">
              <div class="writing">Amount you will get paid</div>
              <svg-icon name="help"></svg-icon>
            </div>
          </div>
          <div class="items-block">
            <div class="item first-item">
              <div class="title">Child</div>
              <div class="input first">
                <div class="currency">
                  <div class="piece">{{ tour.currency }}</div>
                </div>
                <base-input
                  :disabled="tour.freeChildren"
                  placeholder="0.0"
                  inputWidth="100px"
                  class="input-value"
                ></base-input>
              </div>
              <div class="input second">
                <div class="currency">
                  <div class="piece">{{ tour.currency }}</div>
                </div>
                <base-input
                  :disabled="tour.freeChildren"
                  placeholder="0.0"
                  inputWidth="100px"
                  class="input-value"
                ></base-input>
              </div>
              <div class="ch-ad-checkbox-block">
                <input v-model="tour.freeChildren" type="checkbox" />
                <div class="writing">Free Price</div>
              </div>
            </div>
            <div class="item">
              <div class="title">Adult</div>
              <div class="input first">
                <div class="currency">
                  <div class="piece">{{ tour.currency }}</div>
                </div>
                <base-input
                  :disabled="tour.freeAdult"
                  placeholder="0.0"
                  inputWidth="100px"
                  class="input-value"
                ></base-input>
              </div>
              <div class="input second">
                <div class="currency">
                  <div class="piece">{{ tour.currency }}</div>
                </div>
                <base-input
                  :disabled="tour.freeAdult"
                  placeholder="0.0"
                  inputWidth="100px"
                  class="input-value"
                ></base-input>
              </div>
              <div class="ch-ad-checkbox-block">
                <input v-model="tour.freeAdult" type="checkbox" />
                <div class="writing">Free Price</div>
              </div>
            </div>
          </div>
        </div>
        <div class="days">
          <label>Select the days these prices apply</label>
          <div class="selection-block">
            <input type="checkbox" />
            <div class="checkbox-writing">Select all</div>
          </div>
          <div class="day-items">
            <div v-for="(day, index) in days" class="item" :key="index">{{ day }}</div>
          </div>
        </div>
        <div class="times">
          <label>Add the times when these prices apply</label>
          <div class="description">
            <span class="highlighted">Note:</span>To enter your pickup time and information, go to Meeting and Pickup.
          </div>
          <div class="times-container">
            <div v-for="(time, index) in tour.times" :key="index" class="item">
              <base-select
                placeholder="Select"
                width="94px"
                max-width="94px"
                inputWidth="94px"
                class="group-select"
                :options="times"
              ></base-select>
              <base-select
                placeholder="Select"
                width="63px"
                max-width="63px"
                inputWidth="63px"
                class="group-select second"
                :options="ams"
              ></base-select>
              <div @click="deleteTime(index)" class="delete-block">
                <svg-icon name="trash"></svg-icon>
              </div>
            </div>
            <div class="add-times-block">
              <div @click.prevent="addTime" class="add-time">
                <svg-icon name="plus" />
                <label>Add time</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(11)"
      @keyup.enter="next(11)"
      class="button dark long"
      type="button"
    >Finish</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SvgIcon from "../../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";

export default {
  components: { SvgIcon },
  data() {
    return {
      tour: {
        currency: "USD",
        freeChildren: false,
        freeAdult: false,
        times: []
      },
      currencies: ["USD", "EUR", "RUB"],
      times: ["12:00", "12:30"],
      ams: ["AM", "PM"],
      days: ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"]
    };
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep"]),

    next(val) {
      this.fetchSetStep({
        step: val
      });
    },
    setCurrency(val) {
      this.tour.currency = val;
    },
    addTime() {
      const body = {
        time: null,
        am: null
      };
      this.tour.times.push(body);
    },
    deleteTime(index) {
      this.tour.times.splice(index, 1);
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