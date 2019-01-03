let {
  beedTypeLists
} = require('globConfig');

/**
 * @description: 随机产生转珠类型
 * @param {
 *    filterBeedX: string x方向过滤类型
 *    filterBeedY: string y方向过滤类型
 * } 
 * @return: string 生成的转珠类型
 */
const createBeed = function (filterBeedX = undefined, filterBeedY = undefined) {
    let beedArray = beedTypeLists.filter(ele => ((ele !== filterBeedX) && (ele !== filterBeedY)));
    let random = Math.random();
    return beedArray[Math.ceil(random ? random * beedArray.length : 1) - 1] // 种子
}

module.exports = {
    createBeed: createBeed
}

