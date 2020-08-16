import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: localStorage.getItem("dark") ? localStorage.getItem("dark") : true,
    options: {
      customProperties: true,
    },
    themes: {
      dark: { background: "#1a1a1a" },
    },
  },
});
