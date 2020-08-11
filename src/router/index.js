import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Feedback from "../views/Feedback.vue";

Vue.use(VueRouter);

const routes = [
  ***REMOVED***
    path: "/",
    name: "Główna",
    component: Home,
  ***REMOVED***,
  ***REMOVED***
    path: "/feedback",
    name: "Feedback",
    component: Feedback,
  ***REMOVED***,
];

const router = new VueRouter(***REMOVED***
  mode: "history",
  base: process.env.BASE_URL,
  routes,
***REMOVED***);

export default router;
