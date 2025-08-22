<template>
  <div class="app-layout">
    <Sidebar />
    <div class="content-area">
      <Topbar />
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  background-color:"#f5f5f5"
}

.content-area {
  flex-grow: 1;
}
</style>
