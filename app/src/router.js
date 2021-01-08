import Vue from 'vue';
import VueRouter from 'vue-router';

import Dash from '@/views/dash/Dash.vue';
import Login from '@/views/auth/Login.vue';

import AuthLayout from '@/layouts/AuthLayout.vue';
import DashLayout from '@/layouts/DashLayout.vue';

import { isConnected, isAdmin, isHackathonOpen } from '@/guards';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: DashLayout,
    children: [
      {
        path: '/',
        name: 'dash',
        component: Dash
      },
      {
        path: 'application',
        name: 'application',
        component: () => import('@/views/dash/Application.vue'),
        beforeEnter: async (_, __, next) =>
          (await isHackathonOpen()) ? next() : next({ name: 'dash' })
      },
      {
        path: 'team',
        name: 'team',
        component: () => import('@/views/dash/Team.vue'),
        beforeEnter: async (_, __, next) =>
          (await isHackathonOpen()) ? next() : next({ name: 'dash' })
      },
      {
        path: 'hackers',
        name: 'hackers',
        component: () => import('@/views/admin/Hackers.vue'),
        beforeEnter: async (_, __, next) =>
          (await isAdmin()) ? next() : next({ name: 'dash' })
      },
      {
        path: 'hackathons',
        name: 'hackathons',
        component: () => import('@/views/admin/Hackathons.vue'),
        beforeEnter: async (_, __, next) =>
          (await isAdmin()) ? next() : next({ name: 'dash' })
      }
    ],
    beforeEnter: async (_, __, next) =>
      (await isConnected()) ? next() : next({ name: 'login' })
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue')
      },
      {
        path: '/forgot',
        name: 'forgot',
        component: () => import('@/views/auth/Forgot.vue')
      },
      {
        path: '/reset/:resetToken?',
        name: 'reset',
        component: () => import('@/views/auth/Reset.vue')
      }
    ],
    beforeEnter: async (_, __, next) =>
      (await isConnected()) ? next({ name: 'dash' }) : next()
  },
  { path: '*', redirect: { name: 'dash' } }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
