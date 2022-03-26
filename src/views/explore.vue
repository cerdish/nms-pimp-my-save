<script setup>
    import { ref } from 'vue';
    import SaveFile from '@/js/nms/SaveFile'
    import defaultSave from '@/js/nms/data/defaultSave.json'
    import { hexToUniverseAddress, randUniverseAddress } from '@/js/nms/utils.js';

    const inputJson = ref("");

    const transformSave = (json)=> {
        let save = new SaveFile(json);

        for(let i = -127; i < 128; i++){
            let ua = JSON.parse(JSON.stringify(save.PlayerStateData.UniverseAddress));

            ua.RealityIndex = 0;
            ua.GalacticAddress.SolarSystemIndex = Math.round(Math.random() * 64);
            ua.GalacticAddress.VoxelX = Math.round(Math.random() * 1024);
            ua.GalacticAddress.VoxelY = i;
            ua.GalacticAddress.VoxelZ = Math.round(Math.random() * 128);

            for(let j = 1; j < 4; j++){
                ua.GalacticAddress.PlanetIndex = j;
                
                save.addGhostBase(ua, ua.GalacticAddress.PlanetIndex + "," + ua.RealityIndex + "," + ua.GalacticAddress.SolarSystemIndex + "," + ua.GalacticAddress.VoxelX + "," + ua.GalacticAddress.VoxelY + "," + ua.GalacticAddress.VoxelZ );
            }


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
</script>

<template>
    <div class="margin">
        <div>
            <h1>Explore the 'Verse</h1>
            <p>
                Add a series of bases to your save for exploration purposes. This is useful for exploring phatom stars or specific series of systems.
            </p>
        </div>

        {{hexToUniverseAddress("0x20B0000A5BFC7C")}}
        <br>
        {{hexToUniverseAddress("0x30B100F35CBC63")}}
        <br>
        {{hexToUniverseAddress("0x520E00F35CAC62")}}

        <form @submit.prevent="transformSave(inputJson)">
            <base-input v-model="inputJson" :stacked="true" type="textarea">Paste your save file JSON below</base-input>
            
            <div>
                <button>Modify Save</button>
                <button type="button" @click="createSave()">Create New Save</button>
            </div>
        </form>
    </div>
</template>