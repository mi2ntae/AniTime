/**
 * 메뉴 목록 및 활성화 메뉴 정보
 */

import menuData from "../views/main/menu.json";

const state = {
  activeMenu: "home",
  menus: menuData
};

const getters = {
  // 메뉴 객체 가져오기
  getMenus: state => {
    return state.menus;
  },
  // Active된 메뉴 인덱스 가져오기
  getActiveMenuIndex: state => {
    const keys = Object.keys(state.menus);
    return keys.findIndex(item => item === state.activeMenu);
  }
};

const mutations = {
  setMenuActive: (state, index) => {
    console.log("setMenuActive", state, index);
    const keys = Object.keys(state.menus);
    state.activeMenu = keys[index];
  },
  setMenuActiveMenuName: (state, menuName) => {
    state.activeMenu = menuName;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
