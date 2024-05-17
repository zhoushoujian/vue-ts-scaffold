import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useCommonStore = defineStore('commonStore', () => {
  const router = useRouter();

  const currentOpenRoute = ref('');

  function updateCurrentOpenRoute(path: string, needPush = true) {
    currentOpenRoute.value = path;
    needPush && router.push(path);
  }

  return {
    currentOpenRoute,
    updateCurrentOpenRoute,
  };
});
