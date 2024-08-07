import "./bootstrap";
import { createApp } from "vue";
import App from "./Layouts/App.vue";
import vuetify from "./vuetify";
import router from "./router";

createApp(App).use(vuetify).use(router).mount("#app");
