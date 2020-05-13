<template>
  <div class="card-page">
    <bread-crumbs :items="breadcrumbs" />
    <tabs-blocks
      :tabs="pages"
      @click-tab="clickTabBlocks"
      :active-name="tabComponent"
      class="tabs-blocks"
      width="170px"
    />
    <transition name="fade" mode="out-in" appear>
      <router-view />
    </transition>
  </div>
</template>

<script>
import Categories from "@/pages/categories/Categories";
import ProductType from "@/pages/categories/ProductType";
import ProductSettingsType from "@/pages/categories/ProductSettingsType";
import TabsBlocks from "@/components/UILibrary/Tabs/TabsBlocks";

export default {
  components: { Categories, ProductType, ProductSettingsType, TabsBlocks },
  data() {
    return {
      breadcrumbs: [
        { pathname: "dashboard", title: "Home" },
        { pathname: "categories", title: "Categories" }
      ],
      pages: [
        { name: "Categories", active: true },
        { name: "Product Type", active: false },
        { name: "Product Settings Type", active: false }
      ],
      tabComponent: "Categories"
    };
  },
  methods: {
    clickTabBlocks(name) {
      if (name === "Categories") {
        this.tabComponent = "Categories";
        this.$router.push("/categories/");
      }
      if (name === "Product Type") {
        this.tabComponent = "ProductType";
        this.$router.push("/categories/product-type");
      }
      if (name === "Product Settings Type") {
        this.tabComponent = "ProductSettingsType";
        this.$router.push("/categories/product-settings-type");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs-blocks {
  margin-top: 1rem;
}
</style>
