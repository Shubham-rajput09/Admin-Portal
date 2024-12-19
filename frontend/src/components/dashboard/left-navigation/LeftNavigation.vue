<template>
  <nav id="left-navigation">
  <ProfileSection/>
    <NavigationDropdown/>

  </nav>
</template>

<script>

import ProfileSection from "@/components/dashboard/left-navigation/ProfileSection.vue";
import NavigationDropdown from "@/components/dashboard/left-navigation/NavigationDropdown.vue";

export default {
  name: "LeftNavigation",
  components: {
    ProfileSection,
    NavigationDropdown
  }
};
</script>

<style scoped>
#left-navigation {
background: #fff;
  width: 270px;
  height: 100vh;
}
</style>
