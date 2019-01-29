/*
 * @Date: 2019-01-09 16:08:41
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-12 16:29:56
*/

const xintian = {
    name: 'xingtian'
}

const leaderSkill = function (data) {
   console.log('xingtian')
   return data
}

/**
 * @description: 主动技能: 强化金珠
 * @param {
 *  data: {
 *      beedNodes: this.GameLayout.children
 *  }
 * } 
 * @return: void
 */
const castSkill = function (data) {
   data.beedNodes.forEach(ele => {
        if (ele.beedType === 'jin') {
           ele.strengthen = true;
        }
   });
}

module.exports = {
    beedSkills: [
        leaderSkill
    ],
    attrSkills: [],
    castSkill: castSkill,
}