import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App)

app.use(router)

let url_auth = import.meta.env.VITE_SERVICE_URL;
let url_task = import.meta.env.VITE_SERVICE_URL_TASK;
let url_scraping = import.meta.env.VITE_SERVICE_URL_SCRAPING;

app.config.globalProperties.$API_URL_AUTH = url_auth;
app.config.globalProperties.$API_URL_TASK = url_task;
app.config.globalProperties.$API_URL_SCR = url_scraping;

app.mount('#app')