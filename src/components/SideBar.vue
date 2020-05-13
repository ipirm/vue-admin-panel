<template>
  <nav class="sidebar-nav">
    <template v-for="(item, key) in navItems">
      <router-link
        :key="key"
        :to="item.path"
        v-if="showLink(item.admin)"
        class="router-link">
        <div class="nav-item">
          <div class="svg-container">
            <svg-icon :name="item.icon" />
            <div class="active-notification"></div>
          </div>

          <div class="nav-item-name"> {{ item.name }} </div>
        </div>
      </router-link>
    </template>
  </nav>
</template>

<script>
export default {
  data: () => ({
    navItems: [
      { name: 'Dashboard', path: '/dashboard', admin: 'customer', icon: 'home', notification: false },
      { name: 'Enquiries & Bookings', path: '/bookings', admin: 'customer', icon: 'bookings', notification: false },
      { name: 'Reports', path: '/reports', admin: 'customer', icon: 'reports', notification: false },
      { name: 'Tours', path: '/tours', admin: 'customer', icon: 'tours', notification: false },
      { name: 'Q&A', path: '/question', admin: 'admin', icon: 'QA', notification: false },
      { name: 'Videos', path: '/a', admin: 'customer', icon: 'videos', notification: false },
      { name: 'Reviews', path: '/reviews', admin: 'customer', icon: 'reviews', notification: false },
      { name: 'Promotion', path: '/promotions', admin: 'customer', icon: 'promotion', notification: false },
      { name: 'Users', path: '/users', admin: 'customer', icon: 'users', notification: false },
      { name: 'Operators', path: '/operators', admin: 'admin', icon: 'home', notification: false }
    ]
  }),
  computed: {
    getRoleUser() {
      return this.$store.state.auth.item.role
    }
  },
  methods: {
    showLink(role) {
      return role === 'admin' ? this.getRoleUser === 'admin' ? true : false : true
    }
  }
}
</script>


<style lang="scss" scoped>
.sidebar-nav {
  min-width: 100px;
  max-width: 100px;
  min-height: 100%;
  background-color: #094c74;
}

.nav-item-name {
  text-align: center;
  padding-top: 5px;
}

.svg-container {
  text-align: center;
}

.router-link {
  height: 85px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 400;
  font-size: 12px;
  transition: all 0.3s ease;
  opacity: 0.9;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
}

.router-link-active {
  border-color: #faab1a;
  background-color: #faab1a;
  color: #041e2e;

  &:hover {
    background-color: #faab1a;
    border-color: #faab1a;
    color: #041e2e;
  }
}
</style>

