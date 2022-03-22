<script setup>
    import { ref } from 'vue';
    import {randUniverseAddress, universeAddressToHex, hexToUniverseAddress} from '@/js/nms/utils.js';
    import Base from '@/js/nms/Base.js';

    const input = ref("");

    const output = ref("");

    const transform = ()=> {
        let base = new Base();

        let part = base.createPart("^T_FLOOR");

        let parts = part.cloneOnAxis(base.axies.z, 10, 5.33333);

        base.addParts(parts);

        output.value = base.toJson();
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