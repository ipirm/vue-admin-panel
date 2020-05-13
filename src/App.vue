<template>
  <div id="app">
    <router-view />
    <notifications group="alert" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState({
      queue: state => state.ui.queue
    }),
  },
  watch: {
    queue: {
      handler (queue) {
        let queueTop = queue[queue.length - 1]

        this.$notify({ ...queueTop, group: 'alert' })
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss">
// Global Styles
@import '@/assets/scss/global-styles.scss';

#app {
  font-family: 'Quicksand', Arial, Helvetica, sans-serif;
}
 </style>