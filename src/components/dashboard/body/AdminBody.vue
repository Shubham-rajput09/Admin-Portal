<template>
  <main id="admin-body" class="main">
    <PageHeader :heading="useSelectedOptionStore.selectedOptionLabel" />
    <UsersComponent v-if="useSelectedOptionStore.selectedOption === 'USERS'" />
    <GroupManagement
      v-else-if="useSelectedOptionStore.selectedOption === 'GROUP_MANAGEMENT'"
    />
    <UserPermissions
      v-else-if="useSelectedOptionStore.selectedOption === 'USER_PERMISSIONS'"
    />
    <ExtensionComponent
      v-else-if="useSelectedOptionStore.selectedOption === 'EXTENSIONS'"
    />
  </main>
</template>

<script>
import PageHeader from '@/components/common/PageHeader.vue';
import { useSelectedOptionStore } from '@/stores/selectedOption';
import tableData from '@/json/tableData.json';
import UsersComponent from '@/pages/Users.vue';
import GroupManagement from '@/pages/GroupManagement.vue';
import UserPermissions from '@/pages/UserPermissions.vue';
import ExtensionComponent from '@/pages/Extensions.vue';

export default {
  name: 'AdminBody',
  components: {
    PageHeader,
    UsersComponent,
    GroupManagement,
    UserPermissions,
    ExtensionComponent,
  },
  data() {
    return {
      ...tableData,
    };
  },
  computed: {
    useSelectedOptionStore() {
      return useSelectedOptionStore();
    },
  },
};
</script>

<style scoped>
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
