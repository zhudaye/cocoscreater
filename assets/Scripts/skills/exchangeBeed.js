/*
 * @Date: 2019-01-02 18:56:23
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-02 22:40:43
 */

/**
 * @description: 把一种转珠转为另一种转珠
 * @param {
 *    nodeList: [] 转珠对象列表
 *    changeList: {key: value} 需要转换的转珠,key: 原转珠类型，value: 目标类型
 * } 
 * @return: void
 */
module.exports = function (nodeList, changeList) {
    nodeList.map(ele => {
        if (changeList[ele.beedType]) {
            ele.beedType = changeList[ele.beedType]
            cc.loader.loadRes(`images/beeds/${ele.beedType}`, cc.SpriteFrame, function (err, spriteFrame) {
                ele.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
    })
}