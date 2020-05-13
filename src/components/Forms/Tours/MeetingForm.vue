<template>
  <div class="form-container meetings-block">
    <div class="form-content">
      <h6>Tell us how and where you meet your travelers</h6>

      <!--<base-select-->
        <!--@selected-option="setMeetType"-->
        <!--:options="typesPickUp"-->
        <!--custom-->
        <!--itemName="value"-->
        <!--valueName="id"-->
        <!--:custValue="productPickUpDropOff.pickUpType"-->
        <!--width="718px"-->
        <!--max-width="718px"-->
        <!--inputWidth="718px"-->
        <!--label="Choose one"-->
      <!--/>-->

      <div class="start-point">
        <div v-for="(point,index) in productPickUpDropOff.pickUpPoints" :key="index">
          <div class="point-no">
            <div class="square">
              <span>{{ index + 1 }}</span>
            </div>
            <span class="title">Starting point</span>
          </div>
          <vue-google-autocomplete
                  :types="['establishment','(cities)','regions']"
                  :id="'index-' + String(index)"
                  classname="form-control search-iput-maps"
                  placeholder="Start typing"
                  :value="point.place_name"
                  v-on:placechanged="getAddressData"
                  @inputChange="setCurrentIndex(index)"
          >
          </vue-google-autocomplete>
          <textarea placeholder="Describe the place" v-model="productPickUpDropOff.pickUpPoints[index].description" class="temporary-textarea"></textarea>
        </div>

        <div class="add-category-block">
          <div @click.prevent="addAnotherPoint" class="add-category">
            <svg-icon name="plus" @click.prevent="addAnotherPoint" />
            <label>Add another starting point</label>
          </div>
        </div>
        <label
          class="normal-bold"
        >If your starting point doesn't look right, you can drag the pin to adjust its location.</label>
        <div class="map">
          <GmapMap
                  :center="startCenter"
                  :zoom="zoomStart"
                  map-type-id="terrain"
                  style="width: 716px; height: 240px; margin-bottom: 31px"
                  :types="['establishment','(cities)','regions']"
          >
            <GmapMarker
                    :key="m.place_id"
                    v-for="(m, index) in productPickUpDropOff.pickUpPoints"
                    v-if="m.placeResultData || m.location"
                    :position="m.placeResultData ? m.placeResultData.geometry.location : m.location"
                    :clickable="true"
                    :draggable="true"
                    @click="m.placeResultData ? m.placeResultData.geometry.location : m.location"
            />
          </GmapMap>
        </div>

        <label >Does this tour end at the same location(s) where it started?</label>
        <div class="radio-block">
          <div class="radio">
            <input type="radio" v-model="tour.isEndpoint" value="1" />
            <span>Yes</span>
          </div>
          <div class="radio">
            <input type="radio" v-model="tour.isEndpoint" value="0" />
            <span>No</span>
          </div>
        </div>



        <template v-if="tour.isEndpoint == '0'">
          <div v-for="(point,index) in productPickUpDropOff.dropOffPoints" :key="index">
            <div class="point-no">
              <div class="square">
                <span>{{ index + 1 }}</span>
              </div>
              <span class="title">End point</span>
            </div>
            <vue-google-autocomplete
                    :types="['establishment','(cities)','regions']"
                    :id="'index-endpoint' + String(index)"
                    classname="form-control search-iput-maps"
                    placeholder="Start typing"
                    v-on:placechanged="getAddressDataEndpoint"
                    @inputChange="setCurrentIndexEndpoint(index)"
                    :value="point.place_name"
            >
            </vue-google-autocomplete>
            <textarea placeholder="Describe the place" v-model="productPickUpDropOff.dropOffPoints[index].description" class="temporary-textarea"></textarea>
          </div>
        </template>

        <div v-if="tour.isEndpoint == '0'">
          <div class="add-category-block">
            <div @click.prevent="addAnotherEndPoint" class="add-category">
              <svg-icon name="plus" @click.prevent="addAnotherPoint" />
              <label>Add a different end point</label>
            </div>
          </div>
          <label
            class="normal-bold"
          >If your starting point doesn't look right, you can drag the pin to adjust its location.</label>
          <div class="map">
            <GmapMap
                    :center="endCenter"
                    :zoom="zoomEnd"
                    map-type-id="terrain"
                    style="width: 716px; height: 240px; margin-bottom: 31px"
            >
              <GmapMarker
                      :key="m.place_id"
                      v-for="(m, index) in productPickUpDropOff.dropOffPoints"
                      v-if="m.placeResultData || m.location"
                      :position="m.placeResultData ? m.placeResultData.geometry.location : m.location"
                      :clickable="true"
                      :draggable="true"
                      @click="m.placeResultData ? m.placeResultData.geometry.location : m.location"
              />
            </GmapMap>
          </div>
        </div>
      </div>

      <!--<label class="checkbox-label">Where do you pick up your travelers</label>-->
      <!--<div class="checkbox-block">-->
        <!--<div v-bind:key="index" v-for="(subcategory,index) in pickupCategories" class="checkbox">-->
          <!--<input type="checkbox" />-->
          <!--<label>{{ subcategory }}</label>-->
        <!--</div>-->
      <!--</div>-->

      <label class="checkbox-label">How long before departure does your pickup start</label>
      <div class="input-and-select-block">
        <vue-timepicker v-model="yourTimeValue" format="HH:mm"></vue-timepicker>
        <!--<base-input-->
          <!--inputWidth="30px"-->
          <!--v-model="productPickUpDropOff.timeBeforeStart"-->
          <!--:defaultValue="tour.pickupDescription"-->
        <!--/>-->
        <!--<base-select-->
          <!--width="102px"-->
          <!--max-width="104px"-->
          <!--inputWidth="104px"-->
          <!--v-model="tour.timeType"-->
          <!--:options="tymeTypes"-->
          <!--:defaultValue="defaultTime"-->
        <!--&gt;</base-select>-->
      </div>



      <label class="checkbox-label">Pickup information</label>
      <!-- No base textarea yet -->
      <textarea v-model="productPickUpDropOff.pickUpDescription" class="temporary-textarea"></textarea>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(6)"
      @keyup.enter="next(6)"
      class="button dark long"
      type="button"
    >Next</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueGoogleAutocomplete from 'vue-google-autocomplete'
