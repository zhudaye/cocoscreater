/*
 * @Date: 2019-01-08 23:21:27
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-14 17:59:09
 */

const {
    globInfo,
    initScreenSize
} = require('../globConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        GameLayout: {
            default: null,
            type: cc.Node
        },
        Teams: {
            default: null,
            type: cc.Node
        },
        Blood: {
            default: null,
            type: cc.Node
        },
        FightLayout: {
            default: null,
            type: cc.Node
        },
        CombShow: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        initScreenSize();
        this.GameLayout.GamePlay = this;
        this.Teams.GamePlay = this;
        this.GameLayout.setPosition(cc.v2(8-globInfo.screenWidth / 2, 8-globInfo.screenHeight / 2));
        this.CombShow.setPosition(cc.v2(0, (this.CombShow.height - globInfo.screenHeight) / 2));
        this.FightLayout.zIndex = 100;
        this.FightLayout.setPosition(cc.v2( - globInfo.screenWidth / 2,  16 + this.GameLayout.height - globInfo.screenHeight / 2));
    },

    castSkill: function (name) {
        let pet = require(name);
        pet.castSkill({
            beedNodes: this.GameLayout.children
        })
    },
    
    // 神兽伤害计算
    computedHurt: function (data) {
    }

    // update (dt) {},
});
