<template>
  <div>
    <div class="navbar">
      <div
        v-for="(tab, index) in sectionTabs"
        :key="tab.name"
        :class="['navbar-item', { active: selected === tab.name }]"
        @click="selectTab(tab.name, index)"
      >
        {{ tab.label }}
      </div>
    </div>
    <hr class="underline" />
  </div>
</template>

<script>
import { useSelectedOptionStore } from '@/stores/selectedOption';

export default {
  name: 'SectionTabs',
  props: {
    sectionTabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: this.sectionTabs.length ? this.sectionTabs[0].name : ' ',
    };
  },
  computed: {
    selectedTab() {
      return (
        this.selected ||
        (this.sectionTabs.length ? this.sectionTabs[0].name : '')
      );
    },
  },
  methods: {
    selectTab(tab, index) {
      this.selected = tab;
      const selectedOptionStore = useSelectedOptionStore();
      selectedOptionStore.setSelectedPageHeaderIndex(index);
      console.log(selectedOptionStore.selectedPageHeaderIndex);
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
}
.navbar-item {
  cursor: pointer;
  padding: 5px 2px;
  font-size: 1.1rem;
  text-align: center;
  position: relative;
  display: inline-block;
}

.navbar-item.active {
  font-weight: 600;
}

.navbar-item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.navbar-item.active::after {
  background-color: black;
}
.underline {
  margin-top: 4px;
}
</style>
