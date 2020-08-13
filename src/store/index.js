import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store(***REMOVED***
  state: ***REMOVED***
    feedback_data: "",
    logged_in: false,
    user: "",
  ***REMOVED***,
  mutations: ***REMOVED***
    setState(state, payload) ***REMOVED***
      state[payload.name] = payload.val;
    ***REMOVED***,
  ***REMOVED***,
  actions: ***REMOVED******REMOVED***,
  modules: ***REMOVED******REMOVED***,
***REMOVED***);
