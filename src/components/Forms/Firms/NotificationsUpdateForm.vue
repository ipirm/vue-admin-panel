<template>
  <div class="form-container">
    <h1>Email Notifications</h1>
    <div>
      <div class="headline">New Tour Enquiry Email</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
      <multi-inputs :items="notificationEmails.new_tour_enquiry_emails" @change-inputs="notificationEmails.new_tour_enquiry_emails = $event" />
    </div>

    <div class="group-cont">
      <div class="headline">Review Notification Email</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
      <multi-inputs :items="notificationEmails.review_notification_emails" @change-inputs="notificationEmails.review_notification_emails = $event" />
    </div>

    <div class="group-cont">
      <div class="headline">Invoice Email</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.</div>
      <multi-inputs :items="notificationEmails.invoice_emails" @change-inputs="notificationEmails.invoice_emails = $event" />
    </div>

    <base-button @click.native="submit" class="save" type="light" long>Save</base-button>
  </div>
</template>

<script>
import MultiInputs from '@/components/UILibrary/Inputs/MultiInputs'
import { mapState, mapActions } from 'vuex'

const _notificationEmails = {
  new_tour_enquiry_emails: [''],
  review_notification_emails: [''],
  invoice_emails: ['']
}

export default {
  components: { MultiInputs },
  data() {
    return {
      notificationEmails: null
    }
  },
  beforeMount() {
    this.notificationEmails = this.operator.notificationEmails || _notificationEmails

    this.new_tour_enquiry_emails = [...this.notificationEmails['new_tour_enquiry_emails'] || ['']]
    this.review_notification_emails = [...this.notificationEmails['review_notification_emails'] || ['']]
    this.invoice_emails = [...this.notificationEmails['invoice_emails'] || ['']]
  },
  computed: {
    ...mapState('operators', ['operator'])
  },
  methods: {
    ...mapActions('operators', ['updateOperator']),

    submit() {
      this.updateOperator({notificationEmails: this.notificationEmails})
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  margin-top: 40px;
}

.group-cont {
  margin-top: 20px;
}

.headline {
  font-size: 13px;
  color: #052e46;
  font-weight: 500;
  margin-bottom: 10px;
}

.save {
  margin-top: 25px;
}

.description {
  font-size: 13px;
  color: #052e46;
  margin-bottom: 13px;
}
</style>