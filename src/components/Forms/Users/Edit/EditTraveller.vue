<template>
  <div class="form-container">
    <div class="form-content">
      <h6>General Info</h6>
      <base-input 
        v-model="full_name" 
        label="Full Name"
        :errors="pe"
        @resetError="resetError()" />
      <base-input 
        v-model="email" 
        label="Email [Login]"
        :errors="itemErrors['email']"
        @resetError="resetError()" />
      <phone-input-form 
        @get-data="getPhoneNumber"
        :errors="[...et, ...en]"
        @resetError="resetError()" />
      <base-input 
        v-model="password" 
        :errors="itemErrors['password']"
        @resetError="resetError()"
        label="Password" 
        password />
      <base-input 
        v-model="location" 
        label="Location"
        @resetError="resetError()"
        :errors="le" />
      <date-inputs 
        @selected-dates="setDates" 
        label="Date Of Birth"
        @resetError="resetError()"
        :errors="de" />
      <base-select :options="genderArray" @selected-option="gender = $event" input-width="315px" width="315px" label="Gender" />
    </div>
    <base-button @click.native="addUpdateUser" type="light" long>Save</base-button>
  </div>
</template>

<script>
import PhoneInputForm from '@/components/UILibrary/Inputs/PhoneInputForm'
import DateInputs from '@/components/UILibrary/Inputs/DateInputs'
import { mapActions, mapMutations, mapState } from 'vuex'


const _i18n = {
  terms_url: '',
  terms_text: ''
}

export default {
  components: { PhoneInputForm, DateInputs },
  data() {
    return {
      full_name: '',
      email: '',
      phone_country_id: '',
      phone_number: '',
      location: '',
      date: '',
      genderArray: ['male', 'female'],
      gender: '',
      password: ''
    }
  },
  beforeMount() {
    this.full_name = this.user.profile.full_name
    this.email = this.user.email
    this.phone_country_id = this.user.profile.phone_country_id
    this.phone_number = this.user.profile.phone_number
    this.location = this.user.profile.location
  },
  computed: {
    ...mapState('ui', ['itemErrors']),
    ...mapState('users', ['user']),

    pe() {
      return this.itemErrors['profile'] && this.itemErrors['profile'][0].full_name || []
    },
    et() {
      return this.itemErrors['profile'] && this.itemErrors['profile'][0].phone_country_id || []
    },
    en() {
      return this.itemErrors['profile'] && this.itemErrors['profile'][0].phone_number || []
    },
    le() {
      return this.itemErrors['profile'] && this.itemErrors['profile'][0].location || []
    },
    de() {
      return this.itemErrors['profile'] && this.itemErrors['profile'][0].date_of_birth || []
    }
  },
  methods: {
    ...mapActions('users', ['updateUser']),
    ...mapMutations('ui', ['RESET_ITEM_ERROR']),

    getPhoneNumber(value) {
      this.phone_country_id = value[0]
      this.phone_number = value[1]
    },

    addUpdateUser() {
      const user = {
        role: 'customer',
        email: this.email,
        password: this.password,
        profile: {
          phone_country_id: this.phone_country_id,
          phone_number: this.phone_number,
          location: this.location,
          date_of_birth: this.date,
          full_name: this.full_name,
          gender: this.gender
        }
      }

      this.updateUser(user)
    },

    setDates(value, date, formatDate) {
      this.date = formatDate
    },

    resetError() {
      this.RESET_ITEM_ERROR()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  margin-bottom: 10rem;
}

.form-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 315px;
  margin-top: 20px;
}
</style>