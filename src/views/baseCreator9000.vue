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
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                console.log(entry);

                renderer.setSize(entry.target.clientWidth, entry.target.clientHeight);

                camera.aspect = entry.target.clientWidth / entry.target.clientHeight;
                camera.updateProjectionMatrix();

                render();
            }
        });

        resizeObserver.observe(canvasWrapper.value);

        renderer.setSize(canvasWrapper.value.clientWidth, canvasWrapper.value.clientHeight);

        canvasWrapper.value.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render);

        scene.add(base);

        var keyLight = new THREE.DirectionalLight(0xffffff);
        keyLight.position.set(2000, 2000, 2000);
        keyLight.castShadow = true;

        keyLight.shadow.mapSize.width = 1024 * 8;
        keyLight.shadow.mapSize.height = 1024 * 8;

        keyLight.shadow.camera.left = -300;
        keyLight.shadow.camera.bottom = -300;
        keyLight.shadow.camera.right = 300;
        keyLight.shadow.camera.top = 300;

        keyLight.shadow.camera.far = 5000;

        scene.add(keyLight);

        let fillLight = new THREE.DirectionalLight(0x0000ff, 0.5);
        fillLight.position.set(-2000, -2000, -2000);
        scene.add(fillLight);

        scene.add(new THREE.GridHelper(100, 10));

        render();
    })

    const render = () => {
        renderer.render(scene, camera);
    }
</script>

<template>
    <div class="flex fill-height">
        <div class="c4">
            <div>
                <h2>Input</h2>

                <base-input :stacked="true" v-model="input.base" type="textarea">Base</base-input>
            </div>

            <hr>

            <div>
                <h2>Output</h2>
                <base-input :stacked="true" v-model="output.base" type="textarea">Base</base-input>
            </div>
        </div>

        <div class="margin fill-height c8" style="position:relative;">
            <div ref="canvasWrapper" id="cavas-wrapper"></div>
        </div>
    </div>
</template>

<style>
    #cavas-wrapper{
        position:absolute;
        height:100%;
        width:100%;
    }
</style>