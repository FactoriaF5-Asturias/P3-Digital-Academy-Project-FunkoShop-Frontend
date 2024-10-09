import ProductView from './../views/ProductView.vue';
import { useAuthStore } from '@/stores/auth';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home",
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/user/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('@/views/user/FavoriteView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/user/OrderView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('@/views/admin/ProductsView.vue'),
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('@/views/admin/OrdersView.vue'),
        },
        {
          path: 'sales-billing',
          name: 'admin-sales-billing',
          component: () => import('@/views/admin/SalesBillingView.vue'),
        },
        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('@/views/admin/CategoriesView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: "/404",
    },
    {
      path: '/404',
      name: 'NotFound', 
      component: () => import('@/views/notFound/NotFoundView.vue'),
    }
  ]
})

router.beforeEach((to) => {
  const store = useAuthStore();

  if (localStorage.getItem("id") && store.user.id == "") {
    store.user.id = localStorage.getItem("id");
    store.user.email = localStorage.getItem("email");
    store.user.role = localStorage.getItem("role");
    store.user.isAuthenticated = localStorage.getItem("isAuthenticated") == "true" ? true : false;
    store.user.access_token = localStorage.getItem("access_token");
    store.user.refresh_token = localStorage.getItem("refresh_token");
    store.user.lang = localStorage.getItem("lang");
  }

  if (to.meta.requiresAdmin && !(store.user.role == "ADMIN")) {
    return {
      path: "/home",
    };
  }

  if (to.meta.requiresAuth && !store.user.isAuthenticated && !(store.user.role == "USER")) {
    return {
      path: "/home",
    };
  }
});

export default router
