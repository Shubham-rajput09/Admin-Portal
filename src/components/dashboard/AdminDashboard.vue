<template>
  <div>
    <DashboardHeader />
    <div id="admin-dashboard">
      <LeftNavigation />
      <AdminBody />
    </div>
  </div>
</template>

<script>
import LeftNavigation from '@/components/dashboard/left-navigation/LeftNavigation.vue';
import AdminBody from '@/components/dashboard/body/AdminBody.vue';
import DashboardHeader from '@/components/dashboard/header/DashboardHeader.vue';

export default {
  name: 'AdminDashboard',
  components: {
    DashboardHeader,
    AdminBody,
    LeftNavigation,
  },
};
</script>

<style scoped>
#admin-dashboard {
  display: flex;
  flex-direction: row;
}
</style>
