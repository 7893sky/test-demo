import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../page/Home.vue';
import Classify from '../page/Classify.vue';
import Shopping from '../page/Shopping.vue';
import User from '../page/User.vue';
import Index from '../page/Index.vue';
import Search from '../page/Search.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'classify',
        name: 'classify',
        component: Classify,
      },
      {
        path: 'shopping',
        component: Shopping,
      },
      {
        path: 'user',
        component: User,
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '*',
    redirect: '/index/home',
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
