/*
 * @Date: 2019-01-01 21:45:06
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-11 01:56:20
 */
const {
    data
} = require('gameData');

const {
    getSpriteFrame,
    getPet
} = require('../globalStorage')

let newPetList = [];

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        OnePet: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        data.team.forEach((ele, index) => {
            let newPet = cc.instantiate(this.OnePet);
            // ele.CDCount = ele.skillCD;
            let frameInit = getSpriteFrame(ele.mainType);
            newPet.frame = frameInit.sprite;
            newPet.labelColor = cc.color(frameInit.color);
            newPet.pet= getPet(ele.name).sprite;
            newPet.gameData = ele;
            newPet.attackData = {
                hurt: 0,
                cd: ele.skillCD,
                cdCount: ele.skillCD
            }
            newPet.on('touchstart', function (event) {
                this.node.GamePlay.castSkill(ele.name)
            }, this)
            newPetList.push(newPet);
            newPet.parent = this.node
            newPet.setPosition(cc.v2(60 + 104 * index, 52));
        });
    },

    update (dt) {
        if (data.computing) {
            newPetList.forEach(ele => {
                if (data.attackCount[ele.gameData.mainType]) {
                   ele.attackData.hurt = Math.floor(ele.gameData.attack * data.attackCount[ele.gameData.mainType])
                }
           })
        }
    },
});
