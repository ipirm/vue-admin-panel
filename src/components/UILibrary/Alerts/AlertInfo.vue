<template>
  <div class="alert-info">
    <div>{{ text }}</div>
    <div v-if="button" @click="$emit('buttonClick')" class="alert-button">{{ button }}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    button: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>


<style lang="scss" scoped>
.alert-info {
  width: 100%;
  min-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c5e5fc;
  background-color: #f2f7fa;
  border-radius: 4px;
  font-size: 13px;
  color: #2980b9;
  padding: 8px 8px 8px 16px;
  box-sizing: border-box;
}

.alert-button {
  background-color: #2980b9;
  font-size: 13px;
  font-weight: 500;
  border-radius: 2px;
  color: #ffffff;
  height: 32px;
  padding: 0 16px 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
