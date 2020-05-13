<template>
  <div class="form-container">
    <h1>Booking & Finances</h1>

    <div class="group-cont">
      <div class="headline">Allow Instant Booking</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
      <base-checkbox :active="booking.is_allow_instant_booking" @on-active="booking.is_allow_instant_booking = $event" />
    </div>

    <div class="group-input-numbers">
      <number-input v-model="booking.minimum_days_before_departure" width="275px" label="Minimum Days Before Departure" />
      <number-input v-model="booking.minimum_available_seats_on_departure" width="275px" label="Minimum Available Seats On Departure" />
    </div>

    <div class="group-cont">
      <div class="headline">Allow 48 hour holds</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
      <base-checkbox :active="booking.is_allow_48_hour_holds" @on-active="booking.is_allow_48_hour_holds = $event" />
    </div>

    <h2 class="terms">Terms</h2>

    <div class="group-cont terms-fix">
      <div class="headline">Terms and Conditions URL</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
      <base-input v-model="i18n.terms_url" placeholder="https://" />
    </div>

    <div class="group-cont">
      <div class="headline">Terms and Conditions Text</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
      <textarea v-model="i18n.terms_text" />
    </div>

    <div class="finance-form">
      <h2>Finance</h2>
      <currency-select :select-filter-options="selectFilterOptions" :default-id="finance.default_currency_id" @selected-currency="finance.default_currency_id = $event" />
      <base-input v-model="finance.vat_id" label="Finance VAT ID" />
      <number-input v-model="finance.full_payment_terms" label="Full Payment Terms (days)" />
      <number-input v-model="finance.commission" label="Commission" />
      <number-input v-model="finance.extra_items_commission" label="Extra Items Commission" />
    </div>

    <base-button @click.native="submit" type="light" long>Save</base-button>
  </div>
</template>

<script>
import CurrencySelect from '@/components/UILibrary/Selects/CurrencySelect'
import { mapState, mapActions } from 'vuex'

const _i18n = {
  terms_url: '',
  terms_text: ''
}

const _booking = {
  minimum_days_before_departure: null,
  minimum_available_seats_on_departure: null,
  is_allow_instant_booking: true,
  is_allow_48_hour_holds: true
}

const _finance = {
  default_currency_id: null,
  vat_id: '',
  full_payment_terms: null,
  commission: null,
  extra_items_commission: null
}

export default {
  components: { CurrencySelect },
  data() {
    return {
      selectFilterOptions: {
        label: 'Default Currency'
      },
      i18n: null,
      booking: null,
      finance: null
    }
  },
  beforeMount() {
    this.i18n = {...this.operator.i18n} || _i18n
    this.booking = {...this.operator.booking} || _booking
    this.finance = {...this.operator.finance} || _finance
  },
  computed: {
    ...mapState('operators', ['operator']),
  },
  methods: {
    ...mapActions('operators', ['updateOperator']),

    submit() {
      this.updateOperator({
        i18n: {
          terms_url: this.i18n.terms_url,
          terms_text: this.i18n.terms_text
        },
        booking: this.booking,
        finance: this.finance
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  margin-top: 40px;
  max-width: 716px;
  margin-bottom: 4rem;
}

.finance-form {
  max-width: 314px;
  margin-top: 40px;
  margin-bottom: 40px;
}

.group-input-numbers {
  display: flex;
  justify-content: space-between;
  max-width: 562px;
  margin-top: 20px;
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

.group-cont {
  margin-top: 28px;
}

.terms-fix {
  margin-top: 10px;
}

.terms {
  margin-top: 50px;
}

textarea {
  min-height: 130px;
}
</style>