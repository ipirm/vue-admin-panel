<template>
  <div class="container-multi-inputs">
    <div v-for="(item, key) in localItems" :key="key" class="input-container">
      <base-input class="input" v-model="localItems[key]" @input-change="setValueInput($event, key)" />

      <div @click="localItems.splice(key, 1)" class="bucket-cont">
        <svg-icon class="svg-icon" name="trash" />
      </div>
    </div>
    
    <add-line @click.native="localItems.push('')" />
  </div>
</template>

<script>
import AddLine from '@/components/UILibrary/AddLine'

export default {
  components: { AddLine },
  props: {
    items: {
      type: Array,
      default: () => ['']
    }
  },
  data() {
    return {
      localItems: this.items
    }
  },
  methods: {
    setValueInput(value, key) {
      this.localItems.splice(key, 1, value)
      this.$emit('change-inputs', this.localItems.filter(item => item ? true : false))
    }
  }
}
</script>

<style lang="scss" scoped>
.container-multi-inputs {
  width: 300px;
}

.svg-icon {
  width: 16px;
  height: 19px;
  margin-bottom: 2px;
}

.bucket-cont {
  margin-top: 2px;
  margin-bottom: 1.1rem;
  margin-left: 18px;
  cursor: pointer;
  color: #b5c9d5;
  transition: all 0.3s ease;
  border-radius: 100%;
  height: 30px;
  min-width: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #2980b9;
  }

  &:hover .svg-icon {
    color: white;
  }
}

.input-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.input {
  width: 100%;
  margin-right: 1.2rem;
}
</style>