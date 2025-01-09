<template>
  <div class="search-bar">
    <div class="top-row">
      <div class="left-section">
        <button class="search-button" @click="toggleSearchInput">
          <img
            src="@/assets/search-icon.png"
            alt="Search"
            class="search-icon"
          />

          <span v-if="!isSearchInputVisible">Search</span>
          <input
            v-show="isSearchInputVisible"
            class="search-input"
            ref="searchInput"
            v-model="searchText"
            @blur="toggleSearchInput"
            placeholder=""
          />
        </button>

        <button class="advanced-filter-button">
          <img
            src="@/assets/filter-icon.png"
            alt="Filter"
            class="filter-icon"
          />
          Advanced Filters
        </button>
      </div>

      <div class="right-section">
        <button class="refresh-button">
          <img
            src="@/assets/refresh-icon.png"
            alt="Refresh"
            class="refresh-icon"
          />
        </button>
        <button class="print-button">
          <img src="@/assets/print-icon.png" alt="Print" class="print-icon" />
        </button>
        <PrimaryButton :button-name="ButtonName1" class="button1" />
        <DropdownComponent :DropDownName="DropDownName1" class="dropdown1" />
        <DropdownComponent :DropDownName="DropDownName2" class="dropdown2" />
      </div>
    </div>

    <div class="bottom-row">
      <PrimaryButton :button-name="ButtonName2" class="button" />
      <PrimaryButton :button-name="ButtonName3" class="button" />
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import DropdownComponent from '@/components/common/DropdownComponent.vue';

export default {
  name: 'SearchBar',
  components: { DropdownComponent, PrimaryButton },
  data() {
    return {
      ButtonName1: 'Export to Excel',
      ButtonName2: 'Change Super User',
      ButtonName3: 'Add New',
      DropDownName1: 'Bulk',
      DropDownName2: 'Show/Hide Columns',
      isSearchInputVisible: false,
      searchText: '',
    };
  },
  methods: {
    toggleSearchInput() {
      this.isSearchInputVisible = !this.isSearchInputVisible;

      this.$nextTick(() => {
        if (this.isSearchInputVisible && this.$refs.searchInput) {
          this.$refs.searchInput.focus();
        }
      });
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  padding: 5px;
  max-width: 500px;
  width: 100%;
}

.top-row {
  display: flex;
  justify-content: space-between;
  gap: 230px;
  width: 100%;
  margin-top: -5px;
}

.left-section {
  display: flex;
  gap: 10px;
}

.right-section {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}

.bottom-row {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-left: 678px;
  justify-content: flex-end;
}

.button {
  padding: 6px 5px;
}

.button1 {
  padding: 2px 8px;
  min-height: 2px;
  white-space: nowrap;
  max-width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown1 {
  padding: 3px 1px;
}

.dropdown2 {
  padding: 3px 8px;
}

.refresh-button {
  background-color: transparent;
  border: 1.3px solid;
  border-radius: 6px;
  color: black;
  cursor: pointer;
  padding: 5px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  margin-left: 10px;
  margin-top: 2px;
}
.print-button {
  background-color: transparent;
  border: 1.3px solid;
  border-radius: 6px;
  color: black;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  margin-left: 10px;
  margin-top: 2px;
}
.print-icon {
  width: 2rem;
  height: 1.5rem;
}

.search-button {
  padding: 10px 15px;
  font-size: 0.9rem;
  background-color: white;
  color: #070000;
  border: 1.3px solid;
  border-radius: 6px;
  cursor: pointer;
  min-height: 15px;
  width: 200px;
  font-style: normal;
  font-weight: lighter;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.search-icon {
  margin-right: 18px;
}
.search-input {
  padding: 5px;
  font-size: 0.9rem;
  width: 100%;
  border: none;
  outline: none;
}
.advanced-filter-button {
  padding: 10px 15px;
  font-size: 0.9rem;
  background-color: transparent;
  color: #070000;
  border: 1.3px solid;
  border-radius: 6px;
  cursor: pointer;
  min-height: 15px;
  width: 180px;
  font-style: normal;
  font-weight: 550;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.filter-icon {
  margin-right: 15px;
}

.refresh-button:hover,
.print-button:hover,
.advanced-filter-button:hover {
  background-color: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.refresh-icon,
.filter-icon,
.search-icon {
  width: 18px;
  height: 18px;
}
</style>
