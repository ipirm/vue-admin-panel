<template>
  <div class="error-page">
    <div class="error-container">
      <div class="header">404</div>
      <div class="name">Page not found</div>
      <div class="description">
        You may have typed the address incorrectly or you may have used an oudated link.
        <router-link class="link" to="/">
          Come back home
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: -4%;
}

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 580px;
  padding: 0 20px 0 20px;
}

.header {
  font-size: 150px;
  font-weight: 300;
  color: rgb(184, 201, 212);
  line-height: 135px;
}

.name {
  font-size: 32px;
  color: rgb(184, 201, 212);
  font-weight: 500;
}

.description {
  text-align: center;
  margin-top: 10px;
  color: #7c8a94;
  line-height: 27px;
}

.link {
  color: #74818a;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
}
</style>