import { requestLogin } from "../common/api/accountAPI";

const state = {
  token: null
};

const getters = {
  getToken: state => {
    return state.token;
  }
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

const actions = {
  loginAction: async ({ commit }, loginData) => {
    const response = await requestLogin(loginData);
    commit("setToken", response.data.accessToken);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
