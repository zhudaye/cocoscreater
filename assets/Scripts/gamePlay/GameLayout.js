// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
let activeNode = null, // 当前正在移动的节点
    lockMove = false, // 是否正在移动转珠
    inComputed = false, // 正在计算伤害
    paused = false, // 暂停
    anchorOffsetX = 52, // 锚点偏移
    anchorOffsetY = 52, // 锚点偏移
    offsetX = 8, //x轴偏移量 
    offsetY = 8, //y轴偏移量
    width = 104, // 宝石宽度
    height = 104, // 宝石高度
    xNumber = 6, // x方向转珠数
    yNumber = 5; // y 方向转珠数

let {
    createBeed
} = require('../util')

cc.Class({
    extends: cc.Component,
    properties: {
        target: {
            default: null,
            type: cc.Prefab,
        },
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
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        let data = this.createBeedLists();
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                let newNode = cc.instantiate(this.target);
                cc.loader.loadRes(`images/beeds/${data[i][j].type}`, cc.SpriteFrame, function (err, spriteFrame) {
                    newNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                newNode.beedType = data[i][j].type;
                newNode.idX = i;
                newNode.idY = j;
                newNode.zIndex = 2;
                newNode.parent = this.node;
                // newNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(`resources/images/beeds/${data[i][j].type}.png`));
                // console.log(cc.v2(55 * j, 55 * i));
                newNode.setPosition(cc.v2(anchorOffsetX + width * i, anchorOffsetY + height * j));
            }
        }
        this.addEvent()
    },

    // 初始生成转珠列表
    createBeedLists: function () {
        let countTypeX = undefined, // 用来计数x，防止直接生成三连转珠
            countTypeY = [], // 用来计数y，防止直接生成三连转珠
            dataList = [], // 生成的转珠列表
            filterTypeX = undefined; // 已经满计数的转珠类型

        for (let i = 0; i < xNumber; i++) {
            dataList[i] = [];
            countTypeX = undefined;
            for (let j = 0; j < yNumber; j++) {
                let filterTypeY = undefined;
                if (countTypeY[j] && countTypeY[j].count === 2) {
                    filterTypeY = countTypeY[j].type
                }

                let type = createBeed(filterTypeX, filterTypeY);
                dataList[i][j] = {
                    type: type
                }

                if (countTypeX === type) {
                    filterTypeX = countTypeX;
                    countTypeX = undefined;
                } else {
                    countTypeX = type;
                }

                if ((!countTypeY[j]) || (countTypeY[j].type !== type)) {
                    countTypeY[j] = {
                        type: type,
                        count: 1,
                    }
                } else {
                    countTypeY[j].count++;
                }
            }
        }

        return dataList
    },
    // 绑定事件
    addEvent: function () {
        this.node.on('touchstart', function (event) {
            if (lockMove || inComputed || paused) {
                return
            }

            if (event.target.name === 'beed') {
                activeNode = event.target
                activeNode.zIndex = 1;
                activeNode.runAction(cc.scaleTo(0.2, 0.8));
                lockMove = true
            }
        }, this)

        this.node.on('touchmove', function (event) {
            let x = event.getLocationX(),
            y = event.getLocationY();

            if (paused || inComputed) {
                return
            }

            if (x < offsetX || x > (offsetX + this.node.width) || y < offsetY || y > (offsetY + this.node.height)) {
                this.endMove();
                return
            }

            if (lockMove && event.getTouches().length === 1) {
                let toX = Math.floor((x - offsetX) / width),
                    toY = Math.floor((y - offsetY) / height);
                if ((toX !== activeNode.idX) || (toY !== activeNode.idY)) {
                    let changeNode = this.node.children.find(ele => (ele.idX === toX && ele.idY === toY));
                    if (!changeNode) {
                        return
                    }
                    changeNode.idX = activeNode.idX;
                    changeNode.idY = activeNode.idY;
                    activeNode.idX = toX;
                    activeNode.idY = toY;
                    activeNode.stopAllActions();
                    activeNode.runAction(cc.moveTo(0.1, cc.v2(anchorOffsetX + width * activeNode.idX, anchorOffsetY + height * activeNode.idY)));
                    changeNode.stopAllActions();
                    changeNode.runAction(this.beedChange(anchorOffsetX + width * changeNode.idX, anchorOffsetY + height * changeNode.idY));
                    changeNode = null;
                }
            }
        }, this)

        this.node.on('touchcancel', function (event) {
            if (paused || inComputed) {
                return
            }
            this.endMove()
        }, this)

        this.node.on('touchend', function (event) {
            if (paused || inComputed) {
                return
            }
            this.endMove()
        }, this)
    },

    // 交换转珠
    beedChange: function (x, y) {   
        return cc.sequence(
            cc.scaleTo(0.1, 0.8), 
            cc.moveTo(0.1, cc.v2(x, y)),
            cc.scaleTo(0.1, 1)
        );
    },

    // 触摸结束
    endMove() {
        lockMove = false;
        inComputed = true;
        ;activeNode && activeNode.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.callFunc(function (target) {
            activeNode.zIndex = 2;
            activeNode = null;
            this.computedComb();
        }, this)));
    },

    // 一次伤害计算
    computedComb: function () {
        let beedLists = [];
        let filterBeedsX = {}, // 纵向消除列表
            filterBeedsY = {}, // 横向消除列表
            combCount = {}, // 统计comb
            filterRemoveBeeds = {}, // 去重分类后的转珠
            removeBeeds = []; // 需要消除的转珠
        this.node.children.forEach((ele) => {
            if (!beedLists[ele.idX]) {
                beedLists[ele.idX] = [];
            }
            beedLists[ele.idX][ele.idY] = ele;
        });
        for (let i = 0; i < xNumber; i++) {
            let arr = [];
            for (let j = 0; j < yNumber; j++) {
                if (arr[0] && beedLists[i][j].beedType === arr[0].beedType) {
                    arr.push(beedLists[i][j]);
                } else {
                    if (arr.length >= 3) {
                        filterBeedsY[arr[0].beedType] ? (filterBeedsY[arr[0].beedType].push(arr)) : (filterBeedsY[arr[0].beedType] = [arr]);
                        !combCount[arr[0].beedType] ? (combCount[arr[0].beedType] = 1) : combCount[arr[0].beedType]++;
                        removeBeeds = removeBeeds.concat(arr);
                    }
                    arr = [beedLists[i][j]];
                }
            }

            if (arr.length >= 3) {
                filterBeedsY[arr[0].beedType] ? (filterBeedsY[arr[0].beedType].push(arr)) : (filterBeedsY[arr[0].beedType] = [arr]);
                removeBeeds = removeBeeds.concat(arr);
                !combCount[arr[0].beedType] ? (combCount[arr[0].beedType] = 1) : combCount[arr[0].beedType]++;
            }
        }

        for (let n = 0; n < yNumber; n++) {
            let arr = [];
            for (let m = 0; m < xNumber; m++) {
                if (arr[0] && beedLists[m][n].beedType === arr[0].beedType) {
                    arr.push(beedLists[m][n]);
                } else {
                    if (arr.length >= 3) {
                        filterBeedsX[arr[0].beedType] ? (filterBeedsX[arr[0].beedType].push(arr)) : (filterBeedsX[arr[0].beedType] = [arr]);
                        removeBeeds = removeBeeds.concat(arr);
                        !combCount[arr[0].beedType] ? (combCount[arr[0].beedType] = 1) : combCount[arr[0].beedType]++;
                    }
                    arr = [beedLists[m][n]];
                }
            }

            if (arr.length >= 3) {
                filterBeedsX[arr[0].beedType] ? (filterBeedsX[arr[0].beedType].push(arr)) : (filterBeedsX[arr[0].beedType] = [arr]);
                removeBeeds = removeBeeds.concat(arr);
                !combCount[arr[0].beedType] ? (combCount[arr[0].beedType] = 1) : combCount[arr[0].beedType]++;
            }
        }
        
        // 如果没有需要消除的转珠，就退出
        if (removeBeeds.length <= 0) {
            console.log('end')
            this.computedCombEnd()
            return
        }

        for (let c = 0; c < removeBeeds.length; c++) {
            if (!filterRemoveBeeds[removeBeeds[c].beedType]) {
                filterRemoveBeeds[removeBeeds[c].beedType] = [removeBeeds[c]];
            } else {
                if (filterRemoveBeeds[removeBeeds[c].beedType].find(ele => (ele.idX === removeBeeds[c].idX && ele.idY === removeBeeds[c].idY))) {
                    combCount[removeBeeds[c].beedType]--;
                } else {
                    filterRemoveBeeds[removeBeeds[c].beedType].push(removeBeeds[c])
                }
            }
        }

        for (let key in filterRemoveBeeds) {
            for (let i = 0; i < filterRemoveBeeds[key].length; i++) {
                filterRemoveBeeds[key][i].isOut = true; // 标识已经需要移除的转珠
                filterRemoveBeeds[key][i].runAction(cc.sequence(cc.scaleTo(0.1, 0), cc.callFunc(function (target) {
                    filterRemoveBeeds[key][i].destroy();
                }, this)));
            }
        }

        for (let i = 0; i < beedLists.length; i++) {
            let newArr = []
            for (let j = 0; j < beedLists[i].length; j++) {
                if (!beedLists[i][j].isOut) {
                    beedLists[i][j].idY = newArr.length;
                    newArr[newArr.length] = beedLists[i][j];
                }
            }

            let needCount = yNumber - newArr.length; // 还需要生成的转珠数
            while (newArr.length < yNumber) {
                let newNode = cc.instantiate(this.target),
                newType = createBeed();
                cc.loader.loadRes(`images/beeds/${newType}`, cc.SpriteFrame, function (err, spriteFrame) {
                    newNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                newNode.beedType = newType;
                newNode.idX = i;
                newNode.idY = newArr.length;
                newNode.parent = this.node;
                // newNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(`resources/images/beeds/${data[i][j].type}.png`));
                // console.log(cc.v2(55 * j, 55 * i));
                newNode.setPosition(cc.v2(anchorOffsetX + width * i, anchorOffsetY + height * (1 + newArr.length + needCount)));
                newArr[newArr.length] = newNode;

            }
            newArr.forEach((ele, index) => {

                if ((index + 1) === newArr.length && (i + 1) === beedLists.length) {
                    ele.runAction(cc.sequence(this.createMove(anchorOffsetX + width * ele.idX, anchorOffsetY + height * ele.idY), this.finishOnce({
                        beeds: filterRemoveBeeds,
                        comb: combCount
                    })))
                } else {
                    ele.runAction(this.createMove(anchorOffsetX + width * ele.idX, anchorOffsetY + height * ele.idY))
                }
            })
            
        }

    },

    // 完成一次所有计算后
    computedCombEnd: function() {
        console.log(this.node.children);
        setTimeout(() => {
           inComputed = false
        }, 300)
    },

    // 一次计算完成
    finishOnce: function (target, data) {
        return cc.callFunc(function (data) {
            console.log(data)
            setTimeout(() => {
                this.computedComb()
            }, 200)
        }, this, data);//动作完成后会给玩家加100分
    },

    // 节点下降过渡动画
    createMove: function (x, y) {
        return cc.moveTo(0.3, cc.v2(x, y))
    },

    updated() {
        
    },

    start() {

    },

    // update (dt) {},
});
