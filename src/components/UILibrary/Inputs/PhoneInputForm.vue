<template>
  <div class="form-cont">
    <div class="label">Phone Number</div>
    <div class="wrapper-inputs">
      <select-filter-input 
        width="92px" 
        placeholder="+" 
        @selected-option="setIdPhone" 
        :options="filterPhoneIndexes" 
        :value="phoneIndex ? '+' + phoneIndex : ''" />
      <input @input="setValueNumber" v-model.trim="number" type="text" class="input">
    </div>
    <div v-for="(item, key) in errors" :key="key" class="error-helper error-text">{{ item }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import numeral from 'numeral'

export default {
  props: {
    phoneIndex: {
      type: [Number, String]
    },
    phoneNumber: {
      type:[Number, String]
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      number: this.phoneNumber,
      callingCode: numeral(this.phoneIndex).value(),
      id: ''
    }
  },
  mounted() {
    this.getPhoneIndexes()
  },
  computed: {
    ...mapState('ui', ['phoneIndexes']),

    filterPhoneIndexes() {
      return this.phoneIndexes
        .map(item => '+' + item.international_calling_code.toString())
        .filter((elem, index, self) => index === self.indexOf(elem))
    }
  },
  methods: {
    ...mapActions('ui', ['getPhoneIndexes']),

    setValueNumber() {
      if (typeof this.number === 'number') this.number = this.number.toString()
      this.getSortId(this.callingCode)
      this.$emit('get-data', [this.id, this.number])
      if (this.errors.length > 0) this.$emit('resetError')
    },

    setIdPhone(callingCode) {
      if (typeof this.number === 'number') this.number = this.number.toString()
      this.callingCode = callingCode
      this.getSortId(callingCode)
      this.$emit('get-data', [this.id, this.number.toString()])
      if (this.errors.length > 0) this.$emit('resetError')
    },

    getSortId(callingCode) {
      if (typeof callingCode === 'number') callingCode = callingCode.toString()
      this.phoneIndexes.forEach((item) => {
        if (item.international_calling_code.toString() === callingCode.slice(1)) {
          this.id = item.id
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-inputs {
  display: flex;
}

.base-input {
  padding-left: 12px;
  width: 185px;
}

.input {
  width: 200px;
  margin-left: 10px;
}

.error-helper {
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>