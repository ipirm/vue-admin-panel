<template>
  <div class="input-cont">
    <label v-if="label" for="">{{ label }}</label>
    <p class="description" v-if="description">{{description}}</p>

    <svg-icon 
      class="eye-icon" 
      v-if="password" 
      name="eye" 
      :style="{'margin-top': label ? '39px' : '10px'}"
      @click.native="activePasswordView = !activePasswordView" />
    <svg-icon
      class="search-icon"
      v-if="search"
      name="search"
      :style="{'margin-top': label ? '39px' : '10px'}" />
    <input
      :class="{'input-search': search, 'is-invalid': errors.length > 0}"
      :style="{width: inputWidth ? inputWidth : 'inherit'}"
      :placeholder="placeholder" 
      :type="activePasswordView ? 'password' : 'text'" 
      v-model.trim="content"
      :disabled="disabled"
      @input="handleInput"
      v-if="!isNumber"
    >
    <input
            :class="{'input-search': search, 'is-invalid': errors.length > 0}"
            :style="{width: inputWidth ? inputWidth : 'inherit'}"
            :placeholder="placeholder"
            v-model.trim="content"
            :disabled="disabled"
            @input="handleInput"
            v-if="isNumber"
            type="number"
            :max="maxValue"
    >

    <div v-for="(item, key) in errors" :key="key" class="error-text">{{ item }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: [String, Boolean],
      default: false
    },
    description: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    password: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    isNumber: {
        type: Boolean,
        default: false
    },
    inputWidth: {
      type: String,
      default: null
    },
    maxValue: {
        type: [String, Number],
        default: 10
    },
    disabled: {
        type: Boolean,
        default: false
    },
    indexSet: {
        type: [String, Number],
        default: null
    },
    errors: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      content: this.value,
      activePasswordView: this.password
    }
  },

  methods: {
    handleInput() {
      this.$emit('input', this.content)
      // alternative
      if(this.indexSet){
          this.$emit('input-change', { content: this.content, index: this.indexSet })
      }else{
          this.$emit('input-change', this.content)
      }

      // error reset
      if (this.errors.length > 0) this.$emit('resetError')
    }
  }
}
</script>

<style lang="scss" scoped>
.input-cont {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  position: relative;
}

label {
  font-size: 13px;
  color: #052e46;
  margin-bottom: 9px;
  margin-top: 4px;
}

.eye-icon {
  position: absolute;
  right: 0;
  color: #b5c9d5;
  cursor: pointer;
  margin-right: 10px;
  transition: color 0.3s ease;
  &:hover {
    color: hsl(203, 16%, 69%);
  }
}
.search-icon {
  position: absolute;
  left: 9px;
  color: #b5c9d5;
  cursor: pointer;
  margin-right: 10px;
  transition: color 0.3s ease;
  &:hover {
    color: hsl(203, 16%, 69%);
  }
}
.input-search{
  padding-left: 36px;
  border:none;
  ::placeholder{
    color: #6b94ac;
  }
}
</style>
