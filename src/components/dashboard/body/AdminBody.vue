<template>
  <main id="admin-body" class="main">
    <PrimaryButton />
    <SecondaryButton />
    <DropdownComponent />
    <HeadingComponent />
    <TableComponent />
  </main>
</template>

<script>
import TableComponent from '@/components/common/TableComponent.vue';
import HeadingComponent from '@/components/common/HeadingComponent.vue';
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import SecondaryButton from '@/components/common/SecondaryButton.vue';
import DropdownComponent from '@/components/common/DropdownComponent.vue';
export default {
  name: 'AdminBody',
  components: {
    DropdownComponent,
    SecondaryButton,
    PrimaryButton,
    HeadingComponent,
    TableComponent,
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
