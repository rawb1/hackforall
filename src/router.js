import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import DashLayout from '@/layouts/DashLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import LandingLayout from '@/layouts/LandingLayout.vue';

import { isConnected, isAdmin, isHackathonOpen } from '@/guards';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: LandingLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue')
      }
    ]
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
    beforeEnter: async (to, from, next) =>
      (await isConnected) ? next({ name: 'dash' }) : next()
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
        path: 'application',
        name: 'application',
        component: () => import('@/views/dash/Application.vue'),
        beforeEnter: async (to, from, next) =>
          (await isHackathonOpen) ? next() : next({ name: 'dash' })
      }
    ],
    beforeEnter: async (to, from, next) =>
      (await isConnected) ? next() : next({ name: 'login' })
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('@/views/admin/Admin.vue')
      },
      {
        path: 'hackers',
        name: 'hackers',
        component: () => import('@/views/admin/Hackers.vue')
      },
      {
        path: 'hackathon',
        name: 'hackathon',
        component: () => import('@/views/admin/Hackathon.vue')
      }
    ],
    beforeEnter: async (to, from, next) =>
      (await isConnected) && (await isAdmin) ? next() : next({ name: 'dash' })
  },
  { path: '*', redirect: { name: 'home' } }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
