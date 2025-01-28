<template>
  <main id="admin-body" class="main">
    <PageHeader :heading="useSelectedOptionStore.selectedOptionLabel" />
    <SectionTabs />
  </main>
</template>

<script>
import PageHeader from '@/components/common/PageHeader.vue';
import tableData from '@/json/tableData.json';
import SectionTabs from '@/components/common/SectionTabs.vue';
import { useSelectedOptionStore } from '@/stores/selectedOption';

export default {
  name: 'AdminBody',
  components: {
    SectionTabs,
    PageHeader,
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
