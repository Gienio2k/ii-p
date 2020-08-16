import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Feedback from "../views/Feedback.vue";
import AdminPanel from "../views/AdminPanel.vue";
import Blog from "../views/Blog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: Feedback,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/admin",
    name: "AdminPanel",
    component: AdminPanel,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
