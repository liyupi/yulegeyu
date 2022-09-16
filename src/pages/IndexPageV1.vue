<template>
  <div id="indexPage">
    <a-row align="center">
      <a-button
        type="primary"
        block
        style="margin-bottom: 16px"
        @click="doStart"
      >
        开始
      </a-button>
      <!-- 分层选块 -->
      <div class="level-board">
        <div
          v-for="(levelBlock, index) in levelBlocksVal"
          :key="index"
          class="level"
        >
          <div
            v-for="(block, idx) in levelBlock"
            v-show="gameStatus > 0"
            :key="idx"
            class="block level-block"
            :class="{ disabled: block.lowerThanBlocks.length > 0 }"
            :data-id="block.id"
            :style="{ zIndex: 10000 - index }"
            @click="(e) => doClickBlock(block, e)"
          >
            {{ block.type }}
          </div>
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
import { useGlobalStore } from "../core/globalStore";
// @ts-ignore
import _ from "lodash";
import { nextTick, ref } from "vue";

const { gameConfig } = useGlobalStore();

// 游戏状态：0 - 初始化, 1 - 进行中, 2 - 结束
const gameStatus = ref(0);

// 各层块
const levelBlocksVal = ref<BlockType[][]>([]);
// 随机区块
const randomBlocksVal = ref<BlockType[][]>([]);
// 插槽区
const slotAreaVal = ref<BlockType[]>([]);
// 当前槽占用数
const currSlotNum = ref(0);

/**
 * 块类型
 */
interface BlockType {
  id: number;
  x: number;
  y: number;
  level: number;
  type: string;
  // 0 - 正常, 1 - 已点击, 2 - 已消除
  status: 0 | 1 | 2;
  // 压住的其他块
  higherThanBlocks: BlockType[];
  // 被哪些块压住（为空表示可点击）
  lowerThanBlocks: BlockType[];
}

/**
 * 每个格子单元类型
 */
interface ChessBoardUnitType {
  // 放到当前格子里的块（层级越高下标越小）
  blocks: BlockType[];
}

// 保存所有块（包括随机块）
const blockData: Record<number, BlockType> = {};

// 总共划分 24 x 24 的格子，每个块占 3 x 3 的格子，生成的起始 x 和 y 坐标范围均为 0 ~ 21
const boxWidthNum = 24;
const boxHeightNum = 24;

// 保存整个 "棋盘" 的每个格子状态（下标为格子起始点横纵坐标）
let chessBoard: ChessBoardUnitType[][] = [];

/**
 * 初始化指定大小的棋盘
 * @param width
 * @param height
 */
const initChessBoard = (width: number, height: number) => {
  chessBoard = new Array(width);
  for (let i = 0; i < width; i++) {
    chessBoard[i] = new Array(height);
    for (let j = 0; j < height; j++) {
      chessBoard[i][j] = {
        blocks: [],
      };
    }
  }
};

// 初始化棋盘
initChessBoard(boxWidthNum, boxHeightNum);

/**
 * 游戏初始化
 */
