/*
 * @Date: 2019-01-09 16:08:41
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-11 02:33:41
*/

const baihu = {
    name: 'baihu'
}

const exchangeBeed = require('../skills/exchangeBeed');

/**
 * @description: 同时消除土、 水、 木三种珠子, 伤害 * 4
 * @param {
 * data: {
 *     beeds: object 处理comb后的转珠统计
 *    combs: number 总comb数
 * }
 * } 
 * @return: {
 *     beeds: object
       combs: number
 *  }
 */
const leaderSkill = function (data) {
    if (data.beeds['tu'] && data.beeds['shui'] && data.beeds['mu']) {
        for (let beed in data.beeds) {
            data.beeds[beed] *= 4
        }
    }
   return data
}

/**
 * @description: 主动技能: 将nai转为tu, jin转为mu, 将huo转为shui
 * @param {
 *  data: {
 *      beedNodes: this.GameLayout.children
 *  }
 * } 
 * @return: void
 */
const castSkill = function (data) {
    exchangeBeed(data.beedNodes, {
        'nai': 'tu',
        'jin': 'mu',
        'huo': 'shui'
    })
}

module.exports = {
    beedSkills: [
        leaderSkill
    ],
    attrSkills: [],
    castSkill: castSkill,
}