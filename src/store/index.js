import {
  createStore
} from "vuex";

export default createStore({
  state: {
    token: "",
  },
  getters: {},
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
  actions: {
    setToken_a({
      commit
    }, token) {
      commit('SET_TOKEN', token)
    },
    removeToken_a({
      commit
    }, index) {
      commit('SET_TOKEN', '')
    },
  },
  modules: {},
});