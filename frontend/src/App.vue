<template>
  <AdminDashboard />
</template>

<script>
import AdminDashboard from "@/components/dashboard/AdminDashboard.vue";

export default {
  name: 'App',
  components: {
    AdminDashboard
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
