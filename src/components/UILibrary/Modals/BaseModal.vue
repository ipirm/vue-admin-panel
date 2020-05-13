<template>
  <transition v-if="active" name="fade" appear>
    <div class="modal-mask" @click.self="$emit('close')">
      <div class="modal" :style="{maxWidth}">
        <div class="icon-cont" @click="$emit('close')">
          <svg-icon class="close-icon" name="close" />
        </div>
        <div class="slot-container">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '341px'
    }
  }
}
</script>


<style lang="scss" scoped>
.modal-mask {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
  left: 0;
}

.modal {
  background-color: #ffffff;
  border: 1px solid #edeef0;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 11px;
}

.close-icon {
  width: 15px;
  height: 15px;
  color: #777;
  cursor: pointer;
  &:hover {
    color: black;
  }
}

.slot-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

