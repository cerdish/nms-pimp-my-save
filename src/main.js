import { createApp } from 'vue'
import App from './App.vue'
import camelToKebabCase from "camel-to-kebab";
import './css/style.css';
import router from './js/router.js'

const vueApp = createApp(App)

const components = import.meta.globEager('./components/global/*.vue')

Object.entries(components).forEach(([path, definition]) => {
  // Get name of component, based on filename
  const componentName = camelToKebabCase(path.split('/').pop().replace(/\.\w+$/, ''));

  // Register component on this Vue instance
  vueApp.component(componentName, definition.default)
})

vueApp.use(router);

vueApp.mount('#app');
