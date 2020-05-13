<template>
  <div class="tabs-blocks">
    <div 
      v-for="(item, key) in tabs"
      @click="clickTab(item.name)"
      :class="{'tab-active': getActive === item.name, 'tab-border-helper': key === 0}"
      class="tab"
      :key="key">
        {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    activeLocal: null
  }),
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeName: {
      type: String,
      required: true
    }
  },
  computed: {
    getActive() {
      return this.activeLocal || this.activeName
    }
  },
  methods: {
    clickTab(name) {
      this.activeLocal = name
      this.$emit('click-tab', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-blocks {
  display: flex;
}

.tab {
  height: 40px;
  background-color: #fff;
  font-size: 13px;
  color: #2980b9;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #2980b9;
  border-bottom: 1px solid #2980b9;
  border-right: 1px solid #2980b9;
  width: 144px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    color: #ffffff;
    background-color: #2980b9;
  }
}

.tab-border-helper {
  border-left: 1px solid #2980b9;
}

.tab-active {
  color: #ffffff;
  background-color: #2980b9;
  cursor: auto;
}
</style>
