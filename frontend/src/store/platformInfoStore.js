/**
 * 플랫폼 관련 정보로 데스크탑인지, 모바일인지 판별 - 하이브리드 앱 대비
 */

import getIsDesktop from "../common/lib/getIsDesktop";

const state = {
  IsDesktopPlatform: getIsDesktop()
};

const getters = {
  // 플랫폼 관련 정보 가져오기
  getIsDesktopPlatform: state => {
    return state.isDesktopPlatform;
  }
};

const mutations = {
  setPlatform: (state, isDesktop) => {
    state.isDesktopPlatform = isDesktop;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
