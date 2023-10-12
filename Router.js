import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home-page",
    component: () => import("../views/Home.vue"),
  },
  //Root
  {
    path: '/root/dashboard',
    name: '/root/dashboard',
    redirect: "/root/dashboard/inicio",
    component: () => import("@/views/Dashboard.vue"),
    children: [
      {
        path: "/root/dashboard/inicio",
        name: "/root/dashboard/inicio",
        component: () => import("../views/Root/Inicio.vue"),
      },
      {
        path: "/root/dashboard/usuarios-y-roles",
        name: "/root/dashboard/usuarios-y-roles",
        component: () => import("../views/Root/usuarios-y-roles/Usuarios-y-roles.vue")
      },
      {
        path: "/root/dashboard/usuarios-y-roles/detalle",
        name: "/root/dashboard/usuarios-y-roles/detalle",
        component: () => import("../views/Root/usuarios-y-roles/DetalleUsuario.vue")
      },
      {
        path: "/root/dashboard/estructuras",
        name: "/root/dashboard/estructuras",
        component: () => import("../views/Root/estructuras/Estructuras.vue")
      },
      {
        path: "/root/dashboard/demo",
        name: "/root/dashboard/demo",
        component: () => import("../views/Root/Demo.vue")
      },
      {
        path: "/root/dashboard/:pathMatch(.*)*",
        redirect: "/root/dashboard/inicio",
      },
    ]
  },
  //Area - tesoreria
  {
    path: "/",
    name: "dashboard",
    redirect: "/dashboard",
    // meta: {
    //   isRequiredAuth: true,
    // },
    component: () => import("../views/Dashboard.vue"),
    children: [
      {
        path: "/dashboard/inicio",
        name: "/dashboard/inicio",
        component: () => import("../views/Dashboard/Inicio.vue"),
      },
      {
        path: "/dashboard/pagos",
        name: "/dashboard/pagos",
        component: () => import("../views/Dashboard/detalle-pagos/Pagos.vue"),
      },
      {
        path: "/dashboard/pagos/generar",
        name: "generar-oficio",
        component: () => import("../views/Dashboard/detalle-pagos/Generar-solicitud.vue"),
      },
      {
        path: "/dashboard/procedimientos",
        name: "/dashboard/procedimientos",
        component: () => import("../views/Dashboard/procedimientos/Procedimientos.vue"),
      },
      {
        path: "/dashboard/proveedores",
        name: "/dashboard/proveedores",
        component: () => import("../views/Dashboard/proveedores/Provedores.vue"),
      },
      {
        path: "/dashboard/proveedores/detalle",
        name: "/dashboard/proveedores/detalle",
        component: () => import("../views/Dashboard/proveedores/Detalle-proveedores.vue"),
      },
      {
        path: "/dashboard/perfil",
        name: "/dashboard/perfil",
        component: () => import("../views/Profile/Profile.vue"),
      },
      // Not found
      {
        path: "/dashboard/:pathMatch(.*)*",
        redirect: "/dashboard/inicio",
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//guards
router.beforeEach((to, from, next) => {
  //canActive
  let identityUser = sessionStorage.getItem("identityUser");
  const isUserauthenticated = identityUser;
  const isRequiredAuth = to.matched.some(
    (record) => record.meta.isRequiredAuth
  );
  // Check for protected route
  if (isRequiredAuth && !isUserauthenticated) {
    next("/");
  } else {
    next();
  }

  //reset scrolling
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
