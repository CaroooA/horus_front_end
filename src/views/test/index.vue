<template>
  <div>测试</div>
</template>

<script>
import { dashboardLogin } from '@/api/table'

export default {
  name: 'Test',
  created() {
    this.onSubmit()
  },
  methods: {
    dashboardLogin,
    onSubmit() {
      dashboardLogin().then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
