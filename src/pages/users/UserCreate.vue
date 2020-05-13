<template>
  <div class="card-page">
    <bread-crumbs :items="breadcrumbs" />
    <div class="form-cont">
      <h1>Add user</h1>
      <tabs-blocks :tabs="roles" @click-tab="clickTabBlocks" active-name="Administrator" />
      <transition name="fade" mode="out-in" appear>
        <component :is="tabComponent" />
      </transition>
    </div>
  </div>
</template>

<script>
import TabsBlocks from '@/components/UILibrary/Tabs/TabsBlocks'

import AddAdmin from '@/components/Forms/Users/Add/AddAdmin'
import AddManager from '@/components/Forms/Users/Add/AddManager'
import AddTraveller from '@/components/Forms/Users/Add/AddTraveller'

import { mapActions } from 'vuex'

export default {
  components: { TabsBlocks, AddAdmin, AddManager, AddTraveller },
  data: () => ({
    breadcrumbs: [
      { pathname: "dashboard", title: 'Home' },
      { pathname: "user-index", title: 'Users' },
      { pathname: "user-create", title: 'Add user' }
    ],
    roles: [
      { name: 'Administrator', active: true },
      { name: 'Manager', active: false },
      { name: 'Traveller', active: false }
    ],
    tabComponent: 'AddAdmin'
  }),
  methods: {
    clickTabBlocks(name) {
      if (name === 'Administrator') this.tabComponent = 'AddAdmin'
      if (name === 'Manager') this.tabComponent = 'AddManager'
      if (name === 'Traveller') this.tabComponent = 'AddTraveller'
    }
  }
}
</script>

<style lang="scss" scoped>
.form-cont {
  margin-left: 25px;
  margin-top: 30px;
}
</style>