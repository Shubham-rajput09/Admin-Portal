import { defineStore } from 'pinia';
import {
  selectedOptionLabels,
  selectedOptionKeys,
} from '@/constants/SelectedOption';

export const useSelectedOptionStore = defineStore('selectedOption', {
  state: () => ({
    selectedOption: 'USERS',
    selectedPageHeaderIndex: '0',
  }),

  getters: {
    selectedOptionLabel: (state) => {
      return selectedOptionLabels[state.selectedOption] || 'Unknown Option';
    },
  },
  actions: {
    setSelectedOption(option) {
      if (selectedOptionKeys.includes(option)) {
        this.selectedOption = option;
      }
    },
    setSelectedPageHeaderIndex(index) {
      console.log('changed');
      this.selectedPageHeaderIndex = index;
    },
  },
});
