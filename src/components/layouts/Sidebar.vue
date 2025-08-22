<template>
  <div class="sidebar bg-gray-100 h-screen w-72 p-6 flex flex-col">
    <!-- Logo Section -->
    <div class="logo-container flex items-center gap-4 mb-10">
      <img
        src="../../assets/fav.png"
        alt="NailSalon Logo"
        class="logo-img w-12 h-12 object-contain"
      />
      <h2 class="text-black text-2xl font-bold">NailSalon.club</h2>
    </div>

    <!-- Sidebar Navigation -->
    <ul class="list-none p-0">
      <li class="mb-6">
        <router-link
          to="/home"
          class="flex items-center text-black text-lg hover:text-blue-600"
        >
          <i class="pi pi-home mr-4 text-2xl"></i> Home
        </router-link>
      </li>
      <li class="mb-6">
        <router-link
          to="/settings"
          class="flex items-center text-black text-lg hover:text-blue-600"
        >
          <i class="pi pi-cog mr-4 text-2xl"></i> Settings
        </router-link>
      </li>
      <li class="mb-6">
        <router-link
          to="/business"
          class="flex items-center text-black text-lg hover:text-blue-600"
        >
          <i class="pi pi-briefcase mr-4 text-2xl"></i> Business
        </router-link>
      </li>
      <li class="mb-6">
        <router-link
          to="/banners"
          class="flex items-center text-black text-lg hover:text-blue-600"
        >
          <i class="pi pi-image mr-4 text-2xl"></i> Banners
        </router-link>
      </li>
      <li class="mb-6">
        <router-link
          to="/privacy-policy"
          class="flex items-center text-black text-lg hover:text-blue-600"
        >
          <i class="pi pi-lock mr-4 text-2xl"></i> Privacy Policy
        </router-link>
      </li>
      <li class="mb-6">
        <router-link
          to="/terms-and-conditions"
          class="flex items-center text-black text-lg hover:text-blue-600"
        >
          <i class="pi pi-book mr-4 text-2xl"></i> Terms and Conditions
        </router-link>
      </li>
    </ul>

    <!-- User Info Section -->
    <div class="user-info flex items-center mt-auto text-sm text-gray-600"></div>
      
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.sidebar {
  width: 250px; /* Set fixed width for sidebar */
  background-color: #f5f5f5;
  color: black;
  height: 97vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}
.logo-img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}
.sidebar h2 {
  color: black;
  font-size: 20px;
  margin: 0;
}
.sidebar ul {
  list-style-type: none;
  padding-left: 0;
}
.sidebar ul li {
  margin: 20px 0;
}
.sidebar ul li a {
  color: black;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.sidebar ul li a i {
  margin-right: 10px; /* Space between icon and text */
  font-size: 18px;
}
.sidebar ul li a:hover {
  text-decoration: underline;
}
</style>
