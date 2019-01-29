// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const {
    globInfo
} = require('../globConfig');

const { data, init } = require('gamePlay/gameData')

const {
   setSprite,
   getSprite,
   setSpriteFrame,
   getSpriteFrame,
   setPet,
   getPet,
} = require('../globalStorage');

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
        BarControl: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        init();
        let count = globInfo.beedTypeLists.length + globInfo.petTypeLists.length + data.team.length,
            nowCount = 0;

        for (let i = 0; i < globInfo.beedTypeLists.length; i++) {
            if (!getSprite(globInfo.beedTypeLists[i].type)) {
                cc.loader.loadRes(`images/beeds/${globInfo.beedTypeLists[i].type}`, cc.SpriteFrame,  (err, spriteFrame) => {
                    setSprite(globInfo.beedTypeLists[i].type, {
                        sprite: spriteFrame,
                        color: globInfo.beedTypeLists[i].color
                    });
                    nowCount++;
                    this.BarControl.getComponent(cc.Sprite).fillRange = nowCount / count;
                    if (nowCount === count) {
                        cc.director.loadScene("GameScene");
                    }
                });
            } else {
                nowCount++;
                if (nowCount === count) {
                    cc.director.loadScene("GameScene");
                }
            }
        }

        for (let i = 0; i < data.team.length; i++) {
            if (!getPet(data.team[i].name)) {
                cc.loader.loadRes(`images/pets/small/${data.team[i].name}`, cc.SpriteFrame, (err, spriteFrame) => {
                    setPet(data.team[i].name, {
                        sprite: spriteFrame
                    });
                    nowCount++;
                    this.BarControl.getComponent(cc.Sprite).fillRange = nowCount / count;
                    if (nowCount === count) {
                        cc.director.loadScene("GameScene");
                    }
                });
            } else {
                nowCount++;
                if (nowCount === count) {
                    cc.director.loadScene("GameScene");
                }
            }
        }

        for (let i = 0; i < globInfo.petTypeLists.length; i++) {
            if (!getSpriteFrame(globInfo.petTypeLists[i].mainType + globInfo.petTypeLists[i].secondType)) {
                cc.loader.loadRes(`images/beeds/${globInfo.petTypeLists[i].mainType + globInfo.petTypeLists[i].secondType}Frame`, cc.SpriteFrame, (err, spriteFrame) => {
                    setSpriteFrame(globInfo.petTypeLists[i].mainType + globInfo.petTypeLists[i].secondType, {
                        sprite: spriteFrame,
                        color: globInfo.beedTypeLists[i].color
                    });
                    nowCount++;
                    this.BarControl.getComponent(cc.Sprite).fillRange = nowCount / count;
                    if (nowCount === count) {
                        cc.director.loadScene("GameScene");
                    }
                });
            } else {
                nowCount++;
                if (nowCount === count) {
                    cc.director.loadScene("GameScene");
                }
            }
        }
    },

    // update (dt) {},
});
