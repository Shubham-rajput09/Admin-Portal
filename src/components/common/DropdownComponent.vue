<template>
  <div class="dropdown">
    <button
      data-id="dropdown-button"
      class="dropdown-button"
      @click="toggleDropdown"
    >
      {{ dropDownTitle }}
      <span class="arrow" :class="{ open: isOpen }"></span>
    </button>

    <div v-if="isOpen" data-id="dropdown-menu" class="dropdown-menu">
      <ul>
        <li
          v-for="(option, index) in dropDownList"
          :key="index"
          class="dropdown-item"
          :data-id="'dropdown-item-' + index"
          @click="selectOption(option.key)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dropDownTitle: {
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
    };
  },
  methods: {
    selectOption(optionKey) {
      this.$emit('select-option', optionKey);
    },
    toggleDropdown(event) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
      console.log('Dropdown isOpen:', this.isOpen);
    },
    closeDropdown() {
      this.isOpen = false;
    },
  },
  mounted() {
    console.log('dropDownList in child:', this.dropDownList);
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}
.arrow {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-left: 10px;
  margin-bottom: 0;
  border: solid #070000;
  border-width: 0 1px 1px 0;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
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

.dropdown-button:hover {
  background-color: #f0f0f0;
}

.dropdown-menu {
  position: absolute;
  top: 45px;
  left: 0;
  background-color: #fbf7f7;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(14, 0, 0, 0.12);
  min-width: 80px;
  min-height: 30px;
  z-index: 1000;
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.dropdown-item {
  padding: 10px 5px;
  font-weight: 300;
  font-size: 14px;
  color: #070000;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>