const initGame = () => {
  console.log("initGame", gameConfig);

  // 1. 规划块数
  // 块数单位（总块数必须是该值的倍数）
  const blockNumUnit = gameConfig.composeNum * gameConfig.typeNum;
  console.log("块数单位", blockNumUnit);

  // 随机生成的总块数
  const totalRandomBlockNum = gameConfig.randomBlocks.reduce((pre, curr) => {
    return pre + curr;
  }, 0);
  console.log("随机生成的总块数", totalRandomBlockNum);

  // 需要的最小块数
  const minBlockNum = Math.ceil(
    (gameConfig.levelNum *
      (gameConfig.topBlockNum + gameConfig.minBottomBlockNum)) /
      2 +
      totalRandomBlockNum
  );
  console.log("需要的最小块数", minBlockNum);

  // 补齐到 blockNumUnit 的倍数
  // e.g. minBlockNum = 14, blockNumUnit = 6, 补到 18
  let totalBlockNum = minBlockNum;
  if (totalBlockNum % blockNumUnit !== 0) {
    totalBlockNum = (Math.floor(minBlockNum / blockNumUnit) + 1) * blockNumUnit;
  }
  console.log("总块数", totalBlockNum);

  // 2. 随机生成块
  // 保存所有块的数组
  const animalBlocks: string[] = [];
  // 需要用到的动物数组
  const needAnimals = gameConfig.animals.slice(0, gameConfig.typeNum);
  // 依次把块塞到数组里
  for (let i = 0; i < totalBlockNum; i++) {
    animalBlocks.push(needAnimals[i % gameConfig.typeNum]);
  }
  // 打乱数组
  const randomAnimalBlocks = _.shuffle(animalBlocks);
  // 下一个要塞入的块
  let pos = 0;

  // 3. 填充结果
  // 计算随机生成的块
  const randomBlocks: BlockType[][] = [];
  gameConfig.randomBlocks.forEach((randomBlock, idx) => {
    randomBlocks[idx] = [];
    for (let i = 0; i < randomBlock; i++) {
      const newBlock = {
        id: pos,
        level: i,
        status: 0,
        type: randomAnimalBlocks[pos],
        higherThanBlocks: [] as BlockType[],
        lowerThanBlocks: [] as BlockType[],
      } as BlockType;
      randomBlocks[idx].push(newBlock);
      blockData[pos] = newBlock;
      pos++;
    }
  });
  // 剩余块数
  let leftBlockNum = totalBlockNum - totalRandomBlockNum;

  // 计算每层生成的块数
  // 每层递减块数
  // e.g. 最上层 38 块，最下层不小于 20 块，共 10 层，则每层递减块数为 18 / 9 = 2
  const stepNum = Math.floor(
    (gameConfig.topBlockNum - gameConfig.minBottomBlockNum) /
      (gameConfig.levelNum - 1)
  );
  console.log("每层递减块数", stepNum);

  // 下一层要分配的块数
  let nextBlockNum = gameConfig.topBlockNum;
  // 各层的块
  const levelBlocks: BlockType[][] = [];
  for (let i = 0; i < gameConfig.levelNum; i++) {
    // 最后一层，所有的块都分配出去
    if (i == gameConfig.levelNum - 1) {
      nextBlockNum = leftBlockNum;
    }
    levelBlocks[i] = [];
    // 添加新块
    for (let j = 0; j < nextBlockNum; j++) {
      if (pos >= totalBlockNum) {
        break;
      }
      const newBlock = {
        id: pos,
        level: i,
        status: 0,
        type: randomAnimalBlocks[pos],
        higherThanBlocks: [] as BlockType[],
        lowerThanBlocks: [] as BlockType[],
      } as BlockType;
      levelBlocks[i].push(newBlock);
      blockData[pos] = newBlock;
      pos++;
    }
    leftBlockNum -= nextBlockNum;
    nextBlockNum -= stepNum;
  }
  console.log("剩余块数", leftBlockNum);

  // 4. 初始化空插槽
  const slotArea: BlockType[] = new Array(gameConfig.slotNum).fill(null);

  console.log(
    "各层数量",
    levelBlocks
      .map((levelBlock, idx) => `第${idx}层：${levelBlock.length} 块`)
      .join("\n")
  );
  console.log("随机块情况", randomBlocks);

  return {
    levelBlocks,
    randomBlocks,
    slotArea,
  };
};

/**
 * 随机生成块坐标
 */
const randomPos = () => {
  const levelBoardDom: any = document.getElementsByClassName("level-board");
  // 为方便给格子设置固定宽高，不动态计算了
  // const totalWidth = levelBoardDom[0].clientWidth;
  const blockDomList = document.getElementsByClassName("level-block");
  // 每个格子的宽高
  const widthUnit = 14;
  const heightUnit = 14;
  // 设置父容器宽高
  levelBoardDom[0].style.width = widthUnit * boxWidthNum + "px";
  levelBoardDom[0].style.height = heightUnit * boxHeightNum + "px";
  // 遍历时层级递增
  for (let i = 0; i < blockDomList.length; i++) {
    let blockDom: any = blockDomList[i];
    const blockId = blockDom.dataset.id;
    const block = blockData[blockId];
    blockDom.style.position = "absolute";
    // 随机生成坐标，当前层级不能重复
    let newPosX;
    let newPosY;
    while (true) {
      newPosX = Math.floor(Math.random() * (boxWidthNum - 2));
      newPosY = Math.floor(Math.random() * (boxHeightNum - 2));
      const currChessBoardUnit = chessBoard[newPosX][newPosY];
      // 同层级元素不能完全重叠
      if (
        currChessBoardUnit.blocks.length < 1 ||
        currChessBoardUnit.blocks[currChessBoardUnit.blocks.length - 1].level !=
          block.level
      ) {
        break;
      }
    }
    chessBoard[newPosX][newPosY].blocks.push(block);
    block.x = newPosX;
    block.y = newPosY;
    blockDom.style.left = newPosX * widthUnit + "px";
    blockDom.style.top = newPosY * heightUnit + "px";
  }
};

// 可能导致死循环，暂不使用
// /**
//  * 判断某个坐标是否和其他块有重叠
//  * @param x
//  * @param y
//  * @param block
//  */
// const hasOverlap = (x: number, y: number, block: BlockType) => {
//   // 确定该块附近的格子坐标范围
//   const minX = Math.max(x - 2, 0);
//   const minY = Math.max(y - 2, 0);
//   const maxX = Math.min(x + 3, boxWidthNum - 2);
//   const maxY = Math.min(y + 3, boxWidthNum - 2);
//   // 遍历该块附近的格子
//   for (let i = minX; i < maxX; i++) {
//     for (let j = minY; j < maxY; j++) {
//       const relationBlocks = chessBoard[i][j].blocks;
//       for (const relationBlock of relationBlocks) {
//         if (relationBlocks[relationBlocks.length - 1].level != block.level) {
//           return false;
//         }
//       }
//     }
//   }
//   return true;
// };

