<template>
  <div>
    <div class="default-layout">
      <side-bar />
      <div class="content-container">
        <header-bar />
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
 
<script>
import SideBar from '@/components/SideBar'
import HeaderBar from '@/components/HeaderBar'
import { mapActions } from 'vuex'

export default {
  components: { SideBar, HeaderBar },
  mounted() {
    this.getProfile()
  },
  methods: {
    ...mapActions('auth', ['getProfile'])
  }
}
</script>
 
<style lang="scss">
.default-layout {
  display: flex;
  min-height: 100vh;
  background-color: #e6edf1;
}

.content-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
