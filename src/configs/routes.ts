import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";

export default [
  {
    path: "/",
    component: IndexPage,
  },
] as RouteRecordRaw[];
