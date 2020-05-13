<template>
  <div class="form-container meetings-block">
    <div class="form-content languages-page">
      <h6>Tell us about the guides provided</h6>

      <label>Do you offer in-person, audio or written guides?</label>
      <div class="radio-block">
        <div class="radio">
          <input type="radio" v-model="productGuides.is_guide_available" value="1" />
          <span>Yes</span>
        </div>
        <div class="radio">
          <input type="radio" v-model="productGuides.is_guide_available" value="0" />
          <span>No</span>
        </div>
      </div>

      <label v-if="productGuides.is_guide_available == 1" class="checkbox-label">What type of guide is included?</label>
      <div v-if="productGuides.is_guide_available == 1" class="checkbox-block">
        <div class="checkbox">
          <input v-model="productGuides.has_in_person_guide" value="1" type="checkbox" />
          <div class="checkbox-label">
            <div class="title-checkbox">Has in Person guide</div>
            <div class="description-checkbox">Has in Person guide description</div>
          </div>
        </div>
        <div class="checkbox">
          <input v-model="productGuides.has_audio_guide" value="1" type="checkbox" />
          <div class="checkbox-label">
            <div class="title-checkbox">Has audio guide</div>
            <div class="description-checkbox">Has audio guide description</div>
          </div>
        </div>
        <div class="checkbox">
          <input v-model="productGuides.has_written_guide" value="1" type="checkbox" />
          <div class="checkbox-label">
            <div class="title-checkbox">Has written guide</div>
            <div class="description-checkbox">Has written guide description</div>
          </div>
        </div>
      </div>

      <div v-if="productGuides.is_guide_available == 1">
        <div v-if="productGuides.has_in_person_guide" class="select-block">
          <div class="select-block-title">Choose the languages you offer</div>
          <base-select
                  v-for="(language,index) in tour.languages"
                  @selected-option="setPersonGuideLanguage"
                  :key="'lang'+index"
                  width="315px"
                  max-width="315px"
                  inputWidth="315px"
                  label="In-person guide language"
                  custom
                  :custValue="productGuides.personGuideLanguages ? productGuides.personGuideLanguages[index] : null"
                  itemName="name"
                  valueName="id"
                  :options="langCategories"
          ></base-select>
          <div class="add-language-block">
            <div @click.prevent="addLanguage" class="add-language">
              <svg-icon name="plus" />
              <label>Add another Person Guide language</label>
            </div>
          </div>
        </div>

        <div v-if="productGuides.has_audio_guide" class="select-block">
          <base-select
                  v-for="(language, index) in tour.guideLanguages"
                  @selected-option="setAudioLanguage"
                  :key="'audio' + index"
                  width="315px"
                  max-width="315px"
                  inputWidth="315px"
                  label="Audio guide language"
                  :options="langCategories"
                  :custValue="productGuides.audioGuideLanguages ? productGuides.audioGuideLanguages[index] : null"
                  custom
                  itemName="name"
                  valueName="id"
          ></base-select>
          <div class="add-language-block">
            <div @click.prevent="addGuideLanguage" class="add-language">
              <svg-icon name="plus" />
              <label>Add another Audio Guide language</label>
            </div>
          </div>
        </div>

        <div v-if="productGuides.has_written_guide" class="select-block">
          <base-select
                  v-for="(language, index) in tour.writtenGuideLanguages"
                  @selected-option="setWrittenLanguage"
                  :key="'writen' + index"
                  width="315px"
                  max-width="315px"
                  inputWidth="315px"
                  label="Written guide language"
                  :options="langCategories"
                  :custValue="productGuides.writtenGuideLanguages ? productGuides.writtenGuideLanguages[index] : null"
                  custom
                  itemName="name"
                  valueName="id"
          ></base-select>
          <div class="add-language-block">
            <div @click.prevent="addWrittenGuideLanguage" class="add-language">
              <svg-icon name="plus" />
              <label>Add another Written Guide language</label>
            </div>
          </div>
        </div>

        <label>Are your guides licensed/certified?</label>
        <div class="radio-block">
          <div class="radio">
            <input type="radio" v-model="productGuides.is_guide_licensed" value="1" />
            <span>Yes</span>
          </div>
          <div class="radio">
            <input type="radio" v-model="productGuides.is_guide_licensed" value="0" />
            <span>No</span>
          </div>
        </div>

        <label>Do your guides also serve as drivers?</label>
        <div class="radio-block">
          <div class="radio">
            <input type="radio" v-model="productGuides.is_driver_is_guide" value="1" />
            <span>Yes</span>
          </div>
          <div class="radio">
            <input type="radio" v-model="productGuides.is_driver_is_guide" value="0" />
            <span>No</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(8)"
      @keyup.enter="next(8)"
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
        guidesOffered: 0,
        guidesCertified: 0,
        driverServed: 0,

        languages: [{ value: null }],
        guideLanguages: [{ value: null }],
        writtenGuideLanguages: [{ value: null }]
      },
      guides: [
        {
          title: "In-person guide",
          description: "e.g. tour guide, instructor, group leader, etc."
        },
        {
          title: "In-person guide",
          description: "e.g. tour guide, instructor, group leader, etc."
        },
        {
          title: "In-person guide",
          description: "e.g. tour guide, instructor, group leader, etc."
        },
        {
          title: "In-person guide",
          description: "e.g. tour guide, instructor, group leader, etc."
        }
      ],
