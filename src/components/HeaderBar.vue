<template>
  <div class="header-container">
    <search-input class="search-input" />
    <div class="left-content">
      <svg-icon class="icon" name="notification" />
      <svg-icon class="icon" name="support" v-popover:support />
      <svg-icon v-if="profile" class="icon" name="avatar" v-popover:user />

      <popover :width="120" name="support">
        <div class="support-links">
          <router-link v-for="(item, key) in support" :key="key" :to="item.path" class="link">{{ item.title }}</router-link>
        </div>
      </popover>

      <popover :width="300" class="popover" name="user">
        <div class="user-cont">
          <div class="user-name">{{ profile.full_name }}</div>
          <div class="user-email">{{ profile.email }}</div>
          <div class="setting-type">
            <router-link key="key" to="/categories" class="link">Categories</router-link>
          </div>
          <div class="setting-type">
            <router-link key="key" to="/product-types" class="link">Product types</router-link>
          </div>
          <div class="setting-type">
            <router-link key="key" to="/product-setting-types" class="link">Product setting types</router-link>
          </div>
          <div class="setting-type">
            <router-link key="key" to="/group-of-countries" class="link">Group of countries</router-link>
          </div>
          <div class="setting-type">
            <router-link key="key" to="/countries" class="link">Countries</router-link>
          </div>
          <div class="setting-type">
            <router-link key="key" to="/cities" class="link">Cities</router-link>
          </div>
          <div class="setting-type">
            <router-link key="key" to="/text-pages" class="link">Text pages</router-link>
          </div>
          <div class="setting-type">
            <router-link key="key" to="/menus" class="link">Nav menus</router-link>
          </div>
          <div class="hr-gorizontal"></div>
          <div class="log-out" @click="onLogout">
            <svg-icon name="exit" />
            <span class="logout-text">Log Out</span>
          </div>
        </div>
      </popover>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/UILibrary/SearchInput'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    SearchInput
  },
  data: () => ({
    support: [
      { title: 'Get Support', path: '#' },
      { title: 'Contact Us', path: '#' },
      { title: 'Help', path: '#' }
    ]
  }),
  computed: {
    ...mapState('auth', { profile: 'item' })
  },
  methods: {
    ...mapActions('auth', ['logout']),
    
    onLogout() {
      this.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  height: 50px;
  background-color: #fff;
  width: 100%;
  border-bottom: 1px solid #e6edf1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
}

.search-input {
  margin-left: 20px;
}

.left-content {
  margin-right: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;
  color: #094c74;
}

.icon {
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #faab1a;
  }
}

.dropdown {
  position: absolute;
  margin-left: -120px;
  width: 150px;
  background-color: #fff;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.4);
}

.link {
  color: #212529;
  font-size: 14px;
  margin-top: 15px;
  transition: color 0.3s ease;
  &:hover {
    color: #faab1a
  }
}

.support-links {
  display: flex;
  flex-direction: column;
  padding: 5px 15px 15px 15px;
}

.popover {
  margin-left: -80px;
  &:before {
    margin-left: 80px;
  }
}

.logout-text {
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 13px;
}

.user-cont {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
  font-size: 13px;
  margin: 15px 15px 7px 15px;
  overflow-x: hidden;
}

.setting-type{
  font-size: 13px;
  margin: 0 15px 7px 15px;
  overflow-x: hidden;
  a{
    color: #094c74;
  }
}

.user-email {
  font-size: 13px;
  margin: 0 15px 7px 15px;
  overflow-x: hidden;
}

.hr-gorizontal {
  margin: 10px 0;
}

.log-out {
  margin: 0 15px 10px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #faab1a;
  }
}
</style>

