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
