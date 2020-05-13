<template>
  <div class="tabs-ordinary">
    <router-link class="link" v-for="(tab, key) in tabs" :key="key" :to="tab.to">{{ tab.title }}</router-link>
  </div>
</template>

<script>
// { title: 'name', to: { name: 'name path', params: {id} } },
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  font-size: 13px;
  color: #6b94ac;
  font-weight: 500;
  margin-right: 22px;
  transition: color 0.3s ease;
  &:hover {
    color: #094c74;
  }
}

.router-link-exact-active {
  color: #094c74;
  cursor: default;
  padding-bottom: 3px;
  border-bottom: 1px solid #094c74;
}

.tabs-ordinary {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>