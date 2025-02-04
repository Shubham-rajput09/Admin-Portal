<template>
  <DataTable :columns="filteredColumns" :data="filteredData" />
</template>

<script>
import { useSelectedOptionStore } from '@/stores/selectedOption';
import DataTable from '@/components/common/DataTable.vue';
import tableData from '@/json/tableData.json';

export default {
  name: 'AdminBody',
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
      return tableData.groupColumn;
    },
    filteredData() {
      return tableData.groupData;
    },
  },
};
</script>

<style scoped></style>
