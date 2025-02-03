<template>
  <main>
    <SectionTabs :sectionTabs="sectionTabs" />
    <SearchFilterBar />
    <DataTable :columns="filteredColumns" :data="filteredData" />
  </main>
</template>

<script>
import SectionTabs from '@/components/common/SectionTabs.vue';
import { useSelectedOptionStore } from '@/stores/selectedOption';
import DataTable from '@/components/common/DataTable.vue';
import tableData from '@/json/tableData.json';
import sectionTab from '@/json/sectionTab.json';
import SearchFilterBar from '@/components/common/SearchFilterBar.vue';

export default {
  name: 'UsersComponent',
  components: {
    SectionTabs,
    DataTable,
    SearchFilterBar,
  },
  data() {
    return {
      tableData,
      sectionTab,
    };
  },
  computed: {
    selectedOptionLabel() {
      return useSelectedOptionStore().selectedOptionLabel;
    },
    sectionTabs() {
      return this.sectionTab.usersSectionTab;
    },
    filteredColumns() {
      const store = useSelectedOptionStore();
      return store.selectedPageHeaderIndex === 1
        ? this.tableData.auditColumn
        : this.tableData.userColumn;
    },
    filteredData() {
      const store = useSelectedOptionStore();
      return store.selectedPageHeaderIndex === 1
        ? this.tableData.auditData
        : this.tableData.userData;
    },
  },
};
</script>

<style scoped></style>
