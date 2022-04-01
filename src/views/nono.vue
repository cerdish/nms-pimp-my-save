<script setup>
    import { ref } from 'vue';
    import defaultSave from '@/js/nms/data/defaultSave.json';
    import defaultBase from '@/js/nms/data/defaultBase.json';
    import * as _ from 'lodash';
    import {saveAs} from 'file-saver';
    import {randUniverseAddress, universeAddressToHex} from '@/js/nms/utils.js';
    import Base from '@/js/nms/Base.js';
    import SaveFile from '@/js/nms/SaveFile.js';

    const input = ref({
        noShip:true,
        noMultitool:true,
        noStory:true
    });

    const createSave = ()=> {
        let save = new SaveFile(JSON.stringify(defaultSave));

        if(input.value.noStory){
            save.completeAllMissions();
        }

        if(input.value.noShip){
            save.removeShips();
        }

        if(input.value.noMultitool){
            save.removeMultitools();
        }

        save.clearInventor().randomizeLocation();

        save.PlayerStateData.GameStartAddress1 = save.PlayerStateData.UniverseAddress;
        save.PlayerStateData.GameStartAddress2 = save.PlayerStateData.UniverseAddress;

        save.PlayerStateData.Inventory.Slots = [
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
        
        let base = new Base().fromJson(JSON.stringify(defaultBase)).clear();

        base.setGalacticAddress(universeAddressToHex(save.PlayerStateData.UniverseAddress)).setName("Starting Planet");

        base.addParts([base.createPart("^BASE_FLAG").setPosition([1, 1, 1])]);
            
        save.PlayerStateData.PersistentPlayerBases = [JSON.parse(base.toJson())];

        var blob = new Blob([JSON.stringify(save, null, 2)], {type: "application/json;charset=utf-8"});
        
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