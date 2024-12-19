<template>
  <div class="dropdown-container">
  <div class="dropdown" @click="toggleDropdown">
    <button class="dropdown-btn" :class="{ open: isOpen}">
      <div class="icon-button">
      <img class="dropdown-icon" src="../../../assets/headphone.svg" alt="headphone"/>
        VSU
      </div>
      <span class="arrow" :class="{ open: isOpen }"></span>
    </button>

    <ul v-if="isOpen" class="dropdown-list" >
      <li
          class="dropdown-item-selected"
      >
        Search Account
      </li>
      <li
          class="dropdown-item"
      >
        Phone Numbers
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,

    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selected = option;
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>

.icon-button{
  display:flex;
  align-items: center;
  gap: 10px;
}
.dropdown-container{
  display:flex;
  justify-content: center;
}
.dropdown {
  width: 246px;
  position: relative;
}

.dropdown-btn {
  width: 100%;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  border: none;
  background: #e6e6e6;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropdown-btn.open{
  background: white;
}
.dropdown-icon{
  width: 21px;
  height: 21px;
}
.arrow {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-bottom: 3px;
  border: solid #000000;
  border-width: 0 1px 1px 0;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(-135deg);
}

.dropdown-list {
  position: absolute;
  top: 100%;
  right: 0;
  border: none;
  margin:0;
  background: white;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #cccccc;
  width: 228px;

}

.dropdown-item-selected {
 margin-left: 10px;
  padding: 10px;
  cursor: pointer;
  background: #000;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
.dropdown-item {
  margin-left: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}


</style>
