<template>
  <div class="container-select" :style="{width: width, maxWidth: width}">
    <label v-if="label" class="label" for="">{{ label }}</label>
    <p class="description" v-if="description">{{description}}</p>

    <div @click="openOptions" class="select" :style="{width: inputWidth, maxWidth: width}">
      <div v-if="!custom" class="value">{{ getValue }}</div>
      <div v-if="custom" class="value">{{ getValueCustom }}</div>
      <svg-icon class="arrow-bottom" name="arrow_bottom" />
    </div>

    <div v-if="activeOptions && !custom" class="options" :style="{'margin-top': label ? '70px' : mini ? '31px' : '40px'}">
      <div
        v-for="(item, key) in options" 
        :key="key" 
        class="option" 
        @click="setOption(item)">
        {{ item }}
      </div>
    </div>

    <div v-if="activeOptions && custom" class="options" :style="{'margin-top': label ? '70px' : mini ? '31px' : '40px'}">
      <div
              v-for="(item, key) in options"
              :key="item[valueName]"
              class="option"
              @click="setOption(item)">
        {{ item[itemName] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: [String, Number],
      default: ''
    },
    width: {
      type: String,
      default: '100px'
    },
    inputWidth: {
      type: String,
      default: '100px'
    },
    theme: {
      type: String,
      validator: (value) => {
        return ['outline', 'light'].indexOf(value) !== -1
      },
      default: 'outline'
    },
    mini: {
      type: Boolean,
      default: false
    },
    custom: {
        type: Boolean,
        default: false
    },
    itemName: {
        type: String,
        default: null
    },
    valueName: {
        type: String,
        default: null
    },
    withIndex: {
        type: Boolean,
        default: false
    },
    custIndex: {
        type: Number,
        default: null
    },
    custValue: {
        type: Number,
        default: null
    }
  },
  data: () => ({
    activeOptions: false,
    stopEventClick: false,
    value: null
  }),
  computed: {
    getValue() {
        return this.value || this.defaultValue
    },
    getValueCustom() {
        if(this.custValue){

            const index = this.options.findIndex(x => x[this.valueName] == this.custValue);

            if(index != -1){
                return this.options[index][this.itemName];
            }
        }else{
            return this.value;
//            console.log();
//            const index = this.options.findIndex(x => x[this.itemName] === this.value);
//            if(index != -1){
//                console.log(this.options[index][this.itemName]);
//                return this.options[index][this.itemName];
//            }
        }
    }
  },
  mounted() {
      console.log(this.options);
    document.addEventListener('click', () => this.closeOptionModal())
    document.addEventListener('unset-all-values', () => this.unsetValues())
  },
  methods: {
    setOption(item) {
        if(this.custom){
            this.value = item[this.itemName]
            if(this.withIndex){
                let obj = {
                    index: this.custIndex,
                    value: item[this.valueName]
                }
                this.$emit('selected-option', obj)
            }else{
                this.$emit('selected-option', item[this.valueName])
            }
        }else{
            if(this.withIndex){
                let obj = {
                    index: this.custIndex,
                    value: item
                }
                this.$emit('selected-option', obj)
            }else{
                this.$emit('selected-option', item)
            }
            this.value = item
            this.$emit('selected-option', item)
        }
    },
    closeOptionModal() {
      if (!this.stopEventClick) {
        this.activeOptions = false
      } else {
        this.stopEventClick = false
      }
    },
    openOptions() {
      this.stopEventClick = true
      this.activeOptions = !this.activeOptions
    },
    unsetValues(){
        console.log("UNSET VALUES");
    }
  }
}
</script>

<style lang="scss" scoped>
.container-select {
  position: relative;
  display: flex;
  flex-direction: column;
  color: #01080c;
  font-weight: 400;
  font-size: 13px;
  margin-bottom: 16px;
}

.value {
  padding-left: 9px;
}

.arrow-bottom {
  cursor: pointer;
  width: 17px;
  height: 17px;
  padding-left: 10px;
  margin-right: 7px;
}

.select {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  cursor: pointer;
  width: 100%;
  border: 1px solid #b5c9d5;
}

.options {
  width: 100%;
  background-color: #fff;
  border: 1px solid #b5c9d5;
  position: absolute;
  margin-top: 62px;
  max-height: 200px;
  overflow: auto;
  cursor: pointer;
  padding-bottom: 5px;
  padding-top: 5px;
  z-index: 5;
}

.option {
  padding: 5px 8px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f8f9fa;
  }
}
</style>

