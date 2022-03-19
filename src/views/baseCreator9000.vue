<script setup>
    import Base from '@/js/nms/base.js';
    import * as THREE from 'three';
    import { ref, onMounted, computed, watch, reactive } from 'vue';
    import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls'
    import defaultBase from '@/js/nms/defaultBase.json';

    const canvasWrapper = ref(null);
    defineExpose({ canvasWrapper });

    const setup = reactive({
        inputBase:JSON.stringify(defaultBase, null, 2)
    })

    const _inputBase = computed(() => {
        try{
            return JSON.parse(setup.inputBase);
        }catch(e){
            return {};
        }
    })

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({});
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    renderer.setSize(600,600);
    
    const camera = new THREE.PerspectiveCamera(75, 600 / 600, 0.1, 50000);
    camera.position.z = 12;

    const base = new Base().fromJson(setup.inputBase);

    watch(() => setup.inputBase, () => {
        base.clear();

        try{
            base.fromJson(setup.inputBase);
        }catch(e){
            console.log(e)
        }

        //console.log(base);

        render();
    })

    onMounted(() => {
        canvasWrapper.value.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render);

        scene.add(base);

        var keyLight = new THREE.DirectionalLight(0xffffff);
        keyLight.position.set(200, 200, 200);
        keyLight.castShadow = true;

        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;

        keyLight.shadow.camera.left = -10;
        keyLight.shadow.camera.bottom = -10;
        keyLight.shadow.camera.right = 10;
        keyLight.shadow.camera.top = 10;

        keyLight.shadow.camera.far = 5000;

        scene.add(keyLight);

        let fillLight = new THREE.DirectionalLight(0x0000ff, 0.5);
        fillLight.position.set(-200, -200, -200);
        scene.add(fillLight);

        render();
    })

    const render = () => {
        renderer.render(scene, camera);
    }
</script>

<template>
    <div class="flex">
        <div class="item-grow">
            <base-input v-model="setup.inputBase" type="textarea">Input Base</base-input>
        </div>

        <div class="item-grow padding">
            <div ref="canvasWrapper"></div>
        </div>
    </div>
</template>