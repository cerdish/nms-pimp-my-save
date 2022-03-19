<script setup>

</script>

<template>
    <div class="margin">
        <div>
            <h2>Input</h2>

            <base-input :stacked="true" v-model="input" type="textarea">Base</base-input>
        </div>

        <hr>

        <div>
            <h2>Output</h2>
            <base-input :stacked="true" v-model="output" type="textarea">Base</base-input>
        </div>
    </div>
</template>