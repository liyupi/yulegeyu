import { defineStore } from "pinia";

const defaultGameConfig = {
  // 槽容量
  slotNum: 7,
  // 需要多少个一样块的才能合成
  composeNum: 3,
  // 动物类别数
  typeNum: 10,
  // 每层块数（大致）
  levelBlockNum: 30,
  // 边界收缩步长
  borderStep: 1,
  // 总层数（最小为 2）
  levelNum: 2,
  // 最上层块数
  topBlockNum: 40,
  // 最下层块数最小值
  minBottomBlockNum: 20,
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: [8, 8],
  // 动物数组
  animals: [
    "🐔",
    "🐟",
    "🦆",
    "🐶",
    "🐱",
    "🐴",
    "🐑",
    "🐦",
    "🐧",
    "🐊",
    "🐺",
    "🐒",
    "🐳",
    "🐬",
    "🐢",
    "🦖",
    "🦒",
    "🦁",
    "🐍",
    "🐭",
    "🐂",
  ],
};

/**
 * 全局状态存储
 *
 * @author yupi
 */
export const useGlobalStore = defineStore("global", {
  state: () => ({
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
    reset() {
      this.$reset();
    },
  },
});
