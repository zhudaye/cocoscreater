/*
 * @Date: 2019-01-13 03:33:58
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-13 03:50:20
 */

const {
   data
} = require('gameData')
cc.Class({
    extends: cc.Component,

    properties: {
        BloodIn: {
            default: null,
            type: cc.Node
        },
        BloodNumber: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.BloodIn.getComponent(cc.Sprite).fillRange = data.nowBlood / data.allBlood;
        this.BloodNumber.getComponent(cc.Label).string = `${data.nowBlood} / ${data.allBlood}`;
    },

    update (dt) {

    },
});
