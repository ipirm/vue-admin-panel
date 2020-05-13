<template>
  <div class="search-wrapper">
    <svg-icon class="search-icon" name="search" />
    <input type="text" placeholder="Search">
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  height: 36px;
  width: 100%;
  max-width: 260px;
  display: flex;
  align-items: center;
}

.search-icon {
  color: #6b94ac;
}

input[type="text"] {
  border: none;
  outline: none;
  padding-left: 8px;
  color: #6b94ac;
}

input[type="text"]::placeholder {
  font-size: 13px;
  font-weight: 500;
  color: #6b94ac;
}
</style>
