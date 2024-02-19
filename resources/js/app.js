import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import the fontawesome icons */
import { faXmark, faEdit, faPlus, faCheck, faSun, faMoon, faHome, faGripVertical } from "@fortawesome/free-solid-svg-icons";

/* add the icons to the library */
library.add(faXmark, faEdit, faPlus, faCheck, faSun, faMoon, faHome, faGripVertical);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .component("fa-icon", FontAwesomeIcon)
            .use(ZiggyVue)            
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
