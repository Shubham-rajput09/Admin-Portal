<template>
  <DataTable :columns="filteredColumns" :data="filteredData" />
</template>

<script>
import { useSelectedOptionStore } from '@/stores/selectedOption';
import DataTable from '@/components/common/DataTable.vue';
import tableData from '@/json/tableData.json';

export default {
  name: 'ExtensionComponent',
  components: {
    DataTable,
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
    filteredColumns() {
      return tableData.extensionType;
    },
    filteredData() {
      return tableData.extensionData;
    },
  },
};
</script>

<style scoped></style>
