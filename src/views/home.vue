<script setup>
    import { ref } from 'vue';
    import SaveFile from '@/js/nms/SaveFile'
    import defaultSave from '@/js/nms/data/defaultSave.json'
    import { hexToUniverseAddress } from '@/js/nms/utils.js';

    const inputJson = ref("");

    const upgrades = ref({
        ships:true,
        multitools:true,
        exosuit:true,
        freighter:true,
        techKnowledge:true,
        buildKnowledge:true,
        languageKnowledge:true,
        missions:true,
        location:true
    });

    const pimpMySave = (json)=> {
        let save = new SaveFile(json);

        if(upgrades.value.missions){
            save.completeAllMissions();
        }

        if(upgrades.value.ships){
            save.expandShips().upgradeShipTech().upgradeShipStats();
        }

        if(upgrades.value.exosuit){
            save.expandSuit().upgradeSuit();
        }

        if(upgrades.value.multitools){
            save.expandMultitools().upgradeMultitoolTech().upgradeMultitoolStats();
        }

        if(upgrades.value.location) save.randomizeLocation();

        if(upgrades.value.buildKnowledge) save.addAllProducts();

        if(upgrades.value.techKnowledge) save.addAllTech();

        if(upgrades.value.languageKnowledge) save.addAllWords();

        var blob = new Blob([JSON.stringify(save, null, 2)], {type: "application/json;charset=utf-8"});
        
        saveAs(blob, "pimpedSave" + Math.round(new Date() / 1000) + ".json");

        return null;
    }

    const createPimpedSave = ()=> {
        let save = new SaveFile(JSON.stringify(defaultSave));

        save.randomizeLocation().updateStartLocation();

        return pimpMySave(JSON.stringify(save));
    }
</script>

<template>
    <div class="margin">
        <div>
            <h1>Pimp My Save</h1>
            <p>
                Start off your No Man's Sky playthrough like a pimp. Know all tech, own a pimp ship, own a pimp multitool, and skip out on the story grind. Time to start exploring...like a pimp.
            </p>
        </div>
        {{hexToUniverseAddress("0x1FFB0001001001")}}
        <br>

        <form @submit.prevent="pimpMySave(inputJson)">
            <base-input v-model="inputJson" :stacked="true" type="textarea">Paste your save file JSON below</base-input>

            <div>
                Pimp My:

                <base-checkbox v-model="upgrades.exosuit">exosuit</base-checkbox>   
                <base-checkbox v-model="upgrades.multitools">multitool</base-checkbox>   
                <base-checkbox v-model="upgrades.ships">ship</base-checkbox>   
                <base-checkbox v-model="upgrades.freighter">freighter</base-checkbox>   
                <base-checkbox v-model="upgrades.techKnowledge">tech knowledge</base-checkbox>   
                <base-checkbox v-model="upgrades.buildKnowledge">build skills</base-checkbox>   
                <base-checkbox v-model="upgrades.languageKnowledge">language skills</base-checkbox>   
                <base-checkbox v-model="upgrades.missions">story progress</base-checkbox>   
            </div>

            <base-checkbox v-model="upgrades.missions">Randomize location (universe, system, planet)</base-checkbox>   

            <div>
                <button>Pimp My Save</button>
                <button type="button" @click="createPimpedSave()">Create New Save</button>
            </div>
        </form>
    </div>
</template>