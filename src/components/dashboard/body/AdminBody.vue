<template>
  <main id="admin-body" class="main">
    <SecondaryButton />
    <HeadingComponent />
    <NavigationBar />
  </main>
</template>

<script>
import HeadingComponent from '@/components/common/HeadingComponent.vue';
import SecondaryButton from '@/components/common/SecondaryButton.vue';
import tableData from '@/json/tableData.json';
import NavigationBar from '@/components/common/NavigationBar.vue';
export default {
  name: 'AdminBody',
  components: {
    NavigationBar,
    SecondaryButton,
    HeadingComponent,
  },
  data() {
    return {
      ...tableData,
    };
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
