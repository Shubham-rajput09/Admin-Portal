<template>
  <div id="admin-dashboard">
 <LeftNavigation/>
    <AdminBody/>
  </div>
</template>

<script>
import LeftNavigation from "@/components/dashboard/left-navigation/LeftNavigation.vue";
import AdminBody from "@/components/dashboard/body/AdminBody.vue";

export default {
  name: "AdminDashboard",
  components: {
    AdminBody,
    LeftNavigation,
  }
};
</script>

<style scoped>
#admin-dashboard {
  display: flex;
  flex-direction: row;
}
</style>
