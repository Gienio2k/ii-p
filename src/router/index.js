import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Feedback from "../views/Feedback.vue";
import AdminPanel from "../views/AdminPanel.vue";
import Blog from "../views/Blog.vue";
import CreatePost from "../views/CreatePost.vue";
import SeePost from "../views/SeePost.vue";

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
    path: "/blog/createpost",
    name: "CreatePost",
    component: CreatePost,
  },
  {
    path: "/blog/post/:timestamp",
    name: "Post",
    component: SeePost,
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
