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
        <PrimaryButton :buttonName="exportToExcelButton" class="export-excel" />
        <DropdownComponent
          :dropDownTitle="dropDownOption['bulk_drop_down'].title"
          :dropDownList="dropDownOption['bulk_drop_down'].dropDownOptions"
          @selectOption="handleDropdownOption"
        />
        <CheckBoxDropDown
          :checkBoxDropDownTitle="checkBoxDropDown['show_or_hide'].title"
          :dropDownList="checkBoxDropDown['show_or_hide'].checkBoxDropDownList"
          @update-selected="handleSelectedOptions"
        />
      </div>
    </div>

    <div class="bottom-row">
      <PrimaryButton
        :buttonName="changeSuperUserButton"
        class="change-user-button"
      />
      <PrimaryButton
        @click="handleAddNewClick"
        :buttonName="addNewButton"
        class="add-new-button"
      />
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import DropdownComponent from '@/components/common/DropdownComponent.vue';
import CheckBoxDropDown from '@/components/common/CheckBoxDropDown.vue';

export default {
  name: 'SearchFilterBar',
  components: { DropdownComponent, PrimaryButton, CheckBoxDropDown },
  data() {
    return {
      exportToExcelButton: 'Export to Excel',
      changeSuperUserButton: 'Change Super User',
      addNewButton: 'Add New',
      isSearchInputVisible: false,
      dropDownOption: {
        bulk_drop_down: {
          title: 'Bulk',
          dropDownOptions: [
            {
              key: 'add',
              label: 'Add',
            },
          ],
        },
      },
      checkBoxDropDown: {
        show_or_hide: {
          title: 'Show/Hide Columns',
          checkBoxDropDownList: [
            { key: 'user', label: 'User' },
            { key: 'extension', label: 'Extension' },
            { key: 'phone number', label: 'Phone Number' },
            { key: 'groups', label: 'Groups' },
            { key: 'email', label: 'Email' },
            { key: 'user name', label: 'User name' },
            { key: 'User Type', label: 'User Type' },
          ],
        },
      },
      selectedOptions: [],
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
    handleDropdownOption(optionKey) {
      if (optionKey === 'add') {
        this.$router.push('/add-bulk');
      }
    },
    handleSelectedOptions(selected) {
      this.selectedOptions = selected;
    },
    handleAddNewClick() {
      return this.$router.push('/add-new');
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

.change-user-button,
.add-new-button {
  padding: 6px 5px;
}

.export-excel {
  padding: 2px 8px;
  min-height: 2px;
  white-space: nowrap;
  max-width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
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
