import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import "vuetify/styles"; // Import Vuetify styles
import "@mdi/font/css/materialdesignicons.css"; // Import MDI styles
import { registerSW } from "virtual:pwa-register"; // For service worker

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: "mdi", // Specify MDI as the icon font
  },
});

const app = createApp(App);
registerSW();
app.use(vuetify);

app.mount("#app");
