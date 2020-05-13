<template>
  <div class="form-cont">
    <h1>General Account Data</h1>
    <div class="forms">
      <div class="form-one">
        <h6 class="general-info">General Info</h6>
        <base-input label="Company Name" v-model="operator.name" />
        <base-input label="Domain" v-model="operator.domain" />
      </div>
    </div>
    <base-button type="light" @click.native="submit" long>Save</base-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const _operator = {
  name: '',
  domain: ''
}

export default {
  data() {
    return {
      operator: null
    }
  },
  beforeMount() {
    this.operator = { ...this.operatorStore } || _operator
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
        name: this.operator.name,
        domain: this.operator.domain
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-cont {
  margin-top: 40px;
}

.form-one {
  width: 315px;
}


.forms {
  margin-bottom: 30px;
  display: flex;
}

.general-info {
  margin-top: 20px;
  margin-bottom: 10px;
}

.header-modal {
  font-size: 22px;
  font-weight: 700;
  color: #052e46;
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>