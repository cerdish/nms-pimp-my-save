import baseCreator9000 from '@/views/baseCreator9000.vue';
import home from '@/views/home.vue';
import nono from '@/views/nono.vue';
import tester from '@/views/tester.vue';
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path:"/", component:home},
        {path:"/nono", component:nono},
        {path:"/baseCreator", component:baseCreator9000},
        {path:"/tester", component:tester}
    ],
});

export { router as default};