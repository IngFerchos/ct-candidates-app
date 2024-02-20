import { createRouter, createWebHistory } from "vue-router";
import TodoListView from '../views/TodoListView.vue';
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
    {
        path: '/',
        component: TodoListView
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/register',
        component: RegisterView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;