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
      地域模式
    </a-button>
    <a-button block style="margin-bottom: 16px" disabled @click="toGamePage">
      自定义（暂未开放）
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  easyGameConfig,
  middleGameConfig,
  hardGameConfig,
  lunaticGameConfig,
} from "../core/gameConfig";
import { useGlobalStore } from "../core/globalStore";

const router = useRouter();

const { setGameConfig } = useGlobalStore();

const toGamePage = (config?: GameConfig) => {
  if (config) {
    setGameConfig(config);
  }
  router.push("/game");
};
</script>

<style scoped>
#indexPage {
  text-align: center;
}
</style>
