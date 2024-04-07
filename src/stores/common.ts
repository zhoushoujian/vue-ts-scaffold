import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCommonStore = defineStore('commonStore', () => {
  const microAppLoading = ref(true);

  function updateMicroAppLoading(value: boolean) {
    microAppLoading.value = value;
  }

  return {
    microAppLoading,
    updateMicroAppLoading,
  };
});
