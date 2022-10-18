<template>
  <div id="gamePage">
    <a-row align="space-between">
      <a-button style="margin-bottom: 8px" @click="doBack"> Back</a-button>
      <a-button>块数：{{ clearBlockNum }} / {{ totalBlockNum }}</a-button>
    </a-row>
    <!-- 胜利 -->
    <a-row align="center">
      <div v-if="gameStatus === 3" style="text-align: center">
        <h2>You win!</h2>
        <img alt="For traching" src="../assets/kunkun.png" />
        <my-ad style="margin-top: 16px" />
      </div>
    </a-row>
    <!-- 分层选块 -->
    <a-row align="center">
      <div v-show="gameStatus > 0" class="level-board">
        <div v-for="(block, idx) in levelBlocksVal" :key="idx">
          <div
            v-if="block.status === 0"
            class="block level-block"
            :class="{
              disabled: !isHolyLight && block.lowerThanBlocks.length > 0,
            }"
            :data-id="block.id"
            :style="{
              zIndex: 100 + block.level,
              left: block.x * widthUnit + 'px',
              top: block.y * heightUnit + 'px',
            }"
            @click="() => doClickBlock(block)"
          >
            <img :src="block.type" alt=""/>
            <!--{{ block.type }}-->
          </div>
        </div>
      </div>
    </a-row>
    <!-- 随机选块 -->
    <a-row align="space-between" class="random-board">
      <div
        v-for="(randomBlock, index) in randomBlocksVal"
        :key="index"
        class="random-area"
      >
        <div
          v-if="randomBlock.length > 0"
          :data-id="randomBlock[0].id"
          class="block"
          @click="() => doClickBlock(randomBlock[0], index)"
        >
          <img :src="randomBlock[0].type" alt=""/>
        </div>
        <!-- 隐藏 -->
        <div
          v-for="num in Math.max(randomBlock.length - 1, 0)"
          :key="num"
          class="block disabled"
        >
          <span v-if="canSeeRandom">
            <img :src="randomBlock[num].type" alt=""/>
          </span>
        </div>
      </div>
    </a-row>
    <!-- 槽位 -->
    <a-row v-if="slotAreaVal.length > 0" align="center" class="slot-board">
      <div v-for="(slotBlock, index) in slotAreaVal" :key="index" class="block">
        <img :src = "slotBlock?.type" alt=""/>
      </div>
    </a-row>
    <!-- 技能 -->
    <div class="skill-board">
      <a-space>
        <a-button size="small" @click="doRevert">Revert</a-button>
        <a-button size="small" @click="doRemove">Remove</a-button>
        <a-button size="small" @click="doShuffle">Shuffle</a-button>
        <a-button size="small" @click="doBroke">Broke</a-button>
        <a-button size="small" @click="doHolyLight">Holylight</a-button>
        <a-button size="small" @click="doSeeRandom">See hidden</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGame from "../core/game";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import MyAd from "../components/MyAd.vue";

const router = useRouter();

const {
  gameStatus,
  levelBlocksVal,
  randomBlocksVal,
  slotAreaVal,
  widthUnit,
  heightUnit,
  totalBlockNum,
  clearBlockNum,
  isHolyLight,
  canSeeRandom,
  doClickBlock,
  doStart,
  doShuffle,
  doBroke,
  doRemove,
  doRevert,
  doHolyLight,
  doSeeRandom,
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
  border: 10px solid saddlebrown;
  margin: 16px auto;
  width: fit-content;
}

.skill-board {
  text-align: center;
}

.block {
  font-size: 28px;
  width: 42px;
  height: 42px;
  line-height: 42px;
  border: 1px solid rgb(139, 69, 19);
  background: white;
  text-align: center;
  vertical-align: top;
  display: inline-block;
}

img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    filter: saturate(130%);
}



.disabled {
  background: grey;
  cursor: not-allowed;
  filter: grayscale(100%) brightness(55%);
}


</style>
