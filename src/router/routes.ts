import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/SplashScreen.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'huhu',
        component: () => import('pages/AddressBookPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'users', 
        component: () => import('pages/UsersPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'login', 
        component: () => import('pages/LoginPage.vue'),
        meta: { requiresAuth: false }
      },
      { 
        path: 'me', 
        component: () => import('pages/UserProfilePage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'you', 
        component: () => import('pages/ProfilePage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'home', 
        component: () => import('pages/HomePage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'create', 
        component: () => import('pages/IdeaPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/project',
        component: () => import('src/pages/ProjectPage.vue'),
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
