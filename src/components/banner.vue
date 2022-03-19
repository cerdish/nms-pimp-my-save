<script setup>

</script>

<template>
    <div class="banner bg-color1 flex">
        <div style="align-self:center;" class="padding">
            <button @click="$emit('toggle-menu')" class="no-style">
                <span class="material-icons">menu</span>
            </button>
        </div>

        <h1 class="item-grow padding">Pimp My Save</h1>
    </div>
</template>