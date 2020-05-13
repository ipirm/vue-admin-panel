<template>
  <div class="form-container audience-block">
    <div class="form-content">
      <h6>Tell us about your ideal traveler</h6>
      <div class="description">This will help us show your product to the right people.</div>
      <div class="selection">
        <label>What types of groups would enjoy your experience?</label>
        <div class="chips">
          <div :class="{'active-chip': groupEnjoyCategories.indexOf(cat.id) != -1}" @click="addChipGroup(cat.id)" v-for="cat in groupEnjoyCats" class="chip">{{ cat.name }}</div>
        </div>
      </div>
      <div class="selection">
        <label>What types of travelers would enjoy your experience?</label>
        <div class="chips">
          <div :class="{'active-chip': travelerEnjoyCategories.indexOf(cat.id) != -1}" @click="addChipTravel(cat.id)" v-for="cat in travelerEnjoyCats" class="chip">{{ cat.name }}</div>
        </div>
      </div>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(11)"
      @keyup.enter="next(11)"
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
      tour: {},
      groupEnjoyCategories: [
      ],
      travelerEnjoyCategories: [
      ],
    };
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep","getTour","getGroupEnjoy","getTravelerEnjoy","fetchElevenStep"]),

    next(val) {
      const body = {
          groupEnjoyCategories: this.groupEnjoyCategories,
          travelerEnjoyCategories: this.travelerEnjoyCategories
      }

      this.fetchElevenStep(body);

//      this.fetchSetStep({
//        step: val
//      });
    },

    addChipGroup(cat){
        var elementPos = this.groupEnjoyCategories.indexOf(cat);
        if(elementPos != -1){
            this.groupEnjoyCategories.splice(elementPos, 1);
        }else{
            this.groupEnjoyCategories.push(cat);
        }
    },
    addChipTravel(cat){
        var elementPos = this.travelerEnjoyCategories.indexOf(cat);
        if(elementPos != -1){
            this.travelerEnjoyCategories.splice(elementPos, 1);
        }else{
            this.travelerEnjoyCategories.push(cat);
        }
    }

  },
  mounted(){
    this.getTour();
    this.getGroupEnjoy();
    this.getTravelerEnjoy();
  },
  computed: {
      ...mapGetters({
          groupEnjoyCats: 'tours/groupEnjoyCategories',
          travelerEnjoyCats: 'tours/travelerEnjoyCategories',
          stateTour: 'tours/tour',
      }),
  },
  watch: {
      stateTour: {
          handler(val){
              this.groupEnjoyCategories = val.groupEnjoyCategories ? val.groupEnjoyCategories : [];
              this.travelerEnjoyCategories = val.travelerEnjoyCategories ? val.travelerEnjoyCategories : [];
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