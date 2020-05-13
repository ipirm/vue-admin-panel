<template>
  <div class="breadcrumb">
    <div v-for="(item, i) in items"
        :key="item.pathname"
        class="breadcrumb-item"
        :class="{ active: i === items.length - 1 }"
    >
      {{ i !== 0 ? '&#8194;/&#8194;' : '' }}

      <template v-if="i < items.length - 1">
        <router-link :to="{ name: item.pathname }" class="breadcrumb-link">{{ item.title }}</router-link>
      </template>

      <template v-else>{{ item.title }}</template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
}

.breadcrumb-link, .breadcrumb-item {
  color: #9db7c7;
  font-size: 13px;
}
</style>
