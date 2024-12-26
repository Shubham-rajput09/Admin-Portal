<template>
  <main id="admin-body" class="main">
    <PrimaryButton />
    <SecondaryButton />
    <DropdownComponent />
    <HeadingComponent />
    <NavigationBar />
    <TableComponent :columns="columns" :data="tableData" />
  </main>
</template>

<script>
import TableComponent from '@/components/common/TableComponent.vue';
import HeadingComponent from '@/components/common/HeadingComponent.vue';
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import SecondaryButton from '@/components/common/SecondaryButton.vue';
import DropdownComponent from '@/components/common/DropdownComponent.vue';
import tableData from '@/json/tableData.json';
import NavigationBar from '@/components/common/NavigationBar.vue';
export default {
  name: 'AdminBody',
  components: {
    NavigationBar,
    DropdownComponent,
    SecondaryButton,
    PrimaryButton,
    HeadingComponent,
    TableComponent,
  },
  data() {
    return {
      ...tableData,
    };
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
