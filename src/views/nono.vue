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
                saveData.PlayerStateData.KnownProducts.push("^BUILDBEACON");
            }

            if(input.value.noShip){
                saveData.PlayerStateData.ShipOwnership[0] = blankShip;
                saveData.PlayerStateData.ShipInventory.Slots = [];
            }

            if(input.value.noMultitool){
                saveData.PlayerStateData.Multitools[0] = blankMultiTool;
                saveData.PlayerStateData.WeaponInventory.Slots = [];
            }

            saveData.PlayerStateData.Inventory.Slots = [
                {
                    "Type":{
                        "InventoryType":"Product"
                    },
                    "Id":"^BUILDSAVE",
                    "Amount":1,
                    "MaxAmount":1,
                    "DamageFactor":0.0,
                    "FullyInstalled":true,
                    "Index":{
                        "X":0,
                        "Y":0
                    }
                }
            ];

            saveData.PlayerStateData.Inventory_Cargo.Slots = [];

            saveData.PlayerStateData.UniverseAddress = randUniverseAddress();
            saveData.PlayerStateData.GameStartAddress1 = saveData.PlayerStateData.UniverseAddress;
            saveData.PlayerStateData.GameStartAddress2 = saveData.PlayerStateData.UniverseAddress;
            saveData.SpawnStateData.PlayerPositionInSystem = [];

            let starterBase = JSON.parse(JSON.stringify(defaultBase));

            let base = new Base();

            starterBase.GalacticAddress = universeAddressToHex(saveData.PlayerStateData.UniverseAddress);
            starterBase.Name = "Starting Planet";

            let baseComputer = base.createPart("^BASE_FLAG");
            baseComputer.position.set(1, 1, 1);

            base.addParts([ baseComputer ]);

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
    <div class="margin">
        <div>
            <h2>
                The No No No Challenges
            </h2>

            <p>
                Start your next No Man's Sky playthrough in a random galaxy with nothing but your senses to guide you. To begin, make your way to the station teleporter and teleport to "Starting Planet".
            </p>

            <ul>
                <li>
                    No Multitool - You will have to search the planet for generous entities, or punch your way to riches. Can you even gather enough resources to stay alive?
                </li>

                <li>
                    No Ship - There's no ship waiting to take you to the starts. You are going to have find one or buy one, so get that multitool and start scanning.
                </li>

                <li>
                    No Story - All game mechanics are unlocked, but story missions or tutorials will be available. Only your knownledge of standard game mechanics can advance your character.
                </li>
            </ul>
        </div>

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