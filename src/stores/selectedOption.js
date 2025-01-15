import { defineStore } from 'pinia';
import {
  selectedOptionLabels,
  selectedOptionKeys,
} from '@/constants/SelectedOption';

export const useSelectedOptionStore = defineStore('selectedOption', {
  state: () => ({
    selectedOption: 'USERS',
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
  },
});
