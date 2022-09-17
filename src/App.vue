<template>
  <div id="app">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
#app {
  background: url("assets/bg.jpeg");
  padding: 16px 16px 50px;
  min-height: 100vh;
  background-size: 100% 100%;
}

.content {
  max-width: 480px;
  margin: 0 auto;
}
</style>
