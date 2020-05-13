<template>
  <div class="container-addline">
    <svg-icon class="plus-circle" name="plus_circle" />
    <div class="text">{{ text }}</div> 
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Add more'
    }
  }
}
</script>

<style lang="scss" scoped>
.container-addline {
  display: flex;
  align-items: center;
  width: 120px;
  cursor: pointer;
  &:hover .text {
    color: black;
  }

  &:hover .plus-circle {
    fill: black;
  }
}

.text {
  font-size: 13px;
  color: #6b94ac;
  font-weight: 500;
}

.plus-circle {
  fill: #6b94ac;
  width: 18px;
  height: 18px;
  margin-right: 6px;
}
</style>