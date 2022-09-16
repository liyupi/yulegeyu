<template>
  <div id="app">
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      鱼了个鱼 ©2022 by
      <a href="https://github.com/liyupi" target="_blank" style="color: #fff">
        程序员鱼皮
      </a>
      |
      <a
        href="https://github.com/liyupi/yulegeyu"
        target="_blank"
        style="color: #fff"
      >
        代码开源
      </a>
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

.footer {
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 12px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
