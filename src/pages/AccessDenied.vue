<template>
  <div class="access-allowed">
    <div class="headline">
      Access Denied
    </div>
    <router-link
      :to="{name: 'login'}"
      class="link">
      Return to login form
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.access-allowed {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.headline {
  color: rgb(230, 93, 93);
  font-weight: 700;
  font-size: 40px;
}

.link {
  font-size: 24px;
  color: #388ad8;
}
</style>