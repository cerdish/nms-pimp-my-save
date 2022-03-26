<script setup>
    import banner from './components/banner.vue';
    import { ref } from 'vue';

    var showMenu = ref(true);

    const toggleMenu = () => {
        showMenu.value = !showMenu.value;
        console.log(showMenu)
    }
</script>

<template>
    <div id="layout">
        <banner @toggle-menu="toggleMenu()"></banner>
        
        <div class="page">
            <div class="side-nav" v-if="showMenu">
                <router-link to="/">Pimp My Save</router-link>
                <router-link to="/explore">Explore the 'Verse</router-link>
                <router-link to="/nono">No No No Challenges</router-link>
                <router-link to="/baseCreator">Base Creator 9000</router-link>
            </div>

            <div class="content padding">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style>
    #layout{
        display:flex;
        flex-direction:column;
    }
    #layout .page{
        display:flex;
    }
    #layout .content{
        flex:1;
    }
    .page,.side-nav,#app,#layout{
        height:100%;
    }
    .side-nav{
        width:200px;
        padding:var(--default-gap);
        border-right:1px solid var(--grey1);
        background:var(--grey0);
    }
    .side-nav a{
        display:block;
        padding:var(--default-gap);
    }
    .router-link-active{
        background:var(--grey1);
        color:var(--color1);
    }
</style>
