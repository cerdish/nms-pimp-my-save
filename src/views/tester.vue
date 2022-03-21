<script setup>
    import { ref } from 'vue';
    import {randUniverseAddress, universeAddressToHex, hexToUniverseAddress} from '@/js/nms/utils.js';

    const input = ref("");

    const output = ref("");

    const transform = ()=> {
        let ua = randUniverseAddress();

        input.value = JSON.stringify(ua);

        let hex = universeAddressToHex(ua);

        console.log(hex)

        output.value = JSON.stringify(hexToUniverseAddress(hex));
    }
</script>

<template>
    <div>
        <form @submit.prevent="transform()">
            <div>
                <base-input :stacked="true" v-model="input" type="textarea">Input</base-input>
            </div>

            <button>Transform</button>
        </form>

        <hr>

        <div>
            <base-input :stacked="true" v-model="output" type="textarea">Output</base-input>
        </div>
    </div>
</template>