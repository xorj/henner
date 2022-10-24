import { createApp } from "vue";
import App from "./App.vue";

//Quasar
import { Quasar, Notify, Dialog } from "quasar";
import quasarLang from "quasar/lang/pt-BR";

// Icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Quasar css
import "quasar/src/css/index.sass";

// Vue Router
import router from "./router/index.js";

//Store
import store from "./store";

import "./index.css";

//Vee validade
import * as VeeValidate from "vee-validate";

createApp(App)
    .use(VeeValidate)
    .use(router)
    .use(store)
    .use(Quasar, {
        plugins: { Notify, Dialog },
        lang: quasarLang,
    })
    .mount("#app");