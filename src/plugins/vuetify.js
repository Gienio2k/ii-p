import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

export default new Vuetify(***REMOVED***
  theme: ***REMOVED***
    dark: localStorage.getItem("dark") ? localStorage.getItem("dark") : true,
    themes: ***REMOVED***
      light: ***REMOVED***
        none: undefined,
      ***REMOVED***,
      dark: ***REMOVED*** none: undefined ***REMOVED***,
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***);
