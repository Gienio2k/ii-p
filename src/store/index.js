import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    feedbackData: "",
    loggedIn: false,
    user: "",
    userRank: "",
  },
  mutations: {
    setState(state, payload) {
      state[payload.name] = payload.val;
    },
  },
  actions: {},
  modules: {},
});
