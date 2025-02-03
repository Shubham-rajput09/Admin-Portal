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
import { useSelectedOptionStore } from '@/stores/selectedOption';

export default {
  name: 'AdminDashboard',
  components: {
    DashboardHeader,
    AdminBody,
    LeftNavigation,
  },

  computed: {
    selectedOptionLabel() {
      return useSelectedOptionStore().selectedOptionLabel;
    },
    useSelectedOptionStore() {
      return useSelectedOptionStore();
    },
  },
};
</script>

<style scoped>
#admin-dashboard {
  display: flex;
  flex-direction: row;
}
#admin-body {
  background: #f2f2f2;
  flex: 1;
  height: 100vh;
}
.main {
  height: 100vh;
  padding: 24px 32px;
}
</style>
