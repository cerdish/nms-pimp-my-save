<script setup>
    import Base from '@/js/nms/base.js';
    import * as THREE from 'three';
    import { ref, onMounted, computed, watch, reactive } from 'vue';
    import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls'
    import defaultBase from '@/js/nms/defaultBase.json';

    const canvasWrapper = ref(null);
    defineExpose({ canvasWrapper });

    const input = reactive({
        base:JSON.stringify(defaultBase, null, 2)
    });

    const output = reactive({
        base:input.base
    });

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({});
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    renderer.setSize(600,600);
    
    const camera = new THREE.PerspectiveCamera(75, 600 / 600, 0.1, 50000);
    camera.position.z = 12;

    const base = new Base().fromJson(output.base);

    watch(() => input.base, () => {
        output.base = input.base;
    });

    watch(() => output.base, () => {
        base.clear();

        try{
            base.fromJson(output.base);
        }catch(e){
            console.log(e)
        }

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

        scene.add(new THREE.GridHelper(100, 10));

        render();
    })

    const render = () => {
        renderer.render(scene, camera);
    }
</script>

<template>
    <div class="flex">
        <div class="item-grow">
            <div>
                <h2>Input</h2>

                <base-input v-model="input.base" type="textarea">Base</base-input>
            </div>

            <hr>

            <div>
                <h2>Output</h2>
                <base-input v-model="input.base" type="textarea">Base</base-input>
            </div>
        </div>

        <div class="item-grow padding">
            <div ref="canvasWrapper"></div>
        </div>
    </div>
</template>