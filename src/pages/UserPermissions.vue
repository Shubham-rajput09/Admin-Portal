<template>
  <SectionTabs :sectionTabs="sectionTabs" />
  <DataTable
    v-if="store.selectedPageHeaderIndex == 0"
    :columns="filteredColumns"
    :data="filteredData"
  />
  <PermissionTable v-if="store.selectedPageHeaderIndex == 1" />
</template>

<script>
import SectionTabs from '@/components/common/SectionTabs.vue';
import DataTable from '@/components/common/DataTable.vue';
import { useSelectedOptionStore } from '@/stores/selectedOption';
import tableData from '@/json/tableData.json';
import sectionTabsData from '@/json/sectionTab.json';
import PermissionTable from '@/components/common/PermissionTable.vue';

export default {
  name: 'AdminBody',
  components: {
    SectionTabs,
    DataTable,
    PermissionTable,
  },
  data() {
    return {
      store: useSelectedOptionStore(),
      tableData,
      sectionTabsData,
    };
  },
  computed: {
    sectionTabs() {
      return this.sectionTabsData.permissionSectionTab;
    },
    filteredColumns() {
      return this.tableData.permissionColumn;
    },
    filteredData() {
      return this.tableData.permissionData;
    },
  },
};
</script>

<style scoped></style>
