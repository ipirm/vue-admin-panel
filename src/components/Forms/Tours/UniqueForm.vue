<template>
  <div class="form-container photos-block unique-block">
    <div class="form-content">
      <h6>Why should travelers book this tour?</h6>
      <div class="unique-label">How to write an overview that captures travelers.</div>
      <div class="info">
        <div class="info-block">
          <div class="info-block-title">
            <svg-icon name="yes" />
            <span>Do</span>
          </div>
          <div class="points">
            <div
              class="point"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
            <div
              class="point"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
            <div
              class="point"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-block-title">
            <svg-icon name="no" />
            <span>Don't</span>
          </div>
          <div class="points">
            <div
              class="point"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
            <div
              class="point"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
            <div
              class="point"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
          </div>
        </div>
      </div>
      <label>Briefly describe what makes it unique</label>
      <textarea v-model="tour.description_why_unique" class="temporary-textarea"></textarea>
      <div class="characters-needed">120 Characters needed</div>
      <div class="unique-label">Is this a private tour?</div>
      <div
        class="description"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.</div>
      <div class="radio-block">
        <div class="radio">
          <input @change="isPrivateChange" type="radio" v-model="tour.is_private" value="1" />
          <span>Yes</span>
        </div>
        <div class="radio">
          <input @change="isPrivateChange" type="radio" v-model="tour.is_private" value="0" />
          <span>No</span>
        </div>
      </div>
      <div
        v-if="showCanCustomize"
        class="unique-label unique-label-second"
      >Can travelers customize this tour?</div>
      <div v-if="showCanCustomize" class="radio-block">
        <div class="radio">
          <input type="radio" v-model="tour.is_traveler_can_customize" value="1" />
          <span>Yes</span>
        </div>
        <div class="radio">
          <input type="radio" v-model="tour.is_traveler_can_customize" value="0" />
          <span>No</span>
        </div>
      </div>
      <div
        v-if="!showCanCustomize"
        class="unique-label unique-label-third"
      >Enter the maximum number of travelers who can participate</div>
      <number-input v-model="tour.max_number_of_travelers" width="228px" v-if="!showCanCustomize"></number-input>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(10)"
      @keyup.enter="next(10)"
      class="button dark long"
      type="button"
    >Next</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";

export default {
  data() {
    return {
      tour: {
        description_why_unique: '',
        is_private: 0,
        is_traveler_can_customize: 1,
        max_number_of_travelers: 0,
      },
      showCanCustomize: false
    };
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep","fetchNinghtStep","getTour"]),

    next(val) {
//      this.fetchSetStep({
//        step: val
//      });
      const body = this.tour;
      this.fetchNinghtStep(body);
    },

    isPrivateChange() {
      if (this.tour.is_private == 1) {
        this.showCanCustomize = true;
      } else {
        this.showCanCustomize = false;
      }
    }
  },
  computed: {
      ...mapGetters({
          stateTour: 'tours/tour',
      }),
  },
  beforeMount(){
      this.tour.max_number_of_travelers = this.stateTour.max_number_of_travelers;
  },
  watch: {
      stateTour: {
          handler(val){
              this.tour.description_why_unique = val.description_why_unique;
              this.tour.is_private = val.is_private;
              this.tour.is_traveler_can_customize = val.is_traveler_can_customize
              this.tour.max_number_of_travelers = val.max_number_of_travelers;
          },
          deep: true
      },
  },
  mounted(){
      this.getTour();
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