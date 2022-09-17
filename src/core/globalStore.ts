import { defineStore } from "pinia";
import { defaultGameConfig } from "./gameConfig";

/**
 * 全局状态存储
 *
 * @author yupi
 */
export const useGlobalStore = defineStore("global", {
  state: () => ({
    customConfig: { ...defaultGameConfig },
    gameConfig: { ...defaultGameConfig },
  }),
  getters: {},
  // 持久化
  persist: {
    key: "global",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load globalStore data start");
    },
    afterRestore: (context) => {
      console.log("load globalStore data end");
    },
  },
  actions: {
    setGameConfig(gameConfig: GameConfigType) {
      this.gameConfig = gameConfig;
    },
    setCustomConfig(customConfig: GameConfigType) {
      this.customConfig = customConfig;
    },
    reset() {
      this.$reset();
    },
  },
});
