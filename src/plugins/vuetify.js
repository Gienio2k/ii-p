import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

export default new Vuetify(***REMOVED***
  theme: ***REMOVED***
    dark: localStorage.getItem("dark") ? localStorage.getItem("dark") : true,
    options: ***REMOVED***
      customProperties: true,
    ***REMOVED***,
    themes: ***REMOVED***
      dark: ***REMOVED*** background: "#1a1a1a" ***REMOVED***,
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***);
