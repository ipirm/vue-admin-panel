<template>
  <button
    :class="[type, long ? 'long' : '']"
    @click.prevent="$emit('click-button')" 
    @keyup.enter="$emit('click-button')"
    class="button" 
    type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      validator: (value) => {
        return ['outline', 'dark', 'light'].indexOf(value) !== -1
      },
      default: 'dark'
    },
    long: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="scss" scoped>
.button {
  height: 40px;
  padding: 0px 24px;
  background: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.outline {
  background-color: #fff;
  border: 1px solid #2980b9;
  color: #2980b9;
  &:hover {
    background-color: #2980b9;
    color: #ffffff;
  }
}

.dark {
  background-color: #2980b9;
  color: #ffffff;
  &:hover {
    background-color: rgba(41, 128, 185, 0.95);
  }
}

.light {
  background-color: #e6edf1;
  color: #6b94ac;
  &:hover {
    color: hsl(202, 26%, 48%);
    background-color: hsl(202, 42%, 90%);
  }
}

.long {
  min-width: 146px;
}
</style>
