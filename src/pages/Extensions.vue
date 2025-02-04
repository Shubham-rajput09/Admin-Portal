<template>
  <SectionTabs :sectionTabs="sectionTabs" />
  <div class="top-bar">
    <div class="search-container">
      <SearchButton placeholder="Search" button-text="Search" />
    </div>

    <div class="button-container">
      <button class="print-button">
        <img
          src="@/assets/print-icon.png"
          alt="Print icon"
          class="print-icon"
        />
      </button>
      <PrimaryButton :buttonName="bulkEditButton" class="add-new-button" />
      <PrimaryButton :buttonName="addNewButton" class="add-new-button" />
    </div>
  </div>
  <div class="extension-checkbox">
    <input
      type="checkbox"
      id="unassignedCheckbox"
      data-id="unassigned-checkbox"
    />
    <label for="unassignedCheckbox">Only show unassigned extensions</label>
  </div>
  <DataTable :columns="filteredColumns" :data="filteredData" />
</template>

<script>
import { useSelectedOptionStore } from '@/stores/selectedOption';
import DataTable from '@/components/common/DataTable.vue';
import tableData from '@/json/tableData.json';
import SectionTabs from '@/components/common/SectionTabs.vue';
import sectionTab from '@/json/sectionTab.json';
import SearchButton from '@/components/common/SearchButton.vue';
import PrimaryButton from '@/components/common/PrimaryButton.vue';

export default {
  name: 'ExtensionComponent',
  components: {
    PrimaryButton,
    SearchButton,
    SectionTabs,
    DataTable,
  },
  data() {
    return {
      tableData,
      sectionTab,
      addNewButton: 'Add New',
      bulkEditButton: 'Bulk Edit',
      isUnassignedOnly: false,
    };
  },
  computed: {
    useSelectedOptionStore() {
      return useSelectedOptionStore();
    },
    sectionTabs() {
      return this.sectionTab.extensionTab;
    },
    filteredColumns() {
      const store = useSelectedOptionStore();
      return store.selectedPageHeaderIndex === 1
        ? this.tableData.auditColumn
        : this.tableData.extensionType;
    },
    filteredData() {
      const store = useSelectedOptionStore();
      return store.selectedPageHeaderIndex === 1
        ? this.tableData.auditData
        : this.tableData.extensionData;
    },
  },
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.search-container {
  display: flex;
  align-items: center;
}
.button-container {
  display: flex;
  gap: 2px;
}
.search-container {
  display: flex;
  align-items: center;
}

.print-button {
  padding: 10px;
  margin-top: 5px;
  background-color: transparent;
  border: 1.3px solid;
  border-radius: 6px;
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
}
.print-button:hover {
  background-color: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.print-icon {
  width: 25px;
  height: 18px;
}

.add-new-button {
  padding: 6px 5px;
  white-space: nowrap;
}
.extension-checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-left: 10px;
}

.extension-checkbox input[type='checkbox'] {
  margin-right: 15px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 4px solid black;
  accent-color: #070000;
  cursor: pointer;
  margin-bottom: 10px;
}

.extension-checkbox label {
  font-size: 16px;
  font-weight: normal;
  color: rgba(16, 11, 11, 0.64);
  margin-bottom: 10px;
}
</style>
