<template>
  <div class="form-container">
    <div class="form-content">
      <h6>Input Language and Title</h6>
      <base-select
        custom
        itemName="name"
        valueName="id"
        v-model="tour.language_id"
        :custValue="tour.language_id"
        :options="languages"
        @selected-option="setLanguage"
        width="718px"
        max-width="718px"
        inputWidth="315px"
        label="Select the language you will use to enter your product details"
        description="We will translate your product automatically, so it’s important to write all of your descriptions in one language. If your product or service is offered in multiple languages, you will be able to select those later."
      />
      <base-select
              v-if="profile.role != 'manager'"
              custom
              itemName="name"
              valueName="id"
              v-model="tour.operator_id"
              :custValue="tour.operator_id"
              :options="operators"
              @selected-option="setOperator"
              width="718px"
              max-width="718px"
              inputWidth="315px"
              label="Select the operator"
      />
      <base-input
        v-model="tour.name"
        label="Enter your product title"
      />
      <base-input
        v-model="tour.reference_code"
        label="Product reference code"
        inputWidth="291px"
        description="Assign a reference code to your product for your internal use"
      />
      <base-select
              v-if="countries.length > 0"
              custom
              itemName="name"
              valueName="id"
              v-model="country_id"
              :custValue="country_id"
              :options="countries"
              @selected-option="setCountry"
              width="718px"
              max-width="718px"
              inputWidth="315px"
              label="Select country"
              description="Country description"
      />
      <base-select
              v-if="country_id && cities.length > 0"
              custom
              itemName="name"
              valueName="id"
              v-model="tour.city_id"
              :custValue="tour.city_id"
              :options="cities"
              @selected-option="setCity"
              width="718px"
              max-width="718px"
              inputWidth="315px"
              label="Select city"
              description="City description"
      />
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      :disabled="submitDisabled"
      @click.prevent="next(2)"
      @keyup.enter="next(2)"
      class="button dark long submit-button-add-tour"
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
        language_id: 1,
        name: "",
        reference_code: "",
        operator_id: "",
        city_id: null,
      },
      country_id: null,
      currentStep: 1,
      submitDisabled: true
    };
  },
  computed: {
    ...mapGetters({
      stateTour: "tours/tour",
      languages: "tours/languages",
      operators: "operators/operators",
      countries: "countries/tourCountries",
      cities: "cities/countryCities",
//      user: "auth/item",
    }),
    ...mapState('auth', { profile: 'item' })
  },
  watch: {
    tour: {
      handler(val) {
          if(val.name){
              if (val.name && val.reference_code) {
                  this.submitDisabled = false;
              } else {
                  this.submitDisabled = true;
              }
          }
      },
      deep: true
    },
    stateTour: {
      handler(val) {
      },
      deep: true
    }
  },
  beforeMount() {
      this.tour.language_id = this.stateTour.language_id;

      if(this.profile.role == 'manager'){
          if(this.profile.userToOperator){
              this.operator_id = null;
          }
      }else{
          this.tour.operator_id = this.stateTour.operator_id;
      }

      if(this.stateTour.city){
          this.country_id = this.stateTour.city.country_id;
          this.getCountryCities(this.country_id);
          this.tour.city_id = this.stateTour.city.id;
          console.log("HERE WE GO??", this.country_id, this.tour.city_id)
      }

      this.tour.name = this.stateTour.name;
      this.tour.reference_code = this.stateTour.reference_code;
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep", "fetchFirstStep","getLanguages","getTour","getProductPriceSettings","getCutOffCategories","getConfirmationMethods","getBookingProcess","getThemes"]),
    ...mapActions("operators", ["getOperators"]),
    ...mapActions("countries", ["getTourCountries"]),
    ...mapActions("cities", ["getCountryCities"]),

    next(val) {
      const body = this.tour;
      if(this.profile.role == 'manager'){
          body.operator_id = null
      }
      this.fetchFirstStep(body);
    },

    setTourData(val){
        this.tour.language_id = val.language_id;
        this.tour.name = val.name;
        this.tour.reference_code = val.reference_code;
    },

    setLanguage(val) {
        this.tour.language_id = val;
    },
    setOperator(val) {
        this.tour.operator_id = val;
    },
    setCountry(val){
        this.country_id = val;
        this.getCountryCities(val);
    },
    setCity(val){
        this.tour.city_id = val;
    }
  },
  mounted() {
//    this.tour = this.stateTour;
    if(this.$route.params.id){
        this.getTour();
    }
    this.getLanguages();
    this.getThemes();
    this.getOperators();
    this.getProductPriceSettings();
    this.getCutOffCategories();
    this.getConfirmationMethods();
    this.getBookingProcess();
    this.getTourCountries();
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
.submit-button-add-tour{
  margin-bottom: 150px;
}
</style>