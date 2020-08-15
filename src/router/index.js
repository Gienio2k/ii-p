import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Feedback from "../views/Feedback.vue";
import AdminPanel from "../views/AdminPanel.vue";
import Blog from "../views/Blog.vue";

Vue.use(VueRouter);

const routes = [
  ***REMOVED***
    path: "/",
    name: "Home",
    component: Home,
  ***REMOVED***,
  ***REMOVED***
    path: "/feedback",
    name: "Feedback",
    component: Feedback,
  ***REMOVED***,
  ***REMOVED***
    path: "/blog",
    name: "Blog",
    component: Blog,
  ***REMOVED***,
  ***REMOVED***
    path: "/admin",
    name: "AdminPanel",
    component: AdminPanel,
  ***REMOVED***,
];

const router = new VueRouter(***REMOVED***
  mode: "history",
  base: process.env.BASE_URL,
  routes,
***REMOVED***);

export default router;
