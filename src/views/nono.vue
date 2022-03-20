<script setup>
    import { ref } from 'vue';
    import defaultSave from '@/js/nms/defaultSave.json';
    import blankShip from '@/js/nms/blankShip.json';
    import blankMultiTool from '@/js/nms/blankMultitool.json';
    import defaultBase from '@/js/nms/defaultBase.json';
    import * as _ from 'lodash';
    import {saveAs} from 'file-saver'
    import {randUniverseAddress, universeAddressToHex} from '@/js/nms/utils.js';
    import Base from '@/js/nms/Base.js';

    const input = ref({
        noShip:true,
        noMultitool:true,
        noStory:true
    });

    const createSave = ()=> {
        let saveData = {};

        try{
            saveData = JSON.parse(JSON.stringify(defaultSave));

            if(input.value.noStory){
                saveData.PlayerStateData.MissionProgress.forEach(function(m){
                    m.Progress = 999;
                });

                let global_stats = _.find(saveData.PlayerStateData.Stats, {GroupId: "^GLOBAL_STATS"});
                let see_station = _.find(global_stats.Stats, {Id: "^STATION_MARKER"});

                console.log(see_station)

                see_station.Value.IntValue = 1;

                saveData.PlayerStateData.CurrentMissionID = "^";
                saveData.PlayerStateData.RevealBlackHoles = true;
                saveData.PlayerStateData.HasAccessToNexus = true;
                saveData.PlayerStateData.MissionRecurrences = [];
                saveData.PlayerStateData.FirstAtlasStationDiscovered = true;

                saveData.PlayerStateData.HoloExplorerInteraction.value = 999;
                saveData.PlayerStateData.HoloScepticInteraction.value = 999;
                saveData.PlayerStateData.HoloNooneInteraction.value = 999;

                saveData.PlayerStateData.KnownTech.push("^HYPERDRIVE");
                saveData.PlayerStateData.KnownTech.push("^TERRAINEDITOR");
                saveData.PlayerStateData.KnownProducts.push("^ANTIMATTER");
                saveData.PlayerStateData.KnownProducts.push("^AM_HOUSING");
                saveData.PlayerStateData.KnownProducts.push("^BASE_FLAG");
            }

            if(input.value.noShip){
                saveData.PlayerStateData.ShipOwnership[0] = blankShip;
                saveData.PlayerStateData.ShipInventory.Slots = [];
            }

            if(input.value.noMultitool){
                saveData.PlayerStateData.Multitools[0] = blankMultiTool;
                saveData.PlayerStateData.WeaponInventory.Slots = [];
            }

            saveData.PlayerStateData.Inventory.Slots = [];
            saveData.PlayerStateData.Inventory_Cargo.Slots = [];

            saveData.PlayerStateData.UniverseAddress = randUniverseAddress();
            saveData.PlayerStateData.GameStartAddress1 = saveData.PlayerStateData.UniverseAddress;
            saveData.PlayerStateData.GameStartAddress2 = saveData.PlayerStateData.UniverseAddress;
            saveData.SpawnStateData.PlayerPositionInSystem = [];

            let starterBase = JSON.parse(JSON.stringify(defaultBase));

            starterBase.GalacticAddress = universeAddressToHex(saveData.PlayerStateData.UniverseAddress);
            starterBase.Name = "Teleport here";

            let base = new Base();
            let teleporter = base.createPart("^TELEPORTER");
            teleporter.position.set(0, 0, 5.33333);

            let floor = base.createPart("^T_FLOOR");
            floor.position.set(0, 0, 10.66666);
            floor.at.set(0,0,4);
            floor.up.set(0,0,4);

            base.addParts([base.createPart("^BASE_FLAG"), floor, teleporter]);

            starterBase.Objects = JSON.parse(base.toJson()).Objects
            
            saveData.PlayerStateData.PersistentPlayerBases = [starterBase];
        }catch(e){
            console.log(e);

            saveData = e.message;
        }

        var blob = new Blob([JSON.stringify(saveData, null, 2)], {type: "application/json;charset=utf-8"});
        
        saveAs(blob, "nonoSave" + Math.round(new Date() / 1000) + ".json");
    }
</script>

<template>
    <div>
        <form @submit.prevent="createSave()">
            <base-checkbox v-model="input.noShip">No Ship</base-checkbox>
            <base-checkbox v-model="input.noMultitool">No Multitool</base-checkbox>
            <base-checkbox v-model="input.noStory">No Story</base-checkbox>

            <div>
                <button>Create Save</button>
            </div>
        </form>
    </div>
</template>