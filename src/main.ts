import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import WebApp from "@twa-dev/sdk";
import Vue3TouchEvents, {
  type Vue3TouchEventsOptions,
} from "vue3-touch-events";

import "./mockEnv.ts";
import "./style.css";

import App from "./App.vue";

import Loading from "./components/common/Loading.vue";
import Home from "./components/views/Home.vue";
import Questionnaire from './components/views/Questionnaire.vue';
import Learn from './components/views/Learn.vue';
import Frens from './components/views/Frens.vue';

const getBasePath = () => {
  const path = window.location.pathname;
  const base = path.substring(0, path.lastIndexOf("/") + 1);
  return base || "/";
};

const routes = [
  { path: "/", component: Loading },
  { path: "/home", component: Home },
  { path: '/learn', component: Learn },
  { path: '/frens', component: Frens },
  { path: '/questionnaire', component: Questionnaire },
  { path: '/profile', component: () => import('../src/components/views/Profile.vue')},
  { path: '/early-nft', component: () => import('../src/components/views/EarlyNFT.vue')},
  { path: '/about-us', component: () => import('../src/components/views/AboutUs.vue')}  
];

const router = createRouter({
  history: createWebHistory(getBasePath()),
  routes,
});

WebApp.ready();
WebApp.expand();

createApp(App)
  .use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
    disableClick: false,
  })
  .use(router)
  .mount("#app");
