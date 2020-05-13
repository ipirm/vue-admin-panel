<template>
  <div class="form-container">
    <base-modal class="attraction-modal" :active="atractionModal" @close="atractionModal = false">
      <div
        class="title"
      >{{ !atractionForm.attrIndex && atractionForm.attrIndex !== 0 ? 'Add' : 'Edit' }} an attraction</div>
      <div class="content-modal">
        <vue-google-autocomplete
                :types="['establishment','(cities)','regions']"
                id="atraction-search-input"
                classname="form-control search-iput-maps"
                placeholder="Start typing"
                :value="atractionForm.place_name"
                v-on:placechanged="getAddressData"
        >
        </vue-google-autocomplete>
        <div class="textarea-block">
          <label>Describe what travelers will see and do here</label>
          <textarea
            v-model="atractionForm.description"
            class="temporary-textarea"
            placeholder="Briethly describe etc."
          ></textarea>
        </div>
        <div class="checkbox-block">
          <label class="main-label">How much time do travelers typically spend here?</label>
          <div class="checkbox">
            <input v-model="atractionForm.noStop" type="checkbox" />
            <label>Pass by without stopping</label>
          </div>
          <div class="input-and-select-block-modal">
            <vue-timepicker v-model="yourTimeValue" format="HH:mm"></vue-timepicker>

            <!--<base-input v-model="atractionForm.duration" inputWidth="30px" />-->
            <!--<base-select-->
              <!--:defaultValue="daysValue"-->
              <!--@selected-option="setTimeType"-->
              <!--width="102px"-->
              <!--max-width="104px"-->
              <!--inputWidth="104px"-->
              <!--:options="tymeTypes"-->
            <!--&gt;</base-select>-->
          </div>
        </div>

        <!--<div class="radio-block">-->
          <!--<label>Does this tour end at the same location(s) where it started?</label>-->
          <!--<div class="radios">-->
            <!--<div class="radio">-->
              <!--<input v-model="atractionForm.endSame" type="radio" value="yes" />-->
              <!--<span>Yes</span>-->
            <!--</div>-->
            <!--<div class="radio">-->
              <!--<input v-model="atractionForm.endSame" type="radio" value="no" />-->
              <!--<span>No</span>-->
            <!--</div>-->
            <!--<div class="radio">-->
              <!--<input v-model="atractionForm.endSame" type="radio" value="free" />-->
              <!--<span>N/A (Admission is free)</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="buttons-block">
        <button @click.prevent="atractionModal = false" class="button light" type="button">Cancel</button>
        <button
          v-if="!atractionForm.attrIndex && atractionForm.attrIndex !== 0"
          @click.prevent="addAtraction"
          class="button dark save-modal"
          type="button"
        >Save</button>
        <button
          v-if="atractionForm.attrIndex || atractionForm.attrIndex === 0"
          @click.prevent="updateAtraction"
          class="button dark save-modal"
          type="button"
        >Edit</button>
      </div>
    </base-modal>

    <base-modal class="attraction-modal" :active="mealModal" @close="mealModal = false">
      <div
        class="title"
      >{{ !mealForm.mealIndex && mealForm.mealIndex !== 0 ? 'Add' : 'Edit' }} food & drinks</div>
      <div class="content-modal">
        <div class="select-block">
          <label>Meal Type</label>
          <base-select
            class="meal-select"
            width="445px"
            max-width="445px"
            inputWidth="445px"
            :options="mealCategories"
            custom
            itemName="name"
            valueName="id"
            :defaultValue="mealForm.mealType"
            @selected-option="setMealType"
          />
        </div>
        <div class="textarea-block">
          <label>Description</label>
          <textarea
            v-model="mealForm.description"
            class="temporary-textarea"
            placeholder="Briethly describe etc."
          ></textarea>
        </div>
      </div>
      <div class="buttons-block">
        <button
          @click.prevent="mealForm.mealIndex = false"
          class="button light"
          type="button"
        >Cancel</button>
        <button
          v-if="!mealForm.mealIndex && mealForm.mealIndex !== 0"
          @click.prevent="addMeal"
          class="button dark save-modal"
          type="button"
        >Save</button>
        <button
          v-if="mealForm.mealIndex || mealForm.mealIndex === 0"
          @click.prevent="updateMeal"
          class="button dark save-modal"
          type="button"
        >Edit</button>
      </div>
    </base-modal>

    <base-modal class="attraction-modal" :active="accModal" @close="accModal = false">
      <div class="title">Accommodation detail</div>
      <div class="content-modal">
        <div class="textarea-block">
          <label>Describe the basics of where travelers will stay overnight, e.g. the name, or details about the lodging. You’ll add tour options later.</label>
          <textarea
            v-model="accForm.description"
            class="temporary-textarea"
            placeholder="Briethly describe etc."
          ></textarea>
        </div>
      </div>
      <div class="buttons-block">
        <button @click.prevent="accForm.accIndex = false" class="button light" type="button">Cancel</button>
        <button
          v-if="!accForm.accIndex && accForm.accIndex !== 0"
          @click.prevent="addAcc"
          class="button dark save-modal"
          type="button"
        >Save</button>
        <button
          v-if="accForm.accIndex || accForm.accIndex === 0"
          @click.prevent="updateAcc"
          class="button dark save-modal"
          type="button"
        >Edit</button>
      </div>
    </base-modal>

    <div v-if="stateTour">
      <div v-if="stateTour.duration_type != 1" class="form-content tour-details">
        <h6>Tell us about your tour</h6>
        <p
                class="title-description"
        >Describe what travelers will see each day, and which meals are included.</p>

        <div
                v-for="(day, index) in productDays.days"
                :class="{ 'day-unfolded' : index != activeIndex }"
                :key="index"
                class="day"
        >
          <div @click="setActiveIndex(index)" class="folder-title">
            <svg-icon class="arrow" name="arrow_slim"></svg-icon>
            <span class="title">Day {{ index + 1 }}</span>
            <div class="trash" @click.stop="deleteDay(index)">
              <svg-icon name="trash"></svg-icon>
            </div>
          </div>
          <div v-if="index == activeIndex" class="folder-content">
            <base-input v-model="productDays.days[index].title" placeholder="Title e.g. Rome-Florence" />
            <div class="chips">
              <div class="chip">
                <div class="title-block">
                  <div class="title">Itinerary</div>
                  <svg-icon class="help-svg" name="help"></svg-icon>
                  <div class="add-attraction">
                    <div @click.prevent="addAnotherAttraction(index)" class="attraction">
                      <svg-icon name="plus" />
                      <label>Add an attraction</label>
                    </div>
                  </div>
                </div>
                <div
                        v-for="(attraction, attrIndex) in day.attractions"
                        :key="attrIndex"
                        class="chip-body"
                >
                  <div class="element">
                    <div class="element-row">
                      <div class="left-block">
                        <div class="title">{{ attraction.place_name }}</div>
                        <div class="name">{{ attraction.description }}</div>
                        <div
                                class="info"
                        >{{ attraction.duration }} , {{ attraction.price_type != 0  ? 'Admission Included' : 'Admission Not Included' }}</div>
                      </div>
                      <div class="actions">
                        <div
                                class="edit-svg-div"
                                @click="editAttraction(index, attrIndex, attraction)"
                        >
                          <svg-icon class="edit-svg" name="pencil"></svg-icon>
                        </div>
                        <div class="delete-svg-div" @click="deleteAttraction(index, attrIndex)">
                          <svg-icon class="delete-svg" name="trash"></svg-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="stateTour.duration_type != 1" class="chip">
                <div class="title-block">
                  <div class="title">Food and Drinks</div>
                  <svg-icon class="help-svg" name="help"></svg-icon>
                  <div class="add-attraction">
                    <div @click.prevent="addAnotherMeal(index)" class="attraction">
                      <svg-icon name="plus" />
                      <label>Add meal</label>
                    </div>
                  </div>
                </div>
                <div v-for="(meal, mealIndex) in day.meals" :key="mealIndex" class="chip-body">
                  <div class="element">
                    <div class="element-row">
                      <div class="left-block">
                        <div class="title">{{ meal.categoryName }}</div>
                        <div class="name">{{ meal.description }}</div>
                      </div>
                      <div class="actions">
                        <div class="edit-svg-div" @click="editMeal(index, mealIndex, meal)">
                          <svg-icon class="edit-svg" name="pencil"></svg-icon>
                        </div>
                        <div class="delete-svg-div" @click="deleteMeal(index, mealIndex)">
                          <svg-icon class="delete-svg" name="trash"></svg-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="stateTour.duration_type != 1" class="chip">
                <div class="title-block">
                  <div class="title">Accommodation</div>
                  <svg-icon class="help-svg" name="help"></svg-icon>
                  <div class="add-attraction">
                    <div @click.prevent="addAnotherAcc(index)" class="attraction">
                      <svg-icon name="plus" />
                      <label>Add Accommodation</label>
                    </div>
                  </div>
                </div>
                <div v-for="(acc, accIndex) in day.accomodations" :key="accIndex" class="chip-body">
                  <div class="element">
                    <div class="element-row">
                      <div class="left-block">
                        <div class="name">{{ acc.description }}</div>
                      </div>
                      <div class="actions">
                        <div class="edit-svg-div" @click="editAcc(index, accIndex, acc)">
                          <svg-icon class="edit-svg" name="pencil"></svg-icon>
                        </div>
                        <div class="delete-svg-div" @click="deleteAcc(index, accIndex)">
                          <svg-icon class="delete-svg" name="trash"></svg-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="add-category">
          <div v-if="!(stateTour.duration_type == 1 && productDays.days.length > 0)" @click.prevent="addDay" class="attraction">
            <svg-icon name="plus" />
            <label>Add a day</label>
          </div>
        </div>
      </div>
      <div v-if="stateTour.duration_type == 1" class="form-content tour-details-one-day">
        <h6>Tell us about your tour</h6>
        <div class="checkbox-list">
          <label>What's the total duration of your tour from start to finish?</label>
          <div class="checkbox-list-block">
            <div class="checkbox-list-block-item">
              <input v-model="is_flexible" value="0" id="constant" type="radio">
              <label for="constant">Constant</label>
            </div>
            <div class="checkbox-list-block-item">
              <input v-model="is_flexible" value="1" id="flexible" type="radio">
              <label for="flexible">Flexible</label>
            </div>
          </div>
          <div v-if="is_flexible == 0" class="constant-block">
            <div class="hours-block">
              <div class="constant-input-block">
                <base-input v-model="durationHours" inputWidth="31px"></base-input>
              </div>
              <div class="hours-writing">Hours</div>
            </div>
            <div class="minutes-block">
              <div class="constant-input-block">
                <base-input v-model="durationMinutes" inputWidth="30px"></base-input>
              </div>
              <div class="minutes-writing">Minutes</div>
            </div>
          </div>
          <div v-if="is_flexible == 1" class="flexible-block">
            <div class="from-block">
              <base-input v-model="duration_from" inputWidth="31px"></base-input>
            </div>
            <div class="to-writing-block">
              to
            </div>
            <div class="to-block">
              <div class="to-block-input">
                <base-input v-model="duration_to" inputWidth="31px"></base-input>
              </div>
              <div class="to-block-minutes-writing">Minutes</div>
            </div>
          </div>

          <div class="accomodation-block">
            <label>Add all the attractions travelers see</label>
            <div class="chips">
              <div class="chip">
                <div class="title-block">
                  <div class="chip-bodies">
                    <div
                            v-for="(attraction, attrIndex) in oneDayAttractions"
                            :key="attrIndex"
                            class="chip-body"
                    >
                      <div class="element">
                        <div class="element-row">
                          <div class="left-block">
                            <div class="title">{{ attraction.place_name }}</div>
                            <div class="name">{{ attraction.description }}</div>
                            <div
                                    class="info"
                            >{{ attraction.duration }} , {{ attraction.price_type != 0  ? 'Admission Included' : 'Admission Not Included' }}</div>
                          </div>
                          <div class="actions">
                            <div
                                    class="edit-svg-div"
                                    @click="editAttraction(index, attrIndex, attraction)"
                            >
                              <svg-icon class="edit-svg" name="pencil"></svg-icon>
                            </div>
                            <div class="delete-svg-div" @click="deleteAttraction(index, attrIndex)">
                              <svg-icon class="delete-svg" name="trash"></svg-icon>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="add-attraction">
                    <div @click.prevent="addAnotherAttraction(index)" class="attraction">
                      <svg-icon name="plus" />
                      <label>Add an attraction</label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(7)"
      @keyup.enter="next(7)"
      class="button dark long"
      type="button"
    >Next</button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SvgIcon from "../../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
