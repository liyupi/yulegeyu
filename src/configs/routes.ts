import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import GamePage from "../pages/GamePage.vue";

export default [
  {
    path: "/",
    component: IndexPage,
  },
  {
    path: "/game",
    component: GamePage,
  },
] as RouteRecordRaw[];
