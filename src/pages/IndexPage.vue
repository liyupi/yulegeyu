<template>
  <div id="indexPage">
    <h1>🐟 鱼了个鱼</h1>
    <div style="margin-bottom: 16px">低配版羊了个羊小游戏，仅供消遣</div>
    <a-button
      block
      style="margin-bottom: 16px"
      @click="toGamePage(easyGameConfig)"
    >
      简单模式
    </a-button>
    <a-button
      block
      style="margin-bottom: 16px"
      @click="toGamePage(middleGameConfig)"
    >
      中等模式
    </a-button>
    <a-button
      block
      style="margin-bottom: 16px"
      @click="toGamePage(hardGameConfig)"
    >
      困难模式
    </a-button>
    <a-button
      block
      style="margin-bottom: 16px"
      @click="toGamePage(lunaticGameConfig)"
    >
      地狱模式
    </a-button>
    <a-button block style="margin-bottom: 16px" @click="toGamePage(null)">
      自定义
    </a-button>
    <a href="https://github.com/liyupi/yulegeyu" target="_blank">
      <div style="background: rgba(0, 0, 0, 0.8); padding: 12px">
        <github-outlined />
        代码完全开源，欢迎 star
      </div>
    </a>
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

<script setup lang="ts">
import { useRouter } from "vue-router";
import { GithubOutlined } from "@ant-design/icons-vue";
import {
  easyGameConfig,
  middleGameConfig,
  hardGameConfig,
  lunaticGameConfig,
} from "../core/gameConfig";
import { useGlobalStore } from "../core/globalStore";

const router = useRouter();

const { setGameConfig } = useGlobalStore();

const toGamePage = (config?: GameConfigType) => {
  if (config) {
    setGameConfig(config);
    router.push("/game");
  } else {
    router.push("/config");
  }
};
</script>

<style scoped>
#indexPage {
  text-align: center;
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