import BaseModal from "@/components/UILibrary/Modals/BaseModal";
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  components: { SvgIcon, BaseModal, VueGoogleAutocomplete, VueTimepicker },
  data() {
    return {
      tour: {
        days: [
          {
            isOpen: true,
            attractions: [],
            meals: [],
            accs: []
          },
          {
            isOpen: true,
            attractions: [],
            meals: [],
            accs: []
          }
        ]
      },
      atractionModal: false,
      currentStep: 1,
      tymeTypes: ["Days"],
      daysValue: "Days",
      atractionForm: {
        title: "",
        description: "",
        noStop: false,
        time: null,
        timeType: null,
        endSame: 0,
        index: null,
        attrIndex: false,
        place_name: '',
        price_type: 0,
        duration: 1,
        place_id: "ChIJaQuRhDlpNBkRky5ZXVac4fU",
      },
      mealModal: false,
      mealForm: {
        category_id: 1,
        categoryName: null,
        description: "",
        mealIndex: false,
        index: null
      },
      accModal: false,
      accForm: {
        description: "",
        accIndex: false,
        index: null
      },

      mealTypes: ["Category 1", "Category2"],

      productDays: {
//        duration: {
//            is_flexible: true,
//            duration: 1,
//            duration_from: 0,
//            duration_to: 0
//        },
        days:[
            {
                isOpen: false,
                title: "",
                attractions: [
                ],
                meals: [
                ],
                accomodations: [
                ]
            }
        ],

        },
      activeIndex: null,
      yourTimeValue: {
          HH: '00',
          mm: '00'
      },

      is_flexible: 0,
      durationHours: 0,
      durationMinutes: 0,
      duration: null,
      duration_from: 0,
      duration_to: 0,
      oneDayAttractions: [],
    };
  },
  computed: {
      ...mapGetters({
          mealCategories: 'tours/mealCategories',
          priceTypes: 'tours/priceTypes',
          stateTour: 'tours/tour',
      }),
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep","fetchSixthStep","getMeals","getPriceTypes","getTour"]),

    convertTimeToMinutes(){
        return parseInt(this.yourTimeValue.HH) * 60 + parseInt(this.yourTimeValue.mm)
    },
    convertMinutesToObj(mins){
        const hours = String(Math.floor(mins/60)).length > 1 ? String(Math.floor(mins/60)) : '0' + String(Math.floor(mins/60))
        const minutes = String(mins % 60).length > 1 ? String(mins % 60) : '0' + String(mins % 60)

        this.yourTimeValue = {
            HH: hours,
            mm: minutes
        };
    },
    next(val) {
      let body = {};

      if(this.stateTour.duration_type == 1){
          if(this.is_flexible){
              body.duration = {
                  is_flexible: this.is_flexible,
                  duration_from: parseInt(this.duration_from),
                  duration_to: parseInt(this.duration_to),
              };
          }else{
              body.duration = {
                  is_flexible: this.is_flexible,
                  duration: parseInt(this.durationHours)*60 + parseInt(this.durationMinutes),
              };
          }
          body.days = [];
          body.days[0] = {};
          body.days[0].attractions = this.oneDayAttractions;
          body.days[0].title = 'One day tour title';
      }else{
          body = this.productDays;
      }

      this.fetchSixthStep(body);
    },
    setActiveIndex(index) {
        if(this.activeIndex == index){
            this.activeIndex = null;
        }else{
            this.activeIndex = index;
        }

//      this.productDays.days[index].isOpen = this.productDays.days[index].isOpen
//        ? false
//        : true;
    },
    deleteDay(index) {
      this.productDays.days.splice(index, 1);
    },
    addAnotherAttraction(index) {
      this.atractionForm = {
        title: "",
        description: "",
        noStop: false,
        time: null,
        timeType: null,
        index: index,
        attrIndex: false,
        endSame: 0,
        place_name: '',
        price_type: 1,
        place_id: "ChIJaQuRhDlpNBkRky5ZXVac4fU",
        duration: 0,
      };
      this.yourTimeValue = {
        HH: '00',
        mm: '00'
      },
      this.atractionModal = true;
    },
    editAttraction(index, attrIndex, attraction) {
      this.atractionForm = {
        title: attraction.title,
        description: attraction.description,
        noStop: attraction.noStop,
        time: attraction.time,
        timeType: attraction.timeType,
        endSame: attraction.endSame,
        index: index,
        attrIndex: attrIndex,
        place_name: attraction.place_name,
        price_type: attraction.price_type,
        place_id: attraction.place_id,
        duration: attraction.duration,
      };
      this.convertMinutesToObj(attraction.duration);
      this.atractionModal = true;
    },
    deleteAttraction(dayInd, attrIndex) {
        if(this.stateTour.duration_type != 1){
            this.productDays.days[dayInd].attractions.splice(attrIndex, 1);
        }else{
            this.oneDayAttractions.splice(attrIndex, 1);
        }
    },
    addAtraction() {
      if(this.stateTour.duration_type != 1){
          this.atractionForm.duration = this.convertTimeToMinutes();
          this.atractionForm.price_type = 1;
          this.productDays.days[this.atractionForm.index].attractions.push(
              this.atractionForm
          );
      }else{
          this.atractionForm.duration = this.convertTimeToMinutes();
          this.atractionForm.price_type = 1;
          this.oneDayAttractions.push(
              this.atractionForm
          );
      }

      this.atractionModal = false;
    },
    updateAtraction() {
      if(this.stateTour.duration_type != 1){
        this.atractionForm.duration = this.convertTimeToMinutes();
        this.atractionForm.price_type = 1;
        this.productDays.days[this.atractionForm.index].attractions[
           this.atractionForm.attrIndex
        ] = this.atractionForm;
      }else{
        this.atractionForm.duration = this.convertTimeToMinutes();
        this.atractionForm.price_type = 1;
        this.oneDayAttractions[
           this.atractionForm.attrIndex
        ] = this.atractionForm;
      }

      this.atractionModal = false;
    },
    addAnotherMeal(index) {
      this.mealForm = {
        category_id: 1,
        categoryName: null,
        description: "",
        mealIndex: false,
        index: index
      };
      this.mealModal = true;
    },
    addMeal() {
      this.productDays.days[this.mealForm.index].meals.push(this.mealForm);
      this.mealModal = false;
    },
    editMeal(index, mealIndex, meal) {
      this.mealForm = {
        category_id: meal.category_id,
        categoryName: meal.categoryName,
        description: meal.description,
        mealIndex: mealIndex,
        index: index
      };
      this.mealModal = true;
    },
    deleteMeal(index, mealIndex) {
      this.productDays.days[index].meals.splice(mealIndex, 1);
    },
    updateMeal() {
      this.productDays.days[this.mealForm.index].meals[
        this.mealForm.mealIndex
      ] = this.mealForm;
      this.mealModal = false;
    },
    addAnotherAcc(index) {
      this.accForm = {
        description: "",
        accIndex: false,
        index: index
      };
      this.accModal = true;
    },
    addAcc() {
      this.productDays.days[this.accForm.index].accomodations.push(this.accForm);
      this.accModal = false;
    },
    editAcc(index, accIndex, acc) {
      this.accForm = {
        description: acc.description,
        accIndex: accIndex,
        index: index
      };
      this.accModal = true;
    },
    deleteAcc(index, accIndex) {
      this.productDays.days[index].accomodations.splice(accIndex, 1);
    },
    updateAcc() {
      this.productDays.days[this.accForm.index].accomodations[
        this.accForm.accIndex
      ] = this.accForm;
      this.accModal = false;
    },
    setTimeType(value) {
      this.atractionForm.timeType = value;
    },
    setMealType(value) {
      this.mealForm.category_id = value;
    },
    addDay() {
      const day = {
          isOpen: false,
          title: "",
          attractions: [
          ],
          meals: [
          ],
          accomodations: [
          ]
      };
      this.productDays.days.push(day);
    },
    getAddressData: function (addressData, placeResultData, id) {
        //console.log(placeResultData);
        this.atractionForm.place_id = placeResultData.place_id;
        this.atractionForm.place_name = placeResultData.name;
    }
  },
  mounted() {
      this.getTour();
      this.getMeals();
      this.getPriceTypes();
  },
  beforeMount(){
      if(this.stateTour.duration_type == 1){
          if(this.stateTour.productDays){
              if(this.stateTour.productDays.duration){
                  if(this.stateTour.productDays.duration.is_flexible){
                      this.is_flexible = this.stateTour.productDays.duration.is_flexible;
                      this.duration_from = this.stateTour.productDays.duration.duration_from;
                      this.duration_to = this.stateTour.productDays.duration.duration_to;
                  }else{
                      this.is_flexible = this.stateTour.productDays.duration.is_flexible;
                      this.durationHours = parseInt(this.stateTour.productDays.duration.duration/60);
                      this.durationMinutes = this.stateTour.productDays.duration.duration%60;
                  }
                  this.oneDayAttractions = this.stateTour.productDays.days[0].attractions;
              }
          }
      }else{
          this.productDays = this.stateTour.productDays;
      }
  },
  watch: {
      stateTour: {
          handler(val){
              if(val.productDays){
                  this.productDays = val.productDays;
              }
          },
          deep: true
      },
  },
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