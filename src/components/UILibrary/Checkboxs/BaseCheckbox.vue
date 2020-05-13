<template>
  <div :class="{'checkbox-container-active': state}" class="checkbox-container" @click="onActive">
    <div :class="{'circle-active': state}" class="circle"></div>
    <div :class="{'off-on-active': state}" class="off-on">
      {{ activeText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    id: {
        type: Number,
        default: null
    }
  },
  data() {
    return {
      activeText: this.active ? 'On' : 'Off',
      state: this.active
    }
  },
  methods: {
    onActive() {
      this.activeText = this.activeText === 'Off' ? 'On' : 'Off'
      if (this.activeText === 'On') {
        this.state = true
          if(this.id != null){
              this.$emit('on-active', { active: true, id: this.id })
          }else{
              this.$emit('on-active', true)
          }
      } else {
        this.state = false
        if(this.id != null){
            this.$emit('on-active', { active: false, id: this.id })
        }else{
            this.$emit('on-active', false)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-container {
  background-color: #e6edf1;
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
  opacity: 0.9;
  width: 70px;
  height: 26px;
  border-radius: 26px;
  cursor: pointer;
  display: flex;
  position: relative;
  align-items: center;
  color: #6b94ac;
  transition: all 0.4s ease;
}

.circle {
  width: 20px;
  height: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
  border-radius: 100%;
  position: absolute;
  transition: transform 0.4s ease;
  margin-left: 3px;
}

.off-on {
  position: absolute;
  right: 0;
  padding-right: 12px;
  font-weight: 500;
  font-size: 12px;
  transition: transform 0.4s ease;
}

.checkbox-container-active {
  background-color: #2980b9;
  color: #ffffff;
}

.circle-active {
  transform: translateX(43px);
}

.off-on-active {
  transform: translateX(-29px);
}
</style>
