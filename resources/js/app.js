import './bootstrap';
import { createApp } from "vue";

import '../css/app.css'; 
import "vuetify/styles";

import { createVuetify } from "vuetify";

import App from "./App.vue";
import router from './router/index';

const app = createApp({});
const vuetify = createVuetify({ 
    icons: { defaultSet: 'mdi' },
});

app.use(vuetify);
app.use(router);
app.component('App', App);
app.mount("#app");
