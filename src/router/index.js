import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/cadastro",
        name: "Cadastro",
        component: () =>
            import ("../views/Cadastro.vue"),
        meta: {
            requiresAuth: false,
            redirectIfLoggedIn: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import ("../views/Login.vue"),
        meta: {
            requiresAuth: false,
            redirectIfLoggedIn: true,
        },
    },
    {
        path: "/carrinho",
        name: "Carrinho",
        component: () =>
            import ("../views/Carrinho.vue"),
        meta: {
            requiresAuth: true,
            redirectIfLoggedIn: false,
        },
    },
    {
        path: "/",
        name: "Produtos",
        component: () =>
            import ("../views/Produtos.vue"),
        meta: {
            requiresAuth: false,
            redirectIfLoggedIn: false,
        },
    },
    {
        path: "/produto/:id",
        name: "Detalhes do Produto",
        component: () =>
            import ("../views/DetalhesProduto.vue"),
        meta: {
            requiresAuth: false,
            redirectIfLoggedIn: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem("token")) {
        next({
            name: "Login",
            replace: true,
        });
    } else if (to.meta.redirectIfLoggedIn && localStorage.getItem("token")) {
        next({
            name: "Produtos",
            replace: true,
        });
    } else {
        next();
    }
});

export default router;