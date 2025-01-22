<template>
  <div class="checkbox-dropdown" @click.stop>
    <button class="dropdown-button" @click="toggleDropdown">
      {{ checkBoxDropDownTitle }}
      <span class="arrow" :class="{ open: isOpen }"></span>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <div class="dropdown-item">
        <label>
          <input
            type="checkbox"
            :checked="isSelectAllChecked"
            @change="toggleSelectAll"
            data-id="select-all"
          />
          Select All
        </label>
      </div>
      <div
        v-for="(option, index) in dropDownList"
        :key="index"
        class="dropdown-item"
      >
        <label>
          <input
            type="checkbox"
            :value="option.key"
            v-model="selectedOptions"
            :data-id="`option-${index}`"
          />
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checkBoxDropDownTitle: {
      type: String,
      required: true,
    },
    dropDownList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedOptions: [],
    };
  },
  computed: {
    isSelectAllChecked() {
      const allKeys = this.dropDownList.map((option) => option.key);
      return (
        allKeys.length > 0 &&
        allKeys.every((key) => this.selectedOptions.includes(key))
      );
    },
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    toggleSelectAll() {
      if (this.isSelectAllChecked) {
        this.selectedOptions = [];
      } else {
        this.selectedOptions = this.dropDownList.map((option) => option.key);
      }
      this.$emit('update-selected', this.selectedOptions);
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  },
};
</script>

<style scoped>
.checkbox-dropdown {
  position: relative;
  display: inline-block;
}

.arrow {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-left: 10px;
  border: solid black;
  border-width: 0 1px 1px 0;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(-135deg);
}

.dropdown-button {
  border: 1.3px solid;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 590;
  font-style: normal;
  text-align: center;
  padding: 10px 15px;
  cursor: pointer;
  min-height: 30px;
  min-width: 50px;
  background-color: transparent;
  color: #070000;
  white-space: nowrap;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
  min-width: 120px;
}

.dropdown-item {
  margin: 5px 0;
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 350;
}

label {
  display: flex;
  align-items: center;
  gap: 5px;
}

input[type='checkbox'] {
  cursor: pointer;
  accent-color: black;
  border-radius: 35px;
  padding: 5px;
  border: 4px solid black;
  background-color: #222;
  transition: all 0.3s ease;
  display: block;
  flex: 0 0 22px;
  height: 22px;
  margin-right: 10px;
  margin-top: -1px;
  position: relative;
  width: 22px;
}
</style>
