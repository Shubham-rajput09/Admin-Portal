<template>
  <button class="search-button" @click="toggleSearchInput">
    <img src="@/assets/search-icon.png" alt="Search" class="search-icon" />
    <span v-if="!isSearchInputVisible">{{ buttonText }}</span>
    <input
      v-show="isSearchInputVisible"
      class="search-input"
      ref="searchInput"
      v-model="searchText"
      @blur="toggleSearchInput"
      @input="updateSearch"
      :placeholder="placeholder"
    />
  </button>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search...',
    },
    buttonText: {
      type: String,
      default: 'Search',
    },
  },
  data() {
    return {
      isSearchInputVisible: false,
      searchText: '',
    };
  },
  methods: {
    toggleSearchInput() {
      this.isSearchInputVisible = !this.isSearchInputVisible;
      if (this.isSearchInputVisible) {
        this.$nextTick(() => this.$refs.searchInput.focus());
      } else {
        this.searchText = '';
        this.$emit('search', '');
      }
    },
    updateSearch() {
      this.$emit('search', this.searchText);
    },
  },
};
</script>

<style scoped>
.search-button {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.search-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.search-input {
  border: none;
  outline: none;
  padding: 5px;
  font-size: 14px;
}
</style>
