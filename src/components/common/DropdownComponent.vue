<template>
  <div class="dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      {{ dropDownTitle }}
      <span class="arrow" :class="{ open: isOpen }"></span>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <a
        v-for="(option, index) in dropDownList"
        :key="index"
        href="#"
        class="dropdown-item"
        @click="selectOption(option.key)"
      >
        {{ option.label }}
      </a>
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
  border: 1px solid #fbf7f7;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 80px;
  z-index: 1000;
}
.dropdown-item {
  padding: 10px 16px;
  display: block;
  font-weight: 300;
  font-size: 14px;
  color: #070000;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>
