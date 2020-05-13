<template>
  <div class="container-input" :style="{'width': width}">
    <label v-if="label" class="label" for="">{{ label }}</label>
    <div class="wrapper-input" :style="{'margin-top': label ? '13px' : '0'}">
      <input
        @input="handleInput"
        v-model.trim="content"
        class="input"
        type="text">
      <div class="addon">
        <svg-icon class="icons icon-rotate" name="arrow_bottom" @click.native="up" />
        <svg-icon class="icons" name="arrow_bottom" @click.native="down" />
      </div>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      content: numeral(this.value).value()
    }
  },
  methods: {
    handleInput() {
      this.content = numeral(this.content).value();
      this.$emit('input', this.content);
    },

    up() {
      this.content += 1;
      this.handleInput()
    },

    down() {
      this.content -= 1;
      if (this.content < 0) this.content = 0;
      this.handleInput()
    }
  },
}
</script>

<style lang="scss" scoped>
.label {
  font-size: 13px;
  color: #052e46;
}

.wrapper-input {
  display: flex;
  border-radius: 2px;
  border: 1px solid #b5c9d5;
  height: 40px;
}

.wrapper-input, input, .container-input {
  width: 100%;
}

.container-input {
  margin-bottom: 1rem;
}

.addon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 8px;
}

.input {
  border: none;
  outline: none;
  background: none;
}

.icon-rotate {
  transform: rotate(180deg)
}

.icons {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>