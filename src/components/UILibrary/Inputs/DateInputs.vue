<template>
  <div class="date-inputs-container">
    <label v-if="label" class="label" for="">{{ label }}</label>
    <div class="date-inputs" :style="{'margin-top': label ? '8px' : ''}">
      <select-filter-input :options="dd" @selected-option="setDate('dd', $event)" placeholder="dd" />
      <select-filter-input :options="mm" @selected-option="setDate('mm', $event)" placeholder="mm" />
      <select-filter-input :options="getYears" @selected-option="setDate('year', $event)" placeholder="yyyy" />
    </div>
    <div v-for="(item, key) in errors" :key="key" class="error-helper error-text">{{ item }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    errors: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      dd: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      mm: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      day: '',
      month: '',
      year: ''
    }
  },

  computed: {
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
    setDate(name, value) {
      if (name === 'dd') this.day = value
      if (name === 'mm') this.month = value
      if (name === 'year') this.year = value

      let localMonth

      this.mm.forEach((element, key) => {
        if (element === this.month) {
          localMonth = key
        }
      })

      if(!this.month || !this.day || !this.year) return

      const date = new Date(this.year, localMonth, this.day)
      
      this.$emit('selected-dates', [this.day, this.month, this.year], date, this.formatDate(date))
    },

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
  }
}
</script>

<style lang="scss" scoped>
.date-inputs {
  display: flex;
}

.error-helper {
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>