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
  padding: 16px 16px 50px;
  background: url("assets/bg.jpeg");
  min-height: 100vh;
  background-size: 100% 100%;
}
</style>
