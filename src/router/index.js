import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Admin.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
      {
        path: 'task',
        name: 'TaskAdmin',
        component: () => import('@/views/admin/task/TaskAdmin.vue'),
      },
      {
        path: 'task/create',
        name: 'CreateTaskAdmin',
        component: () => import('@/views/admin/task/CreateTaskAdmin.vue'),
      },
      {
        path: 'task/edit/:id',
        name: 'EditTaskAdmin',
        component: () => import('@/views/admin/task/EditTaskAdmin.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/User.vue'),
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;