// Main JS (in UMD format)
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  components: { VueGoogleAutocomplete, VueTimepicker },
  data() {
    return {
      tour: {
        meetType: null,
        pickupDescription: "",
        timeValue: 0,
        timeType: 1,
        address: "",
        points: [
          {
            address: "",
            info: "",
            lat: 0,
            long: 0
          }
        ],
        endPoints: [
          {
            address: "",
            info: "",
            lat: 0,
            long: 0
          }
        ],
        isEndpoint: 0,
      },
      productPickUpDropOff: {
            pickUpType: 1,
            pickUpDescription: "",
            timeBeforeStart: 0,
            pickUpPoints: [
            ],
            dropOffPoints: [
            ]
        },
      categories: [{key:1,value:"Starting Point"}, {key:2,value:"No Starting Point"}],
      subCategories: ["Category1", "Category2", "Category3", "Category4"],
      tymeTypes: ["Days"],
      defaultTime: "Days",
      showStart: false,
      typesPickUp: [{id:1,value:'WE_PICK_UP_TRAVELERS'},{id:2,value:'WE_MEET_TRAVELERS_ON_STARTING_POINT'}],
      address: '',
      addressEndpoint: '',
      currentIndex: '',
      currentIndexEndpoint: '',
      startCenter: { lat: 40.730610, lng: -73.93524 },
      endCenter: { lat: 40.730610, lng: -73.93524 },
      zoomStart: 7,
      zoomEnd: 7,
      yourTimeValue: {
          HH: '00',
          mm: '00'
      },
    };
  },
  computed: {
      ...mapGetters({
          pickupTypes: 'tours/pickupTypes',
          pickupCategories: 'tours/pickupCategories',
          stateTour: 'tours/tour',
      }),
  },
  mounted(){
    this.getPickUpTypes();
    this.getPickups();
    this.getTour();
  },
  beforeMount(){
    if(this.stateTour.productPickUpDropOff.pickUpType){

        if(this.stateTour.productPickUpDropOff.timeBeforeStart){
            this.convertMinutesToObj(this.stateTour.productPickUpDropOff.timeBeforeStart);
        }


        if(this.stateTour.productPickUpDropOff.pickUpType == 1){
            this.showStart = true;
        }

        this.productPickUpDropOff = this.stateTour.productPickUpDropOff;
        this.productPickUpDropOff.pickUpPoints = this.stateTour.productPickUpDropOff.pickUpPoints;
        if(this.productPickUpDropOff.pickUpPoints){
            if(this.productPickUpDropOff.pickUpPoints.length > 0){
                this.startCenter = this.productPickUpDropOff.pickUpPoints[0].location;
                this.zoomStart = 17;
            }
        }
        if(this.productPickUpDropOff.dropOffPoints){
            if(this.productPickUpDropOff.dropOffPoints.length > 0){
                this.endCenter = this.productPickUpDropOff.dropOffPoints[0].location;
                this.zoomEnd = 17;
            }
        }
        this.productPickUpDropOff.dropOffPoints = this.stateTour.productPickUpDropOff.dropOffPoints;

        this.productPickUpDropOff.timeBeforeStart = this.stateTour.productPickUpDropOff ? this.stateTour.productPickUpDropOff.timeBeforeStart : null;
    }
  },
  watch: {
      stateTour: {
          handler(val){
              if(val.productPickUpDropOff){
//                  this.productPickUpDropOff = val.productPickUpDropOff;
//                  console.log(val.productPickUpDropOff, 'DROP OFF POINTS');
              }
          },
          deep: true
      },
      pickupTypes: {
          handler(val){
//              console.log(val, 'GETTER');
          },
          deep: true
      }
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep","getPickUpTypes","fetchFifthStep","getPickups",'getTour']),
    convertTimeToMinutes(){
        return parseInt(this.yourTimeValue.HH) * 60 + parseInt(this.yourTimeValue.mm)
    },
    convertMinutesToObj(mins){
        const hours = String(Math.floor(mins/60)).length > 1 ? String(Math.floor(mins/60)) : '0' + String(Math.floor(mins/60))
        const minutes = String(mins % 60).length > 1 ? String(mins % 60) : '0' + String(mins % 60)
        console.log(hours, minutes, "HOURS MINUTES");

        this.yourTimeValue = {
            HH: hours,
            mm: minutes
        };
    },
    next(val) {
        this.productPickUpDropOff.timeBeforeStart = this.convertTimeToMinutes();

        if(this.productPickUpDropOff.pickUpType == 2){
            let body = {
                pickUpType: this.productPickUpDropOff.pickUpType,
                pickUpDescription: this.productPickUpDropOff.pickUpDescription,
                timeBeforeStart: this.productPickUpDropOff.timeBeforeStart,
            }
            let arr = [];
            this.productPickUpDropOff.pickUpPoints.forEach(function(element, index) {
                let newObj = {
                    place_id: element.place_id,
                    description: element.description
                }
                arr.push(newObj);
            });
            body.pickUpPoints = arr;

            this.fetchFifthStep(body)
        }else{
            let body = this.productPickUpDropOff;

            let arr = [];
            this.productPickUpDropOff.pickUpPoints.forEach(function(element, index) {
                let newObj = {
                    place_id: element.place_id,
                    description: element.description,
                    category_id: 1
                }
                arr.push(newObj);
            });
            body.pickUpPoints = arr;

            this.fetchFifthStep(body)
        }


        //console.log(this.productPickUpDropOff);
//      this.fetchSetStep({
//        step: val
//      });
    },
    remove(index) {
      this.images.splice(index, 1);
    },
    setMeetType(value) {
      if (value == 1) this.showStart = true;
      if (value == 2) this.showStart = false;
      this.productPickUpDropOff.pickUpType = value;
    },
    addAnotherPoint() {
      let point = {
          place_id: "ChIJaQuRhDlpNBkRky5ZXVac4fU",
          description: "",
          category_id: 2
      };
      this.productPickUpDropOff.pickUpPoints.push(point);
    },
    addAnotherEndPoint() {
      let point = {
          place_id: "ChIJaQuRhDlpNBkRky5ZXVac4fU",
          description: "",
          category_id: 2
      };
      this.productPickUpDropOff.dropOffPoints.push(point);
    },
    getAddressData: function (addressData, placeResultData, id) {

        this.startCenter = placeResultData.geometry.location;
        this.zoomStart = 17;
        //console.log(placeResultData.geometry.location, "PLACE RESULT DATA");
        this.productPickUpDropOff.pickUpPoints[this.currentIndex].place_id = placeResultData.place_id;
        this.productPickUpDropOff.pickUpPoints[this.currentIndex].placeResultData = placeResultData;
        this.productPickUpDropOff.pickUpPoints[this.currentIndex].category_id = 1;
    },
    setCurrentIndex(index){
        this.currentIndex = index;
    },
    getAddressDataEndpoint: function (addressData, placeResultData, id) {
        this.endCenter = placeResultData.geometry.location;
        this.zoomEnd = 17;
        this.productPickUpDropOff.dropOffPoints[this.currentIndexEndpoint].place_id = placeResultData.place_id;
        this.productPickUpDropOff.dropOffPoints[this.currentIndexEndpoint].placeResultData = placeResultData;
        this.productPickUpDropOff.dropOffPoints[this.currentIndexEndpoint].category_id = 1;
    },
    setCurrentIndexEndpoint(index){
        this.currentIndexEndpoint = index;
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