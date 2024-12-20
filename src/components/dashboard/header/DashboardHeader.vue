<template>
  <div class="black-bar">
    <!-- Vonage Icon -->
    <div>
      <img
        src="../../../assets/vonage-icon.jpg"
        alt="Notification Icon"
        class="notification-icon"
      />
    </div>
    <!--Help Button -->
    <button id="help">
      <img
        src="../../../assets/icn-help.svg"
        alt="Help Icon"
        class="help-icon"
      />Help
    </button>
    <!--Visit Store Button -->
    <button id="visitstore">
      <img
        src="../../../assets/visitstore.svg"
        alt="Visit Store"
        class="visit-store"
      />Visit Store
    </button>
  </div>
</template>

<!--Export makes Vue Component Available To other Parts Of The Application-->
<script>
export default {
  name: 'DashboardHeader',
};
</script>

<style scoped>
.black-bar {
  width: 100vw; /* Full width of the container */
  height: 70px; /* Adjust this value for thickness */
  background-color: #070000; /* Black color */
  bottom: 0.1rem;
  left: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: -webkit-left;
  color: #ffffff;
  margin-top: 16px;
  margin-left: 15px;
  font-size: 20px;
}
#help {
  position: absolute; /* Position the button */
  right: 180px; /* Place it 100px from the right edge */
  top: 50%; /* Vertically center it relative to the parent */
  transform: translateY(-50%); /* Correct vertical alignment */
  background-color: #070000; /* Button background color */
  color: #ffffff; /* Button text color */
  border: 2px solid white; /* Add a thicker white border */
  padding: 5px; /* Increase padding for a larger button */
  border-radius: 8px; /* Rounded corners */
  font-size: 18px; /* Increase font size for "Help" text */
  font-weight: normal; /* Make the text bold */
  cursor: pointer;
  width: 7rem;
  height: 2.5rem;

  display: flex; /* Enables flexbox layout */
  align-items: center; /* Centers text vertically */
  justify-content: center; /* Pointer cursor for better UX */
}

#visitstore {
  position: absolute; /* Position the button */
  right: 18px; /* Place it 100px from the right edge */
  top: 50%; /* Vertically center it relative to the parent */
  transform: translateY(-50%); /* Correct vertical alignment */
  background-color: #070000; /* Button background color */
  color: #ffffff; /* Button text color */
  border: 2px solid white; /* Add a thicker white border */
  padding: 5px; /* Increase padding for a larger button */
  border-radius: 8px; /* Rounded corners */
  font-size: 18px; /* Increase font size for "Help" text */
  font-weight: normal; /* Make the text bold */
  cursor: pointer;
  width: 9rem;
  margin-left: 10px;
  height: 2.5rem;

  display: flex; /* Enables flexbox layout */
  align-items: center; /* Centers text vertically */
  justify-content: center; /* Pointer cursor for better UX */
}
#visitstore .visit-store {
  width: 20px; /* Set width for the icon */
  height: auto; /* Maintain aspect ratio */
  margin-right: 8px;
  filter: invert(100%);
}

#help .help-icon {
  width: 20px; /* Set width for the icon */
  height: auto; /* Maintain aspect ratio */
  margin-right: 8px;
  filter: invert(100%); /* Space between the icon and text */
}

.notification-icon {
  width: 150px; /* Adjust size of the icon */
  height: auto;
  margin-right: 10px;
  filter: invert(100%); /* Space between the icon and VONAGE text */
}
</style>
