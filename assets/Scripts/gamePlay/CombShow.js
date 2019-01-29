/*
 * @Date: 2019-01-09 15:02:26
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-10 15:44:50
 */

const {
    data,
    attack
} = require('gameData');

let combing = false,
count = 0,
lockCount = false;
cc.Class({
    extends: cc.Component,

    properties: {
        CombNumber: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.runAction(cc.fadeOut(0));
        this.node.zIndex = 0;
    },

    start () {
        this.node.on('touchstart', function (event) {
        })
    },

    update (dt) {
        if (count < data.allComb) {
            if (lockCount) {
                return 
            }
            lockCount = true;
            this.CombNumber.stopAllActions();
            this.CombNumber.runAction(
                cc.sequence(
                    cc.spawn(
                        cc.moveTo(0, cc.v2(0, -60)),
                        cc.scaleTo(0, 0.5),
                        cc.fadeOut(0)
                    ), cc.callFunc((target) => {
                        count++;
                        this.CombNumber.getComponent(cc.Label).string = count + ' comb';
                        this.CombNumber.runAction(cc.sequence(
                            cc.spawn(
                                cc.moveTo(0.2, cc.v2(0, 0)).easing(cc.easeOut(3.0)),
                                cc.scaleTo(0.2, 1).easing(cc.easeOut(3.0)),
                                cc.fadeIn(0.2).easing(cc.easeOut(3.0))
                            ),
                            cc.callFunc((target) => {
                                lockCount = false;
                            })
                        ))
                    })
                )
            )
        }
        
        if (data.computing) {
            this.node.zIndex = 1000;
            if (!combing) {
                this.node.stopAllActions()
                this.node.runAction(cc.fadeIn(0));
                combing = true;
            }
        } else {
            if (count === data.allComb && combing) {
                combing = false;
                this.scheduleOnce(() => {
                    this.node.zIndex = 0;
                    this.CombNumber.getComponent(cc.Label).string = '';
                    this.node.stopAllActions();
                    this.node.runAction(cc.fadeOut(0));
                    attack();
                }, 0.2);
            }
        }
    },
});
