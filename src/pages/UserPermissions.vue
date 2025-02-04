<template>
  <SectionTabs :sectionTabs="sectionTab.permissionSectionTab" />
  <DataTable :columns="filteredColumns" :data="filteredData" />
</template>

<script>
import SectionTabs from '@/components/common/SectionTabs.vue';
import { useSelectedOptionStore } from '@/stores/selectedOption';
import DataTable from '@/components/common/DataTable.vue';
import tableData from '@/json/tableData.json';
import sectionTab from '@/json/sectionTab.json';

export default {
  name: 'AdminBody',
  components: {
    SectionTabs,
    DataTable,
  },
  data() {
    return {
      tableData,
      sectionTab,
    };
  },
  computed: {
    useSelectedOptionStore() {
      return useSelectedOptionStore();
    },
    filteredColumns() {
      return tableData.permissionColumn;
    },
    filteredData() {
      return tableData.permissionData;
    },
  },
};
</script>

<style scoped></style>
