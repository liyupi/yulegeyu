// 动物数组
const animals = [
  "/src/public/images/img1.jpg",
  "../src/public/images/img2.jpg",
  "../src/public/images/img3.jpg",
  "../src/public/images/img4.jpg",
  "../src/public/images/img5.jpg",
  "../src/public/images/img6.jpg",
  "../src/public/images/img7.jpg",
  "../src/public/images/img8.jpg",
  "../src/public/images/img9.jpg",
  "../src/public/images/img10.jpg",
  "../src/public/images/img11.jpg",
  "../src/public/images/img12.jpg",
  "../src/public/images/img13.jpg",
  "../src/public/images/img14.jpg",
  "../src/public/images/img15.jpg",
  "../src/public/images/img16.jpg",
  "../src/public/images/img17.jpg",
  "../src/public/images/img18.jpg",
  "../src/public/images/img19.jpg",
  "../src/public/images/img20.jpg",
  "../src/public/images/img21.jpg",
];

export const defaultGameConfig: GameConfigType = {
  // 槽容量
  slotNum: 7,
  // 需要多少个一样块的才能合成
  composeNum: 3,
  // 动物类别数
  typeNum: 12,
  // 每层块数（大致）
  levelBlockNum: 24,
  // 边界收缩步长
  borderStep: 1,
  // 总层数（最小为 2）
  levelNum: 6,
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: [8, 8],
  // 动物数组
  animals,
};

/**
 * 简单难度
 */
export const easyGameConfig: GameConfigType = {
  // 槽容量
  slotNum: 7,
  // 需要多少个一样块的才能合成
  composeNum: 3,
  // 动物类别数
  typeNum: 8,
  // 每层块数（大致）
  levelBlockNum: 10,
  // 边界收缩步长
  borderStep: 1,
  // 总层数（最小为 2）
  levelNum: 6,
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: [4, 4],
  // 动物数组
  animals,
};

/**
 * 中等难度
 */
export const middleGameConfig: GameConfigType = {
  // 槽容量
  slotNum: 7,
  // 需要多少个一样块的才能合成
  composeNum: 3,
  // 动物类别数
  typeNum: 10,
  // 每层块数（大致）
  levelBlockNum: 12,
  // 边界收缩步长
  borderStep: 1,
  // 总层数（最小为 2）
  levelNum: 7,
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: [5, 5],
  // 动物数组
  animals,
};

/**
 * 困难难度
 */
export const hardGameConfig: GameConfigType = {
  // 槽容量
  slotNum: 7,
  // 需要多少个一样块的才能合成
  composeNum: 3,
  // 动物类别数
  typeNum: 12,
  // 每层块数（大致）
  levelBlockNum: 16,
  // 边界收缩步长
  borderStep: 1,
  // 总层数（最小为 2）
  levelNum: 8,
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: [6, 6],
  // 动物数组
  animals,
};

/**
 * 地狱难度
 */
export const lunaticGameConfig: GameConfigType = {
  // 槽容量
  slotNum: 7,
  // 需要多少个一样块的才能合成
  composeNum: 3,
  // 动物类别数
  typeNum: 14,
  // 每层块数（大致）
  levelBlockNum: 20,
  // 边界收缩步长
  borderStep: 2,
  // 总层数（最小为 2）
  levelNum: 10,
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: [8, 8],
  // 动物数组
  animals,
};

/**
 * 天狱难度
 */
export const skyGameConfig: GameConfigType = {
  // 槽容量
  slotNum: 7,
  // 需要多少个一样块的才能合成
  composeNum: 3,
  // 动物类别数
  typeNum: 16,
  // 每层块数（大致）
  levelBlockNum: 24,
  // 边界收缩步长
  borderStep: 2,
  // 总层数（最小为 2）
  levelNum: 12,
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: [8, 8],
  // 动物数组
  animals,
};

/**
 * 羊了个羊难度
 */
export const yangGameConfig: GameConfigType = {
  // 槽容量
  slotNum: 7,
  // 需要多少个一样块的才能合成
  composeNum: 3,
  // 动物类别数
  typeNum: 18,
  // 每层块数（大致）
  levelBlockNum: 28,
  // 边界收缩步长
  borderStep: 3,
  // 总层数（最小为 2）
  levelNum: 15,
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: [8, 8],
  // 动物数组
  animals,
};