/**
 * 绑定层级覆盖关系（用于确认哪些元素是当前可点击的）
 *
 * 核心逻辑：每个块压住和其坐标有交集棋盘格内所有 level 大于它的点，双向建立联系
 */
const bindLevelRelation = () => {
  levelBlocksVal.value.forEach((levelBlock) => {
    levelBlock.forEach((block) => {
      const x = block.x;
      const y = block.y;
      // 确定该块附近的格子坐标范围
      const minX = Math.max(x - 2, 0);
      const minY = Math.max(y - 2, 0);
      const maxX = Math.min(x + 3, boxWidthNum - 2);
      const maxY = Math.min(y + 3, boxWidthNum - 2);
      // 遍历该块附近的格子
      for (let i = minX; i < maxX; i++) {
        for (let j = minY; j < maxY; j++) {
          const relationBlocks = chessBoard[i][j].blocks;
          relationBlocks.forEach((relationBlock) => {
            // 建立覆盖关系
            if (relationBlock.level > block.level) {
              block.higherThanBlocks.push(relationBlock);
              relationBlock.lowerThanBlocks.push(block);
            }
          });
        }
      }
    });
  });
};

/**
 * 开始游戏
 */
const doStart = () => {
  gameStatus.value = 0;
  const { levelBlocks, randomBlocks, slotArea } = initGame();
  console.log(levelBlocks, randomBlocks, slotArea);
  levelBlocksVal.value = levelBlocks;
  randomBlocksVal.value = randomBlocks;
  slotAreaVal.value = slotArea;
  // 等 dom 更新后才刷新坐标
  nextTick(() => {
    randomPos();
    bindLevelRelation();
    gameStatus.value = 1;
  });
};

/**
 * 点击块事件
 * @param block
 * @param e
 * @param randomIdx 随机区域下标，>= 0 表示点击的是随机块
 */
const doClickBlock = (block: BlockType, e: Event, randomIdx = -1) => {
  // 已经输了 / 已经被点击 / 有上层块，不能再点击
  if (
    currSlotNum.value >= gameConfig.slotNum ||
    block.status !== 0 ||
    block.lowerThanBlocks.length > 0
  ) {
    return;
  }
  // 修改元素状态为已点击
  block.status = 1;
  // 移除当前元素
  if (randomIdx >= 0) {
    // 移除所点击的随机区域的第一个元素
    randomBlocksVal.value[randomIdx] = randomBlocksVal.value[randomIdx].slice(
      1,
      randomBlocksVal.value[randomIdx].length
    );
  } else {
    // 删除节点
    // @ts-ignore
    e.target.remove();
    // 移除覆盖关系
    block.higherThanBlocks.forEach((higherThanBlock) => {
      _.remove(higherThanBlock.lowerThanBlocks, (lowerThanBlock) => {
        return lowerThanBlock.id === block.id;
      });
    });
  }
  // 新元素加入插槽
  let tempSlotNum = currSlotNum.value;
  slotAreaVal.value[tempSlotNum] = block;
  // 检查是否有可消除的
  // block => 出现次数
  const map: Record<string, number> = {};
  // 去除空槽
  const tempSlotAreaVal = slotAreaVal.value.filter((slotBlock) => !!slotBlock);
  tempSlotAreaVal.forEach((slotBlock) => {
    const type = slotBlock.type;
    if (!map[type]) {
      map[type] = 1;
    } else {
      map[type]++;
    }
  });
  console.log("tempSlotAreaVal", tempSlotAreaVal);
  console.log("map", map);
  // 得到新数组
  const newSlotAreaVal = new Array(gameConfig.slotNum).fill(null);
  tempSlotNum = 0;
  tempSlotAreaVal.forEach((slotBlock) => {
    // 成功消除（不添加到新数组中）
    if (map[slotBlock.type] >= gameConfig.composeNum) {
      // 块状态改为已消除
      slotBlock.status = 2;
      return;
    }
    newSlotAreaVal[tempSlotNum++] = slotBlock;
  });
  slotAreaVal.value = newSlotAreaVal;
  currSlotNum.value = tempSlotNum;
  // 游戏结束
  if (tempSlotNum >= gameConfig.slotNum) {
    gameStatus.value = 2;
    setTimeout(() => {
      alert("你输了");
    }, 2000);
  }
};
</script>

<style scoped>
.level-board {
  position: relative;
}

.level {
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
