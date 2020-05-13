<template>
  <div class="form-container travel-details-block">
    <div class="form-content">
      <h6>Let's start with how you price your product</h6>
      <label>How do you price your product?</label>
      <div class="radios">
        <div v-for="(item,index) in priceTypes" class="radio">
          <input v-model="form.type" :value="index" type="radio" />
          <div class="name">{{ item }}</div>
        </div>
      </div>
      <div v-if="form.type == '1'" class="person">
        <label>Define the age groups that can participate</label>
        <div class="items">
          <div class="inputs-title">
            <div class="input-spans">
              <div class="input-span min">Min Age</div>
              <div class="input-span max">Max Age</div>
            </div>
          </div>
          <div v-for="(age,index) in ages" class="item">
            <div class="checkbox-block">
              <input v-model="form.ageGroups[index].isEnabled" type="checkbox" />
              <div class="title-writing">{{ age.name }}</div>
            </div>
            <div class="inputs-block">
              <div class="input left-input">
                <number-input :value="form.ageGroups[index].min_age" v-model="form.ageGroups[index].min_age" width="92px"></number-input>
              </div>
              <div class="input">
                <number-input :value="form.ageGroups[index].max_age" v-model="form.ageGroups[index].max_age" width="92px"></number-input>
              </div>
            </div>
          </div>
        </div>
        <label
          class="second-label"
        >Enter the maximum number of travelers allowed in a single booking</label>
        <div class="age-input">
          <number-input v-model="form.max_travelers_per_booking" width="92px"></number-input>
        </div>
      </div>
      <div v-if="form.type == '2'" class="group">
        <base-select
          placeholder="Select"
          width="315px"
          max-width="315px"
          inputWidth="315px"
          class="group-select"
          :options="priceGroups"
          custom
          :custValue="form.category_id"
          itemName="name"
          valueName="id"
          @selected-option="setGroupCategory"
        ></base-select>
      </div>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(15)"
      @keyup.enter="next(15)"
      class="button dark long"
      type="button"
    >Next</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      tour: {
        priceType: null
      },
      groupPieces: ["Item 1", "Item 2", "Item 3", "Item 4"],

      form: {
          type: 0,
          ageGroups: [
              {
                  id: 0,
                  category_id: 0,
                  min_age: 0,
                  max_age: 0,
                  categoryName: "string",
                  categoryDescription: "string",
                  isEnabled: false
              },
              {
                  id: 0,
                  category_id: 0,
                  min_age: 0,
                  max_age: 0,
                  categoryName: "string",
                  categoryDescription: "string",
                  isEnabled: false
              }
          ],
          max_travelers_per_booking: 0,
          category_id: 0
      },
      activeCategories: [],
      componentKey1: 100,
      componentKey2: 120
    };
  },
  computed: {
      ...mapGetters({
          priceTypes: 'tours/priceTypes',
          ages: 'tours/ageCategories',
          priceGroups: 'tours/priceGroups',
          productPriceSettings: 'tours/productPriceSettings'
      }),
  },
  watch: {
      ages: {
          handler(val){
              let compContext = this;

              val.forEach(function(element, index) {

                  const ind = compContext.activeCategories.findIndex(x => x.category_id == element.id);

                  if(ind != -1){
                      compContext.form.ageGroups[index] = {
                          id: parseInt(element.id),
                          category_id: parseInt(element.id),
                          min_age: compContext.activeCategories[ind].min_age,
                          max_age: compContext.activeCategories[ind].max_age,
                          categoryName: element.name,
                          categoryDescription: element.description,
                          isEnabled: true
                      }
                  }else{
                      compContext.form.ageGroups[index] = {
                          id: parseInt(element.id),
                          category_id: parseInt(element.id),
                          min_age: 0,
                          max_age: 0,
                          categoryName: element.name,
                          categoryDescription: element.description,
                          isEnabled: false
                      }
                  }
              });
              //this.forceRerender();
          },
          deep: true
      },
      productPriceSettings: {
          handler(val){
              let compContext = this;
              if(val.type == 1){
                  compContext.form.type = val.type;
                  compContext.form.max_travelers_per_booking = val.max_travelers_per_booking;
              }
              if(val.type == 2){
                  compContext.form.type = val.type;
                  compContext.form.category_id = val.category_id;
              }
          },
          deep: true
      }
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep","getPriceGroups","getPriceTypes","getAges","fetchTwelveStep","getProductPriceSettings","getTour","getSchedules","getBookingProcess","getBookingInfo"]),

    setGroupCategory(val){
        this.form.category_id = val
    },
    forceRerender() {
        this.componentKey1 += 1;
        this.componentKey2 += 1;
    },

    next(val) {

//        this.fetchSetStep({
//            step: val
//        })
        let body = {};
        if(this.form.type == 1){

            let ageGroupsArray = [];

            this.form.ageGroups.forEach(function(element, index) {
                if(element.isEnabled){
                    ageGroupsArray.push(element)
                }
            });

            body = {
                type: this.form.type,
                ageGroups: ageGroupsArray,
                max_travelers_per_booking: this.form.max_travelers_per_booking,
            }
        }
        if(this.form.type == 2){
            body = {
                type: this.form.type,
                category_id: this.form.category_id
            }
        }

        this.fetchTwelveStep(body);
//      this.fetchSetStep({
//        step: val
//      });
    }
  },
  beforeMount() {
      if(this.productPriceSettings.type == 2){
          this.form.type = this.productPriceSettings.type;
          this.form.category_id = this.productPriceSettings.category_id;
      }
      if(this.productPriceSettings.type == 1){

          this.form.type = this.productPriceSettings.type;
          this.form.max_travelers_per_booking = this.productPriceSettings.max_travelers_per_booking;
          this.form.ageGroups = this.productPriceSettings.ageGroups
          this.activeCategories = this.productPriceSettings.ageGroups;
      }
  },
  mounted(){
      this.$forceUpdate();
      this.getProductPriceSettings();
      this.getPriceGroups();
      this.getPriceTypes();
      this.getAges();
      this.getTour();
      this.getBookingProcess();
      this.getBookingInfo();
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