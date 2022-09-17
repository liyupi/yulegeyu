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
  // 放到当前格子里的块（层级越高下标越大）
  blocks: BlockType[];
}

/**
 * 游戏配置类型
 */
interface GameConfigType {
  // 槽容量
  slotNum: number;
  // 需要多少个一样块的才能合成
  composeNum: number;
  // 动物类别数
  typeNum: number;
  // 每层块数（大致）
  levelBlockNum: number;
  // 边界收缩步长
  borderStep: number;
  // 总层数（最小为 2）
  levelNum: number;
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: number[];
  // 动物数组
  animals: string[];
  // 最上层块数（已废弃）
  // topBlockNum: 40,
  // 最下层块数最小值（已废弃）
  // minBottomBlockNum: 20,
}

/**
 * 技能类型
 */
interface SkillType {
  name: string;
  desc: string;
  icon: string;
  action: function;
}
