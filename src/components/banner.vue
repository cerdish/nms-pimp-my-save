<script setup>

</script>

<template>
    <div class="banner bg-color1 flex">
        <div style="align-self:center;" class="padding">
            <button @click="$emit('toggle-menu')" class="no-style">
                <span class="material-icons">menu</span>
            </button>
        </div>

        <h1 class="item-grow padding">PMP v0.0.1</h1>
    </div>
</template>