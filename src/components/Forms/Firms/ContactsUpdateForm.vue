<template>
  <div class="form-container">
    <h1>Contact Data</h1>
    <div class="forms">
      <div class="general-form">
        <h6>General Info</h6>
        <base-input label="Contact Name" v-model="contactData.contact_name" />
        <base-input label="Contact Email" v-model="contactData.contact_email" />
        <phone-input-form @get-data="setPhone" :phone-index="phone.phone_country_id" :phone-number="phone.phone_number" />
        <base-input label="Skype Name" v-model="contactData.skype_name" />
        <base-input label="Marketing Contact Name" v-model="contactData.marketing_contact_name" />
        <base-input label="Marketing Contact Email" v-model="contactData.marketing_contact_email" />
        <base-input label="Street" v-model="contactData.street" />
        <base-input label="City" v-model="contactData.city" />
        <base-input label="Postal Code" v-model="contactData.postal_code" />
        <base-button @click.native="submit('contactData')" class="button" type="light" long>Save</base-button>
      </div>

      <div class="hr-vertical"></div>

      <div class="web-soc-form">
        <h6>Web & Social Networks</h6>
        <base-input placeholder="https://" label="Website" v-model="webSocialNetworks.website" />
        <base-input placeholder="https://" label="Facebook Profile" v-model="webSocialNetworks.facebook" />
        <base-input placeholder="https://" label="Youtube" v-model="webSocialNetworks.youtube" />
        <base-input placeholder="https://" label="Twitter" v-model="webSocialNetworks.twitter" />
        <base-input placeholder="https://" label="Instagram" v-model="webSocialNetworks.instagram" />
        <base-button @click.native="submit('webSocialNetworks')" class="button" type="light" long>Save</base-button>
      </div>

      <div class="hr-vertical"></div>

      <div class="company-profile-form">
        <h6>Company Profile</h6>
        <base-input label="Company Legal Name" v-model="companyProfile.legal_name" />
        <base-select :options="getYears" :default-value="companyProfile.founded_in" @selected-option="companyProfile.founded_in = $event" label="Year Of Founded In" width="120px" input-width="120px" />
        <number-input label="Staff Size" v-model="companyProfile.staff_size" />
        <base-input label="Operator Deal Page" v-model="companyProfile.operator_deal_page" />
        <base-button @click.native="submit('companyProfile')" class="button" type="light" long>Save</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneInputForm from '@/components/UILibrary/Inputs/PhoneInputForm'
import { mapState, mapActions } from 'vuex'

const _contactData = {
  contact_name: '',
  contact_email: '',
  phone_country_id: null,
  phone_number: null,
  skype_name: '',
  marketing_contact_name: '',
  marketing_contact_email: '',
  street: '',
  city: '',
  postal_code: ''
}

const _webSocialNetworks = {
  website: '',
  facebook: '',
  youtube: '',
  twitter: '',
  instagram: ''
}

const _companyProfile = {
  legal_name: "string",
  founded_in: null,
  staff_size: null,
  operator_deal_page: '',
  tourism_board_memberships: ''
}

export default {
  components: { PhoneInputForm },
  data() {
    return {
      contactData: null,
      webSocialNetworks: null,
      companyProfile: null
    }
  },
  beforeMount() {
    this.contactData = {...this.operator.contactData} || _contactData
    this.webSocialNetworks = {...this.operator.webSocialNetworks} || _webSocialNetworks
    this.companyProfile = {...this.operator.companyProfile} || _companyProfile
    this.phone = {
      phone_country_id: this.contactData.phone_country_id,
      phone_number: this.contactData.phone_number
    }
  },
  computed: {
    ...mapState('operators', ['operator']),
    
    getYears() {
      const years = []
      const nowYear = new Date().getFullYear()

      for (let i = 0; i < 110; i++) {
        years[i] = nowYear - i
      }

      return years
    }
  },
  methods: {
    ...mapActions('operators', ['updateOperator']),
    setPhone(value) {
      this.contactData.phone_country_id = value[0]
      this.contactData.phone_number = value[1]
    },
    submit(name) {
      this.updateOperator({[name]: this[name]})
    }
  }
}
</script>

<style lang="scss" scoped>
.forms {
  display: flex;
}

.general-form, .web-soc-form, .company-profile-form {
  width: 315px;
}

.hr-vertical {
  padding-top: 2rem;
  margin-left: 2.7rem;
  margin-right: 2.7rem;
  padding-bottom: 5rem;
}

.button {
  margin-top: 1.5rem;
}

.form-container {
  margin-bottom: 3rem;
  margin-top: 40px;
}
</style>