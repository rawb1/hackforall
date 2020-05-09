import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import DashLayout from '@/layouts/DashLayout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue')
      },
      {
        path: '/register',
        name: 'resgister',
        component: () => import('@/views/auth/Register.vue')
      },
      {
        path: '/forgot',
        name: 'forgot',
        component: () => import('@/views/auth/Forgot.vue')
      }
    ]
  },
  {
    path: '/dash',
    component: DashLayout,
    children: [
      {
        path: '/',
        name: 'dash',
        component: () => import('@/views/dash/Dash.vue')
      },
      {
        path: '/application',
        name: 'application',
        component: () => import('@/views/dash/Application.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export { router };
