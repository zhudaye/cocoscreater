/*
 * @Date: 2019-01-02 18:43:27
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-13 03:42:27
 */

let GameData = {
    allBlood: 0, // 总血量
    nowBlood: 0, // 当前血量
    allAddBlood: 0, // 总恢复能力
    beedSkillList: [], // 队长技能对珠子的加强
    attrSkillList: [], // 队长技能直接加属性(攻击， 回复)技能
    paused: false, // 是否暂停
    computing: false,// 是否正在计算
    beedsCount: {}, // 转珠计数
    combsCount: {}, // comb计数
    attackCount: {}, // 攻击计数
    allComb: 0, // 总comb
    team: [
        {
            name: 'baihu', // 宠物名
            leader: true, // 是否是队长
            skill: 'baihu', // 技能
            blood: 1000, // 血量
            attack: 300, // 攻击力
            addBlood: 100, // 血量回复能力
            level: 3, // 等级
            skillCD: 3, // 技能CD
            mainType: 'tu', // 主属性
        },
        {
            name: 'qinglong', // 宠物名
            skill: 'qinglong', // 技能
            blood: 1000, // 血量
            attack: 320, // 攻击力
            addBlood: 120, // 血量回复能力
            level: 3, // 等级
            skillCD: 2, // 技能CD
            mainType: 'mu', // 主属性
        },
        {
            name: 'xuanwu', // 宠物名
            skill: 'xuanwu', // 技能
            blood: 2000, // 血量
            attack: 120, // 攻击力
            addBlood: 100, // 血量回复能力
            level: 3, // 等级
            skillCD: 5, // 技能CD
            mainType: 'shui', // 主属性
        },
        {
            name: 'zhuque', // 宠物名
            skill: 'zhuque', // 技能
            blood: 1000, // 血量
            attack: 320, // 攻击力
            addBlood: 80, // 血量回复能力
            level: 3, // 等级
            skillCD: 5, // 技能CD
            mainType: 'huo', // 主属性
        },
        {
            name: 'xingtian', // 宠物名
            skill: 'xingtian', // 技能
            blood: 1000, // 血量
            attack: 1000, // 攻击力
            addBlood: 80, // 血量回复能力
            level: 3, // 等级
            skillCD: 5, // 技能CD
            mainType: 'jin', // 主属性
        },
        {
            name: 'xingtian', // 宠物名
            leader: true, // 是否是队长
            skill: 'xingtian', // 技能
            blood: 1000, // 血量
            attack: 1000, // 攻击力
            addBlood: 80, // 血量回复能力
            level: 3, // 等级
            skillCD: 5, // 技能CD
            mainType: 'jin', // 主属性
        }
    ]
}

// 初始化数据
const init = function () {
    GameData.team.forEach(ele => {
        GameData.allBlood += ele.blood;
        GameData.allAddBlood += ele.addBlood;
        if (ele.leader) { 
            let leader = require(`${ele.name}`);
            GameData.beedSkillList = GameData.beedSkillList.concat(leader.beedSkills)
            GameData.attrSkillList = GameData.attrSkillList.concat(leader.attrSkills)
        }
    })

    GameData.nowBlood = GameData.allBlood
}

// 设置是否进入计算状态
/**
 * @description: 
 * @param {
 * status: boolen 
 * } 
 * @return: void
 */
const setComputedStatus = function (status) {
    GameData.computing = status
}

// 计算伤害
const computedHurt =  function (data) {
    for (let beed in data.beeds) {
        let beedCount = 0;
        data.beeds[beed].forEach(ele => {
            beedCount += ele.strengthen ? 2 : 1;// 强化过的珠子算两颗
        })
        if (GameData.beedsCount[beed]) {
            GameData.beedsCount[beed] += beedCount
        } else {
            GameData.beedsCount[beed] = beedCount
        }
    }
   
    for (let comb in data.combs) {
        GameData.allComb += data.combs[comb]
        if (GameData.combsCount[comb]) {
            GameData.combsCount[comb] += data.combs[comb]
        } else {
            GameData.combsCount[comb] = data.combs[comb]
        }
    }

    // 这里分开统计各类型珠子的comb * 珠子数量,非同属性comb(总comb-当前属性comb) * 0.8
    for (let comb in GameData.combsCount) {
        GameData.attackCount[comb] = GameData.beedsCount[comb] * (GameData.combsCount[comb] + (GameData.allComb - GameData.combsCount[comb]) * 0.8);
    }

    GameData.attackCount = leaderStrengthen({
        beeds: GameData.attackCount,
        combs: GameData.allComb
    }).beeds;
    console.log(GameData.attackCount)

}

// 队长技能加成(珠子)
const leaderStrengthen = function (data) {
    if (GameData.beedSkillList.length > 0) {
        return  GameData.beedSkillList.reduce((inData, fuc) => {           
            return fuc(inData)
        }, data)
    } else {
        return data
    }
}

// // 队长技能加成(直接)神兽最终伤害
// const leaderAddAttr = function (beeds) {
//     if (GameData.attrSkillList.length > 0) {
//         return GameData.attrSkillList.reduce((data, fuc) => {
//             return fuc(data)
//         }, beeds)
//     } else {
//         return beeds
//     }
// }

//攻击
const attack = function () {
    console.log('attack')
}

module.exports = {
    data: GameData,
    computedHurt: computedHurt,
    init: init,
    attack: attack,
    setComputedStatus: setComputedStatus
}