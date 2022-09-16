<template>
  <div id="gamePage">
    <a-button style="margin-bottom: 8px" @click="doBack"> 返回</a-button>
    <a-row align="center">
      <!-- 胜利 -->
      <div v-if="gameStatus === 3" style="text-align: center">
        <h2>恭喜，你赢啦！🎉</h2>
        <img src="../assets/kunkun.png" />
      </div>
      <!-- 分层选块 -->
      <div class="level-board">
        <div
          v-for="(block, idx) in levelBlocksVal"
          v-show="gameStatus > 0"
          :key="idx"
          class="block level-block"
          :class="{ disabled: block.lowerThanBlocks.length > 0 }"
          :data-id="block.id"
          :style="{
            zIndex: 100 + block.level,
            left: block.x * widthUnit + 'px',
            top: block.y * heightUnit + 'px',
          }"
          @click="(e) => doClickBlock(block, e)"
        >
          {{ block.type }}
        </div>
      </div>
      <!-- 随机选块 -->
      <div class="random-board">
        <div
          v-for="(randomBlock, index) in randomBlocksVal"
          :key="index"
          class="random-area"
        >
          <div
            v-if="randomBlock.length > 0"
            class="block"
            @click="(e) => doClickBlock(randomBlock[0], e, index)"
          >
            {{ randomBlock[0].type }}
          </div>
          <div
            v-for="num in Math.max(randomBlock.length - 1, 0)"
            :key="num"
            class="block disabled"
          ></div>
        </div>
      </div>
      <!-- 槽位 -->
      <div v-if="slotAreaVal.length > 0" class="slot-board">
        <div
          v-for="(slotBlock, index) in slotAreaVal"
          :key="index"
          class="block"
        >
          {{ slotBlock?.type }}
        </div>
      </div>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import useGame from "../core/game";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const {
  gameStatus,
  levelBlocksVal,
  randomBlocksVal,
  slotAreaVal,
  widthUnit,
  heightUnit,
  doClickBlock,
  doStart,
} = useGame();

/**
 * 回上一页
 */
const doBack = () => {
  router.back();
};

onMounted(() => {
  doStart();
});
</script>

<style scoped>
.level-board {
  position: relative;
}

.level-block {
  position: absolute;
}

.random-board {
  margin-top: 8px;
}

.random-area {
  margin-top: 8px;
}

.slot-board {
  margin-top: 24px;
  border: 10px solid saddlebrown;
}

.block {
  font-size: 28px;
  width: 42px;
  height: 42px;
  line-height: 42px;
  border: 1px solid #eee;
  background: white;
  text-align: center;
  vertical-align: top;
  display: inline-block;
}

.disabled {
  background: grey;
  cursor: not-allowed;
}
</style>
