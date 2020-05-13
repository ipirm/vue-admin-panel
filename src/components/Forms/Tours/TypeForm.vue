<template>
  <div class="form-container">
    <div class="form-content">
      <h6>Type of Product</h6>
      <p
        class="title-description"
      >Choose the broad type that best describes your product. You'll be able to add more details next.

      {{tour.product_type_id}}</p>
      <div class="type-select">
        <div
          v-for="item in productTypes"
          v-bind:key="item.id"
          :class="{ 'type-select-item-active' : item.id == tour.product_type_id  }"
          @click="switchTab(item.id)"
          class="type-select-item"
        >
          <svg-icon class="svg-icon-type" name="flower" />
          <div class="main">
            <h2 class="title-active">{{ item.name }}</h2>
            <p class="main-description">{{ item.description }}</p>
              <select-search-input
                      @click="tour.categories = $event"
                      v-if="item.id == tour.product_type_id"
                      :options="productTypeCategories"
                      @selected-option="setCategoriesList"
                      :custValue="customValue"
                      label="What activities are included?"
                      inputWidth="590px"
                      width="590px"
                      max-width="590px"
                      :disabled="disabled"
              ></select-search-input>

            <div v-if="item.id == tour.product_type_id" class="radio-buttons-list">
              <div class="main-title">
                How long is this tour?
              </div>
              <div v-for="(type,index) in durationTypes" class="chip-block">
                <div class="input-block">
                  <input :value="index" v-model="tour.duration_type"  type="radio">
                </div>
                <div class="title-block">
                  {{ type }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      :disabled="disabled"
      @click.prevent="next(3)"
      @keyup.enter="next(3)"
      class="button dark long"
      type="button"
    >Next</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import SelectSearchInput from '@/components/UILibrary/Selects/SelectSearchInput'

    export default {
        data() {
            return {
                languages: ["English", "Russian"],
                items: [
                    {
                        title: "Tour",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.",
                        isActive: true,
                        id: 1,
                        activities: []
                    },
                    {
                        title: "Activity",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.",
                        isActive: false,
                        id: 2,
                        activities: []
                    },
                    {
                        title: "Ticket or Pass",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.",
                        isActive: false,
                        id: 3,
                        activities: []
                    },
                    {
                        title: "Transport",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.",
                        isActive: false,
                        id: 4,
                        activities: []
                    }
                ],
                currentStep: 1,
                tour: {
                    product_type_id: null,
                    typeCategories: [],
                    duration_type: 1
                },
                smth: null,
                submitDisabled: false,
                picked: [],
                disabled: false,
                customValue: []
            };
        },
        beforeMount() {
            this.tour.product_type_id = this.stateTour.product_type_id;
            if( this.stateTour.product_type_id){
                this.getProductTypeCategories(this.stateTour.product_type_id);
            }
            this.customValue = this.stateTour.typeCategories ? this.stateTour.typeCategories : [];
            console.log(this.customValue, "CUSTOM VALUE");
            this.tour.duration_type = this.stateTour.duration_type ? this.stateTour.duration_type : 1;
            this.disabled = this.stateTour.product_type_id != null ? true : false;
        },
        computed: {
            ...mapGetters({
                productTypes: 'tours/productTypes',
                productTypeCategories: 'tours/productTypeCategories',
                stateTour: 'tours/tour',
                durationTypes: 'tours/durationTypes',
            }),
        },
        methods:{
            ...mapActions('tours', ['fetchSetStep','getProductTypes','getProductTypeCategories','fetchSecondStep','getTour','getDurationTypes']),

            switchTab(id){
                if(this.tour.product_type_id != id){
                    this.tour.product_type_id = id;
                    this.getProductTypeCategories(id);
                }
            },
            next(val){
                console.log(this.tour, "TOUR DATA");
                const body = this.tour;
                this.fetchSecondStep(body)
            },

            setProductType(val){
                this.tour.product_type_id = val;
            },

            setCategoriesList(val){
                this.tour.typeCategories = val;
            }
        },
        watch: {
            stateTour: {
                handler(val){
                    this.tour.product_type_id = val.product_type_id;
                    this.tour.typeCategories = val.typeCategories ? this.stateTour.typeCategories : [];
                    this.tour.duration_type = val.duration_type ? this.stateTour.duration_type : 1;
                    this.disabled = val.product_type_id ? true : false;
                },
                deep: true
            },
        },
        created(){
            this.getProductTypes();
        },
        mounted(){
            this.getTour();
            this.getDurationTypes();
        },
        components: {
            SelectSearchInput
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