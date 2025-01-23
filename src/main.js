import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();
app.config.warnHandler = function (err, vm, info) {
  throw new Error(`[Vue warn]: ${err}\nTrace: ${info}`);
};
app.use(router);
app.use(pinia);
app.mount('#app');
