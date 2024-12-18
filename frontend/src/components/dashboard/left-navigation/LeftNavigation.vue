<template>
  <nav id="left-navigation">
  <ProfileSection/>
  </nav>
</template>

<script>

import ProfileSection from "@/components/dashboard/left-navigation/ProfileSection.vue";

export default {
  name: "LeftNavigation",
  components: {ProfileSection}
};
</script>

<style scoped>
#left-navigation {
background: #fff;
  width: 270px;
  height: 100vh;
}
</style>
