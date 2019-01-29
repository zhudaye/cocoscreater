/*
 * @Date: 2019-01-02 20:21:18
 * @Author: zhudaye
 * @LastEditors: zhudaye
 * @LastEditTime: 2019-01-14 17:02:34
 */

const globInfo = {
  screenWidth: 0, // 屏幕宽
  screenHeight: 0, // 屏幕高
  designWidth: 0, // 设计宽
  designHeight: 0, // 设计高
  beedTypeLists: [{
      type: 'jin',
      color: '#EEA614'
    },
    {
      type: 'mu',
      color: '#34D812'
    },
    {
      type: 'shui',
      color: '#28A1E2',
    },
    {
      type: 'huo',
      color: '#E26928',
    },
    {
      type: 'tu',
      color: '#B77C34',
    },
    {
      type: 'nai',
      color: '#E54681'
    }
  ], // 转珠类型列表
  petTypeLists: [{
      mainType: 'jin',
      secondType: '',
      color: '#EEA614'
    },
    {
      mainType: 'mu',
      secondType: '',
      color: '#34D812'
    },
    {
      mainType: 'shui',
      secondType: '',
      color: '#28A1E2'
    },
    {
      mainType: 'huo',
      secondType: '',
      color: '#E26928'
    },
    {
      mainType: 'tu',
      secondType: '',
      color: '#B77C34'
    }
  ] // 宠物类型
}

const initScreenSize = function () {
  let visibleSize = cc.view.getVisibleSize(),
  designSize = cc.view.getDesignResolutionSize();
  globInfo.screenWidth = visibleSize.width;
  globInfo.screenHeight = visibleSize.height;
  globInfo.designWidth = designSize.width;
  globInfo.designHeight = designSize.height;
}

module.exports = {
  globInfo: globInfo,
  initScreenSize: initScreenSize
}
