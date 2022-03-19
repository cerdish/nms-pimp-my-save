import baseCreator9000 from '@/views/baseCreator9000.vue';
import home from '@/views/home.vue';
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path:"/", component:home},
        {path:"/baseCreator", component:baseCreator9000}
    ],
});

export { router as default};