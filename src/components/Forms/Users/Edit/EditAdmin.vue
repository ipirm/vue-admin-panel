<template>
  <div class="form-container">
    <div class="form-content">
      <h6>General Info</h6>
      <base-input 
        v-model="full_name" 
        :errors="pe"
        @resetError="resetError()"
        label="Full Name" />

      <base-input
        v-model="email" 
        :errors="itemErrors['email']"
        @resetError="resetError()"
        label="Email [Login]" />

      <base-input 
        :errors="itemErrors['password']"
        @resetError="resetError()"
        v-model="password" 
        label="Password" 
        password />
    </div>
    <base-button @click.native="addUpdateUser" type="light" long>Save</base-button>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      full_name: '',
      email: '',
      password: ''
    }
  },
  beforeMount() {
    this.full_name = this.user.profile.full_name
    this.email = this.user.email
  },
  computed: {
    ...mapState('ui', ['itemErrors']),
    ...mapState('users', ['user']),

    pe() {
      return this.itemErrors['profile'] && this.itemErrors['profile'][0].full_name || []
    }
  },
  methods: {
    ...mapActions('users', ['updateUser']),
    ...mapMutations('ui', ['RESET_ITEM_ERROR']),
    
    addUpdateUser() {
      const user = {
        role: 'admin',
        email: this.email,
        password: this.password,
        profile: {
          full_name: this.full_name
        }
      }

      this.updateUser(user)
    },

    resetError() {
      this.RESET_ITEM_ERROR()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 315px;
  margin-top: 20px;
  margin-bottom: 15px;
}
</style>