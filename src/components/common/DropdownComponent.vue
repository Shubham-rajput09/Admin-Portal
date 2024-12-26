<template>
  <div class="dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      Users List
      <span class="arrow" :class="{ open: isOpen }"></span>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <a
        v-for="(user, index) in dropdownList"
        :key="index"
        href="#"
        class="dropdown-item"
      >
        {{ user }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      dropdownList: ['John Doe', 'Jane Smith', 'Emily Johnson', 'Sarah'],
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: absolute;
  display: inline-block;
  right: 20px;
}

.arrow {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-left: 15px;
  margin-bottom: 3px;
  border: solid #070000;
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
  display: inline-block;
  font-size: 1rem;
  font-weight: 590;
  font-style: normal;
  text-align: center;
  padding: 8px 12px;
  cursor: pointer;
  min-height: 15px;
  min-width: 40px;
  background-color: white;
}

.dropdown-button:hover {
  background-color: #f0f0f0;
}

.dropdown-menu {
  position: absolute;
  top: 45px;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  z-index: 1000;
}

.dropdown-item {
  padding: 10px 16px;
  display: block;
  color: #333;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>
