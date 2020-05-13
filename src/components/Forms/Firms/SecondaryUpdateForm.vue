<template>
  <div class="form-container">
    <base-modal :active="activeModal" @close="activeModal = false" max-width="400px">
      <popup-upload-logo @save-image="saveImage" />
    </base-modal>

    <h1>Operator Page</h1>
    <div class="group-cont">
      <div class="headline">Your Company logo</div>

      <div v-if="logoImage || logoUrl" class="image-replace">
        <img :src="logoImage || logoUrl" alt="">
        <base-button class="button-replace" @click.native="activeModal = true">Replace</base-button>
      </div>

      <div v-else class="upload-image">
        <base-button @click.native="activeModal = true">Upload Logo</base-button>
      </div>
    </div>

    <div class="group-cont">
      <div class="headline">Highlights</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
      <textarea v-model="i18n.highlights" />
    </div>
    
    <div class="group-cont">
      <div class="headline">Business description</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
      <textarea v-model="i18n.business_description" />
    </div>

    <div class="form-numbers">
      <div class="headline">Allowed Age Group</div>
      <div class="numbers-container">
        <number-input v-model="tourGroup.min_age" width="225px" label="Minimum Allowed Age" />
        <number-input v-model="tourGroup.max_age" width="225px" label="Maximum Allowed Age" />
        <number-input v-model="tourGroup.average_age" width="225px" label="Average Age Group" />
      </div>

      <div class="headline">Group Size</div>
      <div class="numbers-container">
        <number-input v-model="tourGroup.min_group" width="225px" label="Minimum allowed age" />
        <number-input v-model="tourGroup.max_group" width="225px" label="Maximum allowed" />
        <number-input v-model="tourGroup.average_group" width="225px" label="Average Age Group" />
      </div>
    </div>

    <base-button @click.native="submit" type="light" long>Save</base-button>
  </div>
</template>

<script>
import PopupUploadLogo from '@/components/PopupUploadLogo'
import BaseModal from '@/components/UILibrary/Modals/BaseModal'
import { mapState, mapActions } from 'vuex'

const _i18n = {
  highlights: '',
  business_description: '',
  terms_url: '',
  terms_text: ''
};

const _tourGroup = {
  min_age: 0,
  max_age: 0,
  average_age: 0,
  min_group: 0,
  max_group: 0,
  average_group: 0
}

export default {
  components: { PopupUploadLogo, BaseModal },
  data() {
    return {
      activeModal: false,
      logoUrl: null,
      logoImage: null,
      i18n: null,
      tourGroup: null
    }
  },
  beforeMount() {
    this.logoUrl = this.operatorStore.logoUrl
    this.i18n = { ...this.operatorStore.i18n } || _i18n
    this.tourGroup = {...this.operatorStore.tourGroup} || _tourGroup
  },
  computed: {
    ...mapState({
      operatorStore: state => state.operators.operator
    })
  },
  methods: {
    ...mapActions('operators', ['updateOperator']),

    submit() {
      this.updateOperator({
        logoImage: this.logoImage,
        i18n: {
          highlights: this.i18n.highlights,
          business_description: this.i18n.business_description
        },
        tourGroup: this.tourGroup
      })
    },
    
    saveImage(image) {
      this.logoImage = image
      this.activeModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 715px;
  margin-top: 40px;
  margin-bottom: 8rem;
}

.group-cont {
  margin-top: 28px;
}

.headline {
  font-size: 13px;
  color: #052e46;
  font-weight: 500;
  margin-bottom: 13px;
}

.description {
  font-size: 13px;
  color: #052e46;
  margin-bottom: 13px;
}

.upload-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 309px;
  height: 100px;
  border: 1px dashed #b5c9d5;
  background-color: #f0f7fc;
}

.form-numbers {
  margin-top: 20px;
}

.numbers-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 26px;
}

textarea {
  height: 100px;
}

.image-replace {
  display: flex;
  align-items: center;
}

.button-replace {
  margin-left: 20px;
}
</style>