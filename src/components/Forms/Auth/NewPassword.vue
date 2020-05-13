<template>
  <div class="new-password" @keyup.enter="onResetPassword">
    <loader v-if="loading" color="white" type="points" background-color="rgba(9, 76, 116, 0.4)" />

    <div class="new-password-form">
      <div class="headline">New Password</div>
      <div class="description">Enter your new password</div>
      <div class="invalid-feedback">
        <div v-for="error in itemErrors.password" :key="error">
          {{ error }}
        </div>
      </div>
      <div class="input-group">
        <label for="">Password</label>
        <input v-model="password" @focus="resetError()" placeholder="Password..." type="password">
      </div>
      <base-button @click-button="onResetPassword">Submit</base-button>
      <router-link class="link" to="/auth/login">Come back</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data: () => ({
    email: '',
    password: '',
    token: null
  }),

  created() {
    if (this.$route.fullPath.split('=')[1]) {
      this.token = this.$route.fullPath.split('=')[1]
    } else {
      this.$router.push('/auth/login')
    }
  },

  computed: {
    ...mapState('ui', ['loading']),
    ...mapState('ui', ['itemErrors'])
  },

  methods: {
    ...mapActions('auth', ['resetPassword']),
    ...mapMutations('ui', ['RESET_ITEM_ERRORS']),

    onResetPassword() {
      this.resetPassword({ token: this.token, password: this.password })
    },

    resetError() {
      this.RESET_ITEM_ERRORS()
    }
  }
}
</script>


<style lang="scss" scoped>
.new-password {
  max-height: 400px;
  position: relative;
}

.new-password-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.headline {
  font-weight: 500;
  font-size: 1.3rem;
  color: white;
}

label {
  color: white;
  font-size: 13px;
  margin-bottom: 5px;
}

.description {
  color: white;
  font-size: 13px;
  margin-top: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 15px;
}

.button {
  color: #212529 !important;
  font-weight: 500;
  background-color: #faab1a !important;
  margin-top: 25px;
  width: 128px;
  &:hover {
    background-color: #d08805 !important;
  }
}

.link {
  margin-top: 15px;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
}

.invalid-feedback {
  font-size: 13px;
  font-weight: 500;
  color: #ff6303;
  margin-top: 10px;
}
</style>