//      languages: ["English", "Russian", "German", "French"],

      productGuides: {
            is_guide_available: 0,
            has_in_person_guide: 0,
            has_audio_guide: 0,
            has_written_guide: 0,
            is_guide_licensed: 1,
            is_driver_is_guide: 1,
            personGuideLanguages: [
            ],
            audioGuideLanguages: [
            ],
            writtenGuideLanguages: [
            ]
        },
    };
  },
  computed: {
      ...mapGetters({
          guidesProduct: 'tours/productGuides',
          languages: 'tours/languages',
          langCategories: 'tours/langCategories'
      }),
  },
  beforeMount(){
      //this.productGuides = this.guidesProduct;
      if(this.productGuides.is_guide_available == 1 || this.productGuides.is_guide_available == 0){
          this.productGuides.personGuideLanguages = this.guidesProduct.personGuideLanguages ? this.guidesProduct.personGuideLanguages : [];
          this.productGuides.audioGuideLanguages = this.guidesProduct.audioGuideLanguages ? this.guidesProduct.audioGuideLanguages : [];
          this.productGuides.writtenGuideLanguages = this.guidesProduct.writtenGuideLanguages ? this.guidesProduct.writtenGuideLanguages : [];
          this.tour.languages = this.guidesProduct.personGuideLanguages ? this.guidesProduct.personGuideLanguages : [];
          this.tour.guideLanguages = this.guidesProduct.audioGuideLanguages ? this.guidesProduct.audioGuideLanguages : [];
          this.tour.writtenGuideLanguages = this.guidesProduct.writtenGuideLanguages ? this.guidesProduct.writtenGuideLanguages : [];
      }
  },
  watch: {
      guidesProduct: {
          handler(val){
              this.productGuides = val;
              this.productGuides.personGuideLanguages = val.personGuideLanguages ? val.personGuideLanguages : [];
              this.productGuides.audioGuideLanguages = val.audioGuideLanguages ? val.audioGuideLanguages : [];
              this.productGuides.writtenGuideLanguages = val.writtenGuideLanguages ? val.writtenGuideLanguages : [];
          },
          deep: true
      },
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep","getProductGuides","fetchSeventhStep","getTour","getLangCategories"]),

    next(val) {
        console.log(this.productGuides.is_guide_available, "IS AVAILABLE")
        if(this.productGuides.is_guide_available == 0){
            this.productGuides = {
                is_guide_available: 0
            }
            const body = this.productGuides;
            this.fetchSeventhStep(body)
        }else{
            const body = this.productGuides;
            body.has_in_person_guide = this.productGuides.has_in_person_guide ? 1 : 0;
            body.has_audio_guide = this.productGuides.has_audio_guide ? 1 : 0;
            body.has_written_guide = this.productGuides.has_written_guide ? 1 : 0;
            this.fetchSeventhStep(body)
        }
//      this.fetchSetStep({
//        step: val
//      });
    },

    setLanguage(value) {},

    addLanguage() {
      const lang = {
        value: null
      };
      this.tour.languages.push(lang);
    },
    addGuideLanguage() {
      const lang = {
        value: null
      };
      this.tour.guideLanguages.push(lang);
    },
    addWrittenGuideLanguage() {
        const lang = {
            value: null
        };
        this.tour.writtenGuideLanguages.push(lang);
    }  ,
    setPersonGuideLanguage(val){
        if(this.productGuides.personGuideLanguages.indexOf(val) == -1){
            this.productGuides.personGuideLanguages.push(val);
        }
    },
    setAudioLanguage(val){
        if(this.productGuides.audioGuideLanguages.indexOf(val) == -1){
            this.productGuides.audioGuideLanguages.push(val);
        }
    },
    setWrittenLanguage(val){
        if(this.productGuides.writtenGuideLanguages.indexOf(val) == -1){
            this.productGuides.writtenGuideLanguages.push(val);
        }
    },
  },
  mounted(){
      this.getProductGuides();
      this.getTour();
      this.getLangCategories();
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