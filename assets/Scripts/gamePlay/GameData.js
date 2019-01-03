/*
 * @Date: 2019-01-02 18:43:27
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-03 16:32:14
 */

let GameData = {
    allBlood: 0, // 总血量
    allAddBlood: 0, // 总恢复能力
    beedList: [], // 队长技能对珠子的加强
    attrList: [], // 队长技能直接加属性(攻击， 回复)技能
    team: [
        {
            name: 'baihu', // 宠物名
            leader: true, // 是否是队长
            skill: 'baihu', // 技能
            leaderSkills: [
                {
                type: 'beed', 
                name: 'baihu'
                }
            ],
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
            attack: 320, // 攻击力
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
            attack: 320, // 攻击力
            addBlood: 80, // 血量回复能力
            level: 3, // 等级
            skillCD: 5, // 技能CD
            leaderSkills: [
                { 
                   type: 'attr',
                   name: 'xingtian'
                }
            ],
            mainType: 'jin', // 主属性
        }
    ]
}

const init = function () {
    GameData.team.forEach(ele => {
        GameData.allBlood += ele.blood;
        GameData.allAddBlood += ele.addBlood;
        if (ele.leader) {
            ele.leaderSkills.map.forEach(item => {
               GameData[`${item.type}List`].push(ele.name)
            })
        }
    })
}

module.exports = {
    data: GameData,
    init: init
}