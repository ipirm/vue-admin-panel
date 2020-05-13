<template>
  <div class="login-form" @keyup.enter="onLogin()">
    <div class="headline">Autorization</div>
    
    <div class="invalid-feedback">
      <div v-for="error in itemErrors.password" :key="error">
        {{ error }}
      </div>
    </div>
      
    <div class="input-group">
      <label placeholder="Email..." for="Email">Email</label>
      <input v-model="email" @focus="resetError()" id="Email" placeholder="Email..." type="email">
    </div>

    <div class="input-group">
      <label for="Password">Password</label>
      <input v-model="password" @focus="resetError()" id="Password" placeholder="Password..." type="password">
    </div>

    <base-button @click-button="onLogin()">Sign-In</base-button>

    <router-link class="link" to="/auth/forgot-password">Forgot password?</router-link>

    <loader v-if="loading" color="white" type="points" background-color="rgba(9, 76, 116, 0.4)" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data: () => ({
    email: '',
    password: ''
  }),

  computed: {
    ...mapState('ui', ['loading']),
    ...mapState('ui', ['itemErrors'])
  },

  methods: {
    ...mapActions('auth', ['login']),
    ...mapMutations('ui', ['SET_LOADING']),
    ...mapMutations('ui', ['RESET_ITEM_ERRORS']),

    onLogin() {
      this.SET_LOADING(true)

      this.login({
        method: 'basic',
        data: { username: this.email, password: this.password }
      })
    },

    resetError(property) {
      this.RESET_ITEM_ERRORS()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  max-height: 400px;
  position: relative;
  margin-bottom: 50px;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 15px;
}

label {
  color: white;
  font-size: 13px;
  margin-bottom: 5px;
}

.headline {
  font-weight: 400;
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
}

.button {
  color: #041e2e !important;
  font-weight: 700 !important;
  background-color: #faab1a !important;
  margin-top: 30px;
  width: 128px;
  &:hover {
    background-color: #d08805 !important;
  }
}

.link {
  margin-top: 15px;
  font-size: 13px;
  &:hover {
    text-decoration: underline;
  }
}

.invalid-feedback {
  font-size: 13px;
  font-weight: 500;
  color: #ff6303;
}
</style>