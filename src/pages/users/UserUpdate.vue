<template>
  <div class="card-page">
    <bread-crumbs :items="breadcrumbs" />
    <div class="form-con">
      <h1>Edit user</h1>
      <tabs-blocks v-if="userRole" :tabs="roles" @click-tab="clickTabBlocks" :active-name="userRoleCheckedTabs()" />
      <transition name="fade" mode="out-in" appear>
        <loader v-if="loading" class="loader-cont" />
        <div class="container-fade" v-else>
          <component :is="getTabComponent" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import TabsBlocks from '@/components/UILibrary/Tabs/TabsBlocks'

import EditAdmin from '@/components/Forms/Users/Edit/EditAdmin'
import EditManager from '@/components/Forms/Users/Edit/EditManager'
import EditTraveller from '@/components/Forms/Users/Edit/EditTraveller'

import { mapActions, mapState } from 'vuex'

export default {
  props: ['id'],
  components: { TabsBlocks, EditAdmin, EditManager, EditTraveller },
  data: () => ({
    breadcrumbs: [
      { pathname: "dashboard", title: 'Home' },
      { pathname: "user-index", title: 'Users' },
      { pathname: "user-create", title: 'Edit user' }
    ],
    roles: [
      { name: 'Administrator', active: true },
      { name: 'Manager', active: false },
      { name: 'Traveller', active: false }
    ],
    tabComponent: ''
  }),
  computed: {
    ...mapState('ui', ['loading']),
    ...mapState('users', ['userRole']),

    getTabComponent: {
      get() {
        if (!this.tabComponent) this.tabComponent = this.userRoleChecked()
        return this.tabComponent
      },
      set(value) {
        this.tabComponent = value
      }
    }
  },
  created() {
    this.getUser(this.id)
  },
  methods: {
    ...mapActions('users', ['getUser']),

    clickTabBlocks(name) {
      if (name === 'Administrator') this.tabComponent = 'EditAdmin'
      if (name === 'Manager') this.tabComponent = 'EditManager'
      if (name === 'Traveller') this.tabComponent = 'EditTraveller'
    },

    userRoleChecked() {
      if (this.userRole === 'admin') return 'EditAdmin'
      if (this.userRole === 'manager') return 'EditManager'
      if (this.userRole === 'customer') return 'EditTraveller'
    },

    userRoleCheckedTabs() {
      if (this.userRole === 'admin') return 'Administrator'
      if (this.userRole === 'manager') return 'Manager'
      if (this.userRole === 'customer') return 'Traveller'
    }
  }
}
</script>

<style lang="scss" scoped>
.form-cont {
  margin-left: 25px;
  margin-top: 30px;
}

.loader-cont {
  max-width: 400px;
  max-height: 400px;
}

.container-fade {
  margin-left: 20px;
}
</style>
