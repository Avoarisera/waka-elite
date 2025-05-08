import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/CrossSuggestionsPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'users', 
        component: () => import('pages/UsersPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'user/:id', 
        name: 'userProfile',
        component: () => import('pages/UserProfilePage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'login', 
        component: () => import('pages/LoginPage.vue'),
        meta: { requiresAuth: false }
      },
      { 
        path: 'register', 
        component: () => import('pages/RegisterPage.vue'),
        meta: { requiresAuth: false }
      },
      { 
        path: 'reset-password', 
        component: () => import('pages/ResetPasswordPage.vue'),
        meta: { requiresAuth: false }
      },
      { 
        path: 'me', 
        component: () => import('pages/UserProfilePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'project',
        component: () => import('pages/ProjectPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'event',
        component: () => import('pages/EventsPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'locations',
        component: () => import('pages/LocationsPage.vue'),
        meta: { requiresAuth: true }
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
