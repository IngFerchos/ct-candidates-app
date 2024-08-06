import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "../components/Home.vue";
import CreateTask from "../components/CreateTask.vue";
import ViewTasks from "../components/ViewTask.vue";

const routes = [
    {
        path: "/",
        name: "Root",
        component: Login,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        children: [
            {
                path: "create-task",
                name: "CreateTask",
                component: CreateTask,
            },
            {
                path: "edit-task/:id",
                name: "EditTask",
                component: CreateTask,
            },
            {
                path: "view-tasks",
                name: "ViewTasks",
                component: ViewTasks,
            },
        ],
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !isAuthenticated
    ) {
        next("/");
    } else {
        next();
    }
});

export default router;
