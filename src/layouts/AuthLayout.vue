<template>
  <div class="auth-layout">
    <router-link to="/auth/login">
      <svg-icon class="logo" name="logo_w" />
    </router-link>
    <div class="router-view">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #094c74;
  height: 100vh;
}

.logo {
  width: 250px;
  height: 60px;
  margin-top: 40px;
  margin-left: 50px;
}

.router-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-bottom: 5rem;
}
</style>