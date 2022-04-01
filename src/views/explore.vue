<script setup>
    import { ref } from 'vue';
    import SaveFile from '@/js/nms/SaveFile'
    import defaultSave from '@/js/nms/data/defaultSave.json'
    import { hexToUniverseAddress, randUniverseAddress, universeAddressToHex } from '@/js/nms/utils.js';
    import {saveAs} from 'file-saver'

    const inputJson = ref("");

    const initialAddress = ref(randUniverseAddress());

    const stepSizes = ref({
        PlanetIndex:0,
        SolarSystemIndex:1,
        RealityIndex:0,
        VoxelY:0,
        VoxelZ:0,
        VoxelX:0
    })

    const systemCount = ref(128);

    const transformSave = (json)=> {
        let save = new SaveFile(json);

        let ua = initialAddress.value;

        for(let i = 0; i < systemCount.value; i++){
            ua.GalacticAddress.PlanetIndex = parseInt(ua.GalacticAddress.PlanetIndex) + stepSizes.value.PlanetIndex;
            ua.GalacticAddress.SolarSystemIndex = parseInt(ua.GalacticAddress.SolarSystemIndex) + stepSizes.value.SolarSystemIndex;
            ua.RealityIndex = parseInt(ua.RealityIndex) + stepSizes.value.RealityIndex;
            ua.GalacticAddress.VoxelY = parseInt(ua.GalacticAddress.VoxelY) + stepSizes.value.VoxelY;
            ua.GalacticAddress.VoxelZ = parseInt(ua.GalacticAddress.VoxelZ) + stepSizes.value.VoxelZ;
            ua.GalacticAddress.VoxelX = parseInt(ua.GalacticAddress.VoxelX) + stepSizes.value.VoxelX;

            save.addGhostBase(ua, ua.GalacticAddress.PlanetIndex + "," + ua.RealityIndex + "," + ua.GalacticAddress.SolarSystemIndex + "," + ua.GalacticAddress.VoxelX + "," + ua.GalacticAddress.VoxelY + "," + ua.GalacticAddress.VoxelZ );

            save.PlayerStateData.UniverseAddress = ua;
        }

        save.PlayerStateData.KnownProducts.push("^U_SOLAR_S");
        save.PlayerStateData.KnownProducts.push("^U_BIOGENERATOR");
        save.PlayerStateData.KnownProducts.push("^U_BATTERY_S");
        save.PlayerStateData.KnownProducts.push("^U_POWERLINE");

        var blob = new Blob([JSON.stringify(save, null, 2)], {type: "application/json;charset=utf-8"});
        
        saveAs(blob, "explorerSave" + Math.round(new Date() / 1000) + ".json");

        return null;
    }

    const createSave = ()=> {
        let save = new SaveFile(JSON.stringify(defaultSave));

        save.completeAllMissions();
        save.expandShips().upgradeShipTech().upgradeShipStats();
        save.expandMultitools().upgradeMultitoolTech().upgradeMultitoolStats();
        save.expandSuit().upgradeSuit();

        save.randomizeLocation().updateStartLocation();

        return transformSave(JSON.stringify(save));
    }

    const randomizeInitialAddress = () => {
        initialAddress.value = randUniverseAddress();
    }
</script>

<template>
    <div class="margin">
        <div>
            <h1>Explore the 'Verse</h1>
            <p>
                Add a series of bases to your save for exploration purposes. This is useful for exploring phatom stars or specific series of systems.
            </p>
        </div>

        <!---
        {{hexToUniverseAddress("0x20B0000A5BFC7C")}}
        <br>
        {{hexToUniverseAddress("0x30B100F35CBC63")}}
        <br>
        {{hexToUniverseAddress("0x520E00F35CAC62")}}
        --->
        
        <form @submit.prevent="transformSave(inputJson)">
            <base-input v-model="inputJson" :stacked="true" type="textarea">Paste your save file JSON below</base-input>

            <base-input v-model="systemCount">
                systemCount
                <template v-slot:note>How many systems the script will put bases in</template>
            </base-input>

            <h3>Initial Address</h3>
            <p>Step size indicates how much is added to the value after each iteration of the loop.</p>

            <div class="flex">
                <div>
                    <base-input v-model="initialAddress.GalacticAddress.PlanetIndex">PlanetIndex</base-input>
                    <base-input v-model="initialAddress.GalacticAddress.SolarSystemIndex">SolarSystemIndex</base-input>
                    <base-input v-model="initialAddress.RealityIndex">RealityIndex</base-input>
                    <base-input v-model="initialAddress.GalacticAddress.VoxelY">VoxelY</base-input>
                    <base-input v-model="initialAddress.GalacticAddress.VoxelZ">VoxelZ</base-input>
                    <base-input v-model="initialAddress.GalacticAddress.VoxelX">VoxelZ</base-input>
                </div>

                <div>
                    <base-input v-model="stepSizes.PlanetIndex" label-width="80px">step size</base-input>
                    <base-input v-model="stepSizes.SolarSystemIndex" label-width="80px">step size</base-input>
                    <base-input v-model="stepSizes.RealityIndex" label-width="80px">step size</base-input>
                    <base-input v-model="stepSizes.VoxelY" label-width="80px">step size</base-input>
                    <base-input v-model="stepSizes.VoxelZ" label-width="80px">step size</base-input>
                    <base-input v-model="stepSizes.VoxelX" label-width="80px">step size</base-input>
                </div>
            </div>

            <div class="smaller">
                <button type="button" @click="randomizeInitialAddress()">Randomize initial address</button>
            </div>
            
            <div>
                <button>Modify Save</button>
                <button type="button" @click="createSave()">Create New Save</button>
            </div>
        </form>
    </div>
</template>