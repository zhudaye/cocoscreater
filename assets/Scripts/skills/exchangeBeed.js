/*
 * @Date: 2019-01-02 18:56:23
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-12 16:27:47
 */

/**
 * @description: 把一种转珠转为另一种转珠
 * @param {
 *    nodeList: [] 转珠对象列表
 *    changeList: {key: value} 需要转换的转珠,key: 原转珠类型，value: 目标类型
 * } 
 * @return: void
 */
const {
    getSprite
} = require('../globalStorage');

module.exports = function (nodeList, changeList) {
    nodeList.forEach(ele => {
        if (changeList[ele.beedType]) {
            ele.beedType = changeList[ele.beedType];
            ele.strengthen = false;
            ele.getComponent(cc.Sprite).spriteFrame = getSprite(ele.beedType).sprite;
        }
    })
}