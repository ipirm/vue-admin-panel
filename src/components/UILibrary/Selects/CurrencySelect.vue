<template>
  <select-filter-input-new v-bind="selectFilterOptions" :options="getCurrencyArray" :value="getCode" @selected-option="setIdCode" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    selectFilterOptions: {
      type: Object
    },
    defaultId: {
      type: Number
    }
  },
  created() {
    this.$store.dispatch('ui/getCurrency')
  },
  computed: {
    ...mapState({
      currency: state => state.ui.currency
    }),
    getCurrencyArray() {
      return this.currency.map(item => item.code)
    },
    getCode() {
      return this.currency[this.defaultId - 1] ? this.currency[this.defaultId - 1].code : ''
    }
  },
  methods: {
    setIdCode(code) {
      let id

      this.currency.forEach(element => {
        if (element.code === code) id = element.id
      })
      this.$emit('selected-currency', id)
    }
  }
}
</script>