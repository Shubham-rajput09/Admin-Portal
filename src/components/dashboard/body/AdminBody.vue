<template>
  <main id="admin-body" class="main">
    <HeadingComponent :heading="useSelectedOptionStore.selectedOptionLabel" />
    <NavigationBar />
  </main>
</template>

<script>
import HeadingComponent from '@/components/common/HeadingComponent.vue';
import tableData from '@/json/tableData.json';
import NavigationBar from '@/components/common/NavigationBar.vue';
import { useSelectedOptionStore } from '@/stores/selectedOption';

export default {
  name: 'AdminBody',
  components: {
    NavigationBar,
    HeadingComponent,
  },
  data() {
    return {
      ...tableData,
    };
  },
  computed: {
    useSelectedOptionStore() {
      return useSelectedOptionStore();
    },
  },
};
</script>

<style scoped>
#admin-body {
  background: #f2f2f2;
  flex: 1;
  height: 100vh;
}
.main {
  height: 100vh;
  padding: 24px 32px;
}
</style>
