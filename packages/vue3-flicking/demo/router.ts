import { createRouter, createWebHistory } from "vue-router";

import BasicDemo from "./BasicDemo.vue";
import ReactiveDemo from "./ReactiveDemo.vue";
import App from "./App.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: App
  },
  {
    path: "/basic",
    name: "BasicDemo",
    component: BasicDemo
  },
  {
    path: "/reactive",
    name: "ReactiveDemo",
    component: ReactiveDemo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 