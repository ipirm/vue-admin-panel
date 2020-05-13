<template>
  <div class="form-cont">
    <base-input label="Company Name" @input-change="company = $event" />
    <base-input label="Domain" @input-change="domain = $event" />
    <base-button @click.native="addOperator" long>Add</base-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    company: '',
    domain: ''
  }),
  methods: {
    ...mapActions('operators', ['createOperator']),

    addOperator() {
      this.createOperator({ domain: this.domain, name: this.company })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-cont {
  max-width: 500px;
  margin-top: 20px;
  max-width: 315px;
}
</style>