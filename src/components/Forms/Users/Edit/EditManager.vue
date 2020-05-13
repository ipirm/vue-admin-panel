<template>
  <div class="form-container">
    <div class="form-content">
      <div class="general-info">
        <h6>General Info</h6>
        <base-select :options="getCompanies" @selected-option="setCompanyName" input-width="315px" width="315px" label="Company name" />
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
          @get-data="setPhone"
          :errors="[...et, ...en]"
          @resetError="resetError()"
          :phone-index="phone_country_id" 
          :phone-number="phone_number" />
        <base-input 
          v-model="password" 
          label="Password" 
          :errors="itemErrors['password']"
          @resetError="resetError()"
          password />
      </div>

      <div class="hr-vertical"></div>

      <div class="rights">
        <h6>Rights</h6>
        <div class="checkbox-container">
          <div class="checkbox-label">Enquiry</div>
          <base-checkbox />
        </div>
        <div class="checkbox-container">
          <div class="checkbox-label">Reservation</div>
          <base-checkbox />
        </div>
        <div class="checkbox-container">
          <div class="checkbox-label">Refund & Complaints</div>
          <base-checkbox />
        </div>
        <div class="checkbox-container">
          <div class="checkbox-label">Emergency</div>
          <base-checkbox />
        </div>
        <div class="checkbox-container">
          <div class="checkbox-label">User Admin</div>
          <base-checkbox />
        </div>
        <div class="checkbox-container">
          <div class="checkbox-label">Cancellation</div>
          <base-checkbox />
        </div>
      </div>
    </div>
    <base-button @click.native="addUpdateUser" type="light" class="button-add" long>Save</base-button>
  </div>
</template>

<script>
import PhoneInputForm from '@/components/UILibrary/Inputs/PhoneInputForm'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: { PhoneInputForm },
  data() {
    return {
      company_name: '',
      full_name: '',
      email: '',
      phone_country_id: '',
      phone_number: '',
      company_id: '',
      password: ''
    }
  },
  created() {
    this.getOperators()
  },
  beforeMount() {
    this.full_name = this.user.profile.full_name
    this.email = this.user.email
    this.phone_country_id = this.user.profile.phone_country_id
    this.phone_number = this.user.profile.phone_number
    this.company_id = this.user.profile.userToOperator.operator_id || ''
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

    getCompanies() {
      return this.$store.getters['operators/getCompanies']
    }
  },

  methods: {
    ...mapActions('users', ['updateUser']),
    ...mapActions('operators', ['getOperators']),
    ...mapMutations('ui', ['RESET_ITEM_ERROR']),

    setPhone(value) {
      this.phone_country_id = value[0]
      this.phone_number = value[1]
    },
    
    setCompanyName(value) {
      this.company_name = value
    },

    addUpdateUser() {
      this.$store.state.operators.operators.forEach(element => {
        if (element.name === this.company_name) {
          this.company_id = element.id
        }
      })

      const user = {
        role: 'manager',
        email: this.email,
        password: this.password,
        userToOperator: { operator_id: this.company_id },
        profile: {
          full_name: this.full_name,
          phone_country_id: this.phone_country_id,
          phone_number: this.phone_number
        }
      }

      this.updateUser(user)
    },

    resetError() {
      this.RESET_ITEM_ERROR()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-content {
  display: flex;
  justify-content: space-between;
  max-width: 620px;
  margin-top: 20px;
}

.general-info {
  width: 315px;
}

.rights {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 250px;
  max-height: 350px;
}

.checkbox-container {
  display: flex;
  justify-content: space-between;
}

.checkbox-label {
  font-size: 13px;
  color: #052e46;
}

.hr-vertical {
  padding-top: 2rem;
}

.button-add {
  margin-top: 15px;
}
</style>