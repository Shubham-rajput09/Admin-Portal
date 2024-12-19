<template>
  <div id="profile-section">
  <div id="profile-section-icon">VD</div>
    <div>
    <div class="user-name">Vanshika Dargan</div>
    <div class="user-type">Vonage Super User</div>
    </div>
  </div>
  <hr class="divider" />
</template>

<script>

export default {
  name: "ProfileSection",
};
</script>

<style scoped>

#profile-section {
  display:flex;

  align-items: center;
  flex-direction: row;
  margin-top: 7px;
  margin-bottom: 1px;
  padding: 10px 12px 0 12px;
  gap: 10px;
}
#profile-section-icon{
  background-color: #9941ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-weight: 600;
  color: #fff;
  font-size: 15px;
}
.user-name{
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  margin-bottom: 2px;
}
.user-type {
  font-size:12px;
  line-height: 16px;
  font-weight: 400;
  opacity: 0.6;
}
.divider{
  border: 0;
  border-top: 1px solid #cccccc;
  width: 246px;
  height: 1px;


}
</style>
