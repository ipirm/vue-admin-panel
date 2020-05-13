<template>
  <div class="forgot-password" @keyup.enter="onForgotPassword">
    <loader v-if="loader" color="white" type="points" background-color="rgba(9, 76, 116, 0.4)" />

    <div v-if="!successful" class="forgot-password-form">
      <div class="headline">Forgot Password</div>
      <div class="description">Enter your email. We will send you a letter</div>
      <div class="invalid-feedback">
        <div v-for="error in itemErrors" :key="error">
          {{ error }}
        </div>
      </div>
      <div class="input-group">
        <label for="">Email</label>
        <input v-model="email" @focus="itemErrors = []" placeholder="Email..." type="email">
      </div>
      <base-button @click-button="onForgotPassword" @keyup.native.enter="onForgotPassword">Submit</base-button>
      <router-link class="link" to="/auth/login">Come back</router-link>
    </div>
    
    <div v-if="successful" class="successful">
      <div class="successful-header">
        Successful!
      </div>
      <div class="successful-text">
        An email has been sent to your email.
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      loader: false,
      successful: false,
      email: '',
      itemErrors: []
    }
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),

    onForgotPassword() {
      this.loader = true
      this.forgotPassword({ email: this.email, "domain": "admin.travel.iteora.com" })
      .then(() => {
        this.loader = false
        this.successful = true
      })
      .catch((e) => {
        this.loader = false
        this.itemErrors = e.email
      })
    },

    resetError() {
      this.RESET_ITEM_ERRORS()
    }
  }
}
</script>

<style lang="scss" scoped>
.forgot-password {
  max-height: 400px;
  position: relative;
}

.forgot-password-form {
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

.successful {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.successful-text {
  color: white;
  margin-top: 10px;
}

.successful-header {
  font-size: 24px;
  font-weight: 500;
  color: white;
}

.invalid-feedback {
  font-size: 13px;
  font-weight: 500;
  color: #ff6303;
  margin-top: 10px;
}
</style>