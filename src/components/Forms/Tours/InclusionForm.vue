<template>
  <div class="form-container">
    <base-modal
      class="attraction-modal inc-modal"
      :active="inclusionModal"
      @close="inclusionModal = false"
    >
      <div class="title">Add an inclusion</div>
      <div
        class="description"
      >Make your list precise so travelers understand the value of this experience. Don’t add more than 10 items and avoid duplicates.</div>
      <div class="content-modal">
        <div class="select-block">
          <label>Category</label>
          <base-select
            class="meal-select"
            width="445px"
            max-width="445px"
            inputWidth="445px"
            custom
            itemName="name"
            valueName="id"
            :options="includedCategories"
            :defaultValue="inclusionForm.category_id"
            @selected-option="setCategoryType"
          />
        </div>
      </div>
      <div class="buttons-block">
        <button @click.prevent="inclusionModal = false" class="button light" type="button">Cancel</button>
        <button @click.prevent="addInclusion" class="button dark save-modal" type="button">Save</button>
      </div>
    </base-modal>
    <base-modal
      class="attraction-modal inc-modal"
      :active="exclusionModal"
      @close="exclusionModal = false"
    >
      <div class="title">Add an exclusion</div>
      <div
        class="description"
      >Make your list precise so travelers understand the value of this experience. Don’t add more than 10 items and avoid duplicates.</div>
      <div class="content-modal">
        <div class="select-block">
          <label>Category</label>
          <base-select
            class="meal-select"
            width="445px"
            max-width="445px"
            inputWidth="445px"
            custom
            itemName="name"
            valueName="id"
            :options="excludedCategories"
            :defaultValue="exclusionForm.category_id"
            @selected-option="setCategoryExclusionType"
          />
        </div>
      </div>
      <div class="buttons-block">
        <button @click.prevent="exclusionModal = false" class="button light" type="button">Cancel</button>
        <button @click.prevent="addExclusion" class="button dark save-modal" type="button">Save</button>
      </div>
    </base-modal>
    <div class="form-content inlusions-page">
      <h6>What’s included and not included?</h6>
      <div
        class="description"
      >Let travelers know what is and what isn’t provided to help them understand what they’re paying for. Include items such as food and drinks, special equipment, and admission fees.</div>

      <div class="included-block">
        <label>What's included</label>
        <div class="items">
          <div v-for="(inclusion, index) in inc.whatsIncludedCategories" :key="index" class="item">
            <div class="title">{{ getInclusionData(inclusion) }}</div>
            <div @click="deleteInclusion(index)" class="action">
              <svg-icon name="trash"></svg-icon>
            </div>
          </div>
        </div>
        <div class="add-inlusion">
          <div @click.prevent="addAnotherInclusion" class="inclusion">
            <svg-icon name="plus" />
            <label>Add another inclusion</label>
          </div>
        </div>
      </div>
      <div class="included-block">
        <label>What's excluded</label>
        <div class="items">
          <div v-for="(exclusion,index) in inc.whatsExcludedCategories" :key="index" class="item">
            <div class="title">{{ getExclusionData(exclusion) }}</div>
            <div @click="deleteExclusion(index)" class="action">
              <svg-icon name="trash"></svg-icon>
            </div>
          </div>
        </div>
        <div class="add-inlusion">
          <div @click.prevent="addAnotherExclusion" class="inclusion">
            <svg-icon name="plus" />
            <label>Add exclusion</label>
          </div>
        </div>
      </div>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(9)"
      @keyup.enter="next(9)"
      class="button dark long"
      type="button"
    >Next</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SvgIcon from "../../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
import BaseModal from "@/components/UILibrary/Modals/BaseModal";

export default {
  components: { SvgIcon, BaseModal },
  data() {
    return {
      tour: {
        guidesOffered: 0,
        guidesCertified: 0,
        driverServed: 0,

        languages: [{ value: null }],

        inclusions: [],
        exclusions: [],

        guideLanguages: [{ value: null }]
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
      languages: ["English", "Russian", "German", "French"],
      inclusionForm: {
        category_id: null,
        title_id: null
      },
      inclusionModal: false,
      inclusionCategories: [
        "Inclusion Category 1",
        "Inclusion Category 2",
        "Inclusion Category 3"
      ],
      inclusionTitles: [
        "Inclusion Title 1",
        "Inclusion Title 2",
        "Inclusion Title 3"
      ],
      exclusionForm: {
        category_id: null
      },
      exclusionModal: false,
      exclusionCategories: [
        "Exclusion Category 1",
        "Exclusion Category 2",
        "Exclusion Category 3"
      ],

      inc: {
          whatsIncludedCategories: [
          ],
          whatsIncludedCategoriesList: [

          ],
          whatsExcludedCategories: [
          ],
          whatsExcludedCategoriesList: [
          ],
      }
    };
  },
  computed: {
      ...mapGetters({
          includedCategories: 'tours/includedCategories',
          excludedCategories: 'tours/excludedCategories',
          stateTour: 'tours/tour'
      }),
  },
  mounted(){
    this.getIncluded();
    this.getExcluded();
    this.getTour();
  },
  watch: {
      stateTour: {
          handler(val){
              this.inc.whatsIncludedCategories = val.whatsIncludedCategories;
              this.inc.whatsExcludedCategories = val.whatsExcludedCategories;
          },
          deep: true
      },
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep","getIncluded","getExcluded","fetchEightStep","getTour"]),

    next(val) {
//      this.fetchSetStep({
//        step: val
//      });
      let body = this.inc;
      this.fetchEightStep(body);
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
    addAnotherInclusion() {
      this.inclusionForm = {
        category_id: null,
        title_id: null
      };
      this.inclusionModal = true;
    },
    setCategoryType(value) {
      this.inclusionForm.category_id = value;
    },
    setTitlesType(value) {
      this.inclusionForm.title_id = value;
    },
    addInclusion() {
      this.inclusionModal = false;
      this.inc.whatsIncludedCategories.push(this.inclusionForm.category_id);
    },
    deleteInclusion(index) {
      this.inc.whatsIncludedCategories.splice(index, 1);
    },
    deleteExclusion(index) {
      this.inc.whatsExcludedCategories.splice(index, 1);
    },
    addAnotherExclusion() {
      this.exclusionForm = {
        category_id: null
      };
      this.exclusionModal = true;
    },
    addExclusion() {
      this.exclusionModal = false;
      this.inc.whatsExcludedCategories.push(this.exclusionForm.category_id);
    },
    setCategoryExclusionType(value) {
      this.exclusionForm.category_id = value;
    },
    getInclusionData(id){
        let val = '';
        let index = this.includedCategories.findIndex(x => x.id === id);
        if(index != -1){
            val = this.includedCategories[index].name;
        }
        return val;
    },
    getExclusionData(id){
        let val = '';
        let index = this.excludedCategories.findIndex(x => x.id === id);
        if(index != -1){
            val = this.excludedCategories[index].name;
        }
        return val;
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