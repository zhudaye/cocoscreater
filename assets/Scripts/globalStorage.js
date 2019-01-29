/*
 * @Date: 2019-01-04 19:11:49
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-09 00:21:37
 */
// 全局资源缓存

let resource = {
    Sprite: {

    },
    SpriteFrame: {

    },
    Pets: {

    }
}

// 转珠
const getSprite = function (name) {
    return resource['Sprite'][name]
}

const setSprite = function (name, obj) {
   resource['Sprite'][name] = obj
}

// 队员框
const getSpriteFrame = function (name) {
    return resource['SpriteFrame'][`${name}Frame`]
}

const setSpriteFrame = function (name, obj) {
    resource['SpriteFrame'][`${name}Frame`] = obj
}

// 宠物头像
const getPet = function (name) {
    return resource['Pets'][name]
}

const setPet = function (name, obj) {
    resource['Pets'][name] = obj
}

// 释放资源
const freedResource = function (name) {
    if (name && resource[name]) {
        resource[name] = {}
    } else {
        resource = {
            Sprite: {

            },
            SpriteFrame: {

            },
            Pets: {

            }
        }
    }
}

module.exports = {
    getSprite: getSprite,
    setSprite: setSprite,
    getSpriteFrame: getSpriteFrame,
    setSpriteFrame: setSpriteFrame,
    getPet: getPet,
    setPet: setPet,
    freedResource: freedResource
}