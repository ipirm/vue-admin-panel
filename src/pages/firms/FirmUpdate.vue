<template>
  <div class="card-page">
    <bread-crumbs :items="breadcrumbs" />
    <tabs-router :tabs="tabs" />
    <transition name="fade" mode="out-in">
      <loader class="loader-cont" v-if="loading" />
      <router-view v-else class="view-cont" />
    </transition>
  </div>
</template>

<script>
import TabsRouter from '@/components/UILibrary/Tabs/TabsRouter'
import { mapActions, mapState } from 'vuex'

export default {
  props: ['id'],
  components: { TabsRouter },
  data: () => ({
    breadcrumbs: [
      { pathname: "dashboard", title: 'Home' },
      { pathname: "firm-index", title: 'Operators' },
      { pathname: "firm-create", title: 'Edit operator' }
    ],
    tabs: [
      { title: 'General',               to: { name: 'firm-primary-update', params: {} } },
      { title: 'Contacts',              to: { name: 'firm-contacts-update', params: {} } },
      { title: 'Operator Page',         to: { name: 'firm-secondary-update', params: {} } },
      { title: 'Email & Notifications', to: { name: 'firm-notifications-update', params: {} } },
      { title: 'Booking & Finances',    to: { name: 'firm-booking-update', params: {} } },
      { title: 'Contract',              to: { name: 'firm-contract-update', params: {} } }
    ]
  }),
  created() {
    this.getOperator({id: this.id, expand: 'contactData,webSocialNetworks,companyProfile,i18n,tourGroup,notificationEmails,booking,finance'})
  },
  computed: {
    ...mapState('ui', ['loading'])
  },
  methods: {
    ...mapActions('operators', ['getOperator'])
  }
}
</script>

<style lang="scss" scoped>
.view-cont {
  margin-left: 20px;
}

.loader-cont {
  max-width: 400px;
  max-height: 400px;
}
</style>