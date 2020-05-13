<template>
  <div class="form-container information-block">
    <div class="form-content">
      <h6>Add any physical restrictions</h6>
      <div
        class="description"
      >This information will help travelers know if this is a good tour for them.</div>
      <div class="accessibility">
        <div class="title-block">
          <div class="name">Accessibility</div>
          <div class="yes-no-chips">
            <div class="yes">Yes</div>
            <div class="no">No</div>
          </div>
        </div>
      </div>

      <div class="chip-block">
        <div v-for="(restriction,index) in rest.accessibilities" :key="index" class="chip">

          <div class="chip-content">{{ restriction.category_name }}</div>
          <div class="radios">
            <input
                    :key="restriction.category_id + 0"
                    value = "1"
                    v-model="restriction.is_enabled "
                    class="yes-radio"
                    type="radio"
            />
            <input :key="restriction.category_id + 1" value = "0" v-model="restriction.is_enabled" class="no-radio" type="radio" />
          </div>
        </div>
        <div v-for="(restriction,index) in rest.customAccessibilities" :key="index" class="chip">
          <div class="chip-content">{{ restriction}}</div>
          <!--<div class="radios">-->
            <!--<input-->
              <!--value="1"-->
              <!--class="yes-radio"-->
              <!--type="radio"-->
            <!--/>-->
            <!--<input value="0" class="no-radio" type="radio" />-->
          <!--</div>-->
        </div>
        <div v-if="showRestrictionInput" class="add-restriction-input-block">
          <div class="close">
            <svg-icon name="close" />
          </div>
          <input v-model="restriction" @keyup.enter="addRestriction" type="text" />
        </div>
        <div class="add-block">
          <div @click.prevent="addAnotherRestriction" class="additional">
            <svg-icon name="plus" />
            <label>Add another</label>
          </div>
        </div>
      </div>
      <div class="health">
        <label>Health restrictions</label>
        <div class="description">Check all that apply</div>
        <div class="checkboxes">
          <div v-for="(health,index) in rest.healthRestrictionsList" :key="index" class="checkbox">
            <input :id="health.category_id" :value="health.category_id" v-model="rest.healthRestrictions"  type="checkbox" />
            <label :for="health.category_id">{{ health.category_name }}</label>
          </div>
          <div v-for="(health,index) in rest.customHealthRestrictions" :key="index" class="checkbox">
            <!--<input type="checkbox" />-->
            <label>{{ health }}</label>
          </div>
        </div>
        <div v-if="showHealthInput" class="add-restriction-input-block">
          <div class="close">
            <svg-icon name="close" />
          </div>
          <input v-model="health" @keyup.enter="addHealth" type="text" />
        </div>
        <div class="add-block">
          <div @click.prevent="addAnotherHealth" class="additional">
            <svg-icon name="plus" />
            <label>Add another</label>
          </div>
        </div>
      </div>
      <div class="select-level">
        <label>Select the physical difficulty level</label>
        <div class="radio-buttons-list">
          <div v-for="cat in physCategories" class="item">
            <input :key="cat.id" v-model="rest.physicalDifficultyLevel" :value="cat.id" type="radio" />
            <div class="label-block">
              <div class="title">{{ cat.name }}</div>
              <div class="description">{{ cat.description }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="phone-number">
        <label>Your phone number</label>
        <div
          class="description"
        >This is the number travelers will call if they need to reach you on the day of the travel.</div>
        <div class="inputs">
          <base-select
            width="73px"
            max-width="73px"
            inputWidth="73px"
            class="inputs-select"
            @selected-option="setPrefix"
            custom
            itemName="international_calling_code"
            valueName="id"
            v-model="phoneForm.phone_country_id"
            :custValue="phoneForm.phone_country_id"

            :options="phoneIndexes"
          ></base-select>
          <base-input inputWidth="204px" class="input-value" v-model="phoneForm.phone_number"></base-input>
        </div>
      </div>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(12)"
      @keyup.enter="next(12)"
      class="button dark long"
      type="button"
    >Next</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      tour: {
        difficulty: "easy",
        restrictions: [],
        health: [],
        phone: "",
      },
      prefixPhone: null,
      phoneForm: {
          phone_number: "",
          phone_country_id: 1,
          fullPhoner: "",
      },
      showRestrictionInput: false,
      restriction: "",
      showHealthInput: false,
      health: "",
      prefixes: ["+34"],
      defaultPrefix: "+34",

      rest:{
          accessibilities: [
          ],
          customAccessibilities: [
          ],
          healthRestrictions: [
          ],
          customHealthRestrictions: [
          ],
          physicalDifficultyLevel: 55,
          healthRestrictionsList: []
      },
      accessibilities: [],
      healthRestrictions: [],
    };
  },
  computed: {
      ...mapState('ui', ['phoneIndexes']),
      ...mapGetters({
          stateTour: 'tours/tour',
          accessibilityCategories: "tours/accessibilityCategories",
          healthCategories: "tours/healthCategories",
          physCategories: "tours/physCategories",
      }),
  },
  watch: {
      stateTour: {
          handler(val){
//              this.rest = val.productPhysicalRestrictions;
          },
          deep: true
      },
  },
  beforeMount(){
    this.phoneForm.phone_number = this.stateTour.phone_number;
    this.phoneForm.phone_country_id = this.stateTour.phone_country_id;
//    this.rest.accessibilities = [];
//    this.rest.healthRestrictions = [];
    let compContext = this;

    if(this.stateTour.productPhysicalRestrictions.accessibilities.length > 1){
        this.rest.physicalDifficultyLevel = this.stateTour.productPhysicalRestrictions.physicalDifficultyLevel;
        this.rest = this.stateTour.productPhysicalRestrictions;
        compContext.rest.healthRestrictionsList = [];
        this.healthCategories.forEach(function (element, index) {
            let body = {
                category_id: element.id,
                is_enabled: 0,
                category_name: element.name,
                category_description: element.description
            }
            compContext.rest.healthRestrictionsList.push(body);
        });
    }else{
        this.rest.physicalDifficultyLevel = this.stateTour.productPhysicalRestrictions.physicalDifficultyLevel;
        console.log(this.accessibilityCategories)
        this.accessibilityCategories.forEach(function (element, index) {
            let body = {
                category_id: element.id,
                is_enabled: 0,
                category_name: element.name,
                category_description: element.description
            }
            compContext.rest.accessibilities.push(body);
        });
        this.healthCategories.forEach(function (element, index) {
            let body = {
                category_id: element.id,
                is_enabled: 0,
                category_name: element.name,
                category_description: element.description
            }
            compContext.rest.healthRestrictionsList.push(body);
        });
    }

  },
  mounted(){
    this.getTour();
    this.getAccesibilities();
    this.getHealth();
    this.getPhysicalDifficulty();
    this.getPhoneIndexes();
  },
  methods: {

    ...mapActions("tours", ["fetchSetStep","fetchTenthStep","getTour","getAccesibilities","getPhysicalDifficulty","getHealth"]),
    ...mapActions('ui', ['getPhoneIndexes']),
    next(val) {
//      this.fetchSetStep({
//        step: val
//      });
        //this.phoneForm.fullPhoner = this.prefixPhone + this.phoneForm.phone_number;

        let body = {
            tour: this.phoneForm,
            rest: this.rest
        }
        this.fetchTenthStep(body)
    },

    addAnotherRestriction() {
      this.showRestrictionInput = true;
      this.restriction = "";
    },

    addRestriction() {
      const item = this.restriction;
      this.rest.customAccessibilities.push(item);
      this.restriction = "";
    },

    addAnotherHealth() {
      this.showHealthInput = true;
      this.health = "";
    },

    addHealth() {
      const item = this.health;
      this.rest.customHealthRestrictions.push(item);
      this.health = "";
    },

    setPrefix(val){
        this.phoneForm.phone_country_id = val;
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