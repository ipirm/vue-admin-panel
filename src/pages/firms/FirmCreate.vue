<template>
  <div class="card-page">
    <bread-crumbs :items="breadcrumbs" />
    <h1>Add operator</h1>
    <h6>General Info</h6>
    <add-operator-form />
  </div>
</template>

<script>
import AddOperatorForm from '@/components/Forms/Firms/AddOperatorForm'

export default {
  components: { AddOperatorForm },
  data: () => ({
    breadcrumbs: [
      { pathname: "dashboard", title: 'Home' },
      { pathname: "firm-index", title: 'Operators' },
      { pathname: "firm-create", title: 'Add operator' }
    ]
  })
}
</script>
