<template>
  <div class="table-container">
    <div class="top-bar">
      <div class="search-container">
        <SearchButton placeholder="Search" button-text="Search" />
      </div>

      <div class="button-container">
        <button class="refresh-button">
          <img
            src="@/assets/refresh-icon.png"
            alt="Refresh"
            class="refresh-icon"
          />
        </button>
        <PrimaryButton
          @click="handleAddNewClick"
          :buttonName="buttonName"
          class="add-new-button"
        />
      </div>
    </div>

    <DataTable :columns="filteredColumns" :data="filteredData" />
  </div>
</template>

<script>
import { useSelectedOptionStore } from '@/stores/selectedOption';
import DataTable from '@/components/common/DataTable.vue';
import tableData from '@/json/tableData.json';
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import SearchButton from '@/components/common/SearchButton.vue';

export default {
  name: 'AdminBody',
  components: {
    SearchButton,
    PrimaryButton,
    DataTable,
  },
  data() {
    return {
      ...tableData,
      buttonName: 'Add New',
      isSearchInputVisible: false,
      searchText: '',
    };
  },
  methods: {
    handleAddNewClick() {
      return this.$router.push('/add-new-group');
    },
    toggleSearchInput() {
      this.isSearchInputVisible = !this.isSearchInputVisible;

      this.$nextTick(() => {
        if (this.isSearchInputVisible && this.$refs.searchInput) {
          this.$refs.searchInput.focus();
        }
      });
    },
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
<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
}

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
  gap: 5px;
}

.refresh-button {
  padding: 15px;
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

.refresh-button:hover {
  background-color: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.refresh-icon {
  width: 18px;
  height: 18px;
}

.add-new-button {
  padding: 6px 10px;
  white-space: nowrap;
}
</style>
