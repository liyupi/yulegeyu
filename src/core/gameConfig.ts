// <template> <div id="div1"></div> </template>

// 动物数组
const animals = [
	'✂',
	'🤡',
	'🐾',
	'🐝',
	'🎄',
	'🏐',
	'🍔',
	'🍜',
	'🍓',
	'🍦',
	'🍐',
	'🚦',
	'💦',
	'🥐',
	'🍑',
	'🍩',
	'🍋',
	'🍨',
	'🥑',
	'⚽',
	'🧀',
	'🍖',
	'🍭',
	];

// let text = "<div>";
// defaultGameConfig.animals.forEach(myFunk);
// text += "</div>";
// document.getElementById("form_item_animalStr").innerHTML = text;
// const animals = text;
// function myFunk(value) {
//   text += "<img src=" + value + "/>";
// }


// function trImg(arr){
// 	var imgAll = []; //定义一个空数组用于存放转换后的对象
// 		for(var i in arr){
// 			imgAll[i] = new Image();//将新数组的每个对象定义为图片对象
// 			imgAll[i].src = arr[i];//定义图片对象的地址为原数组中的图片地址
// 		}
// 	return imgAll;
// }

// const animals =trImg(animal);

// declare function require(string): string;
// // const i1 = require('../assets/alien.png');
// import img1 from '../assets/alien.png';
// import img2 from '../assets/bee.png';
export const defaultGameConfig: GameConfigType = {
  // 槽容量
  slotNum: 7,
  // 需要多少个一样块的才能合成
  composeNum: 3,
  // 动物类别数
  typeNum: 10,
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
  typeNum: 16,
  // 每层块数（大致）
  levelBlockNum: 24,
  // 边界收缩步长
  borderStep: 3,
  // 总层数（最小为 2）
  levelNum: 15,
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: [8, 8],
  // 动物数组
  animals,
};
