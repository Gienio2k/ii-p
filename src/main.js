import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import CKEditor from "@ckeditor/ckeditor5-vue";

Vue.use(CKEditor);

Vue.config.productionTip = false;

new Vue(***REMOVED***
  router,
  store,
  vuetify,
  CKEditor,
  render: (h) => h(App),
***REMOVED***).$mount("#app");
