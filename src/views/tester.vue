<script setup>
    import { ref } from 'vue';
    import defaultShip from '@/js/nms/blankShip.json';
    import defaultMultiTool from '@/js/nms/blankMultitool.json';
    import * as _ from 'lodash';

    const input = ref("");

    const output = ref("");

    const transform = ()=> {
        let saveData = {};

        try{
            saveData = JSON.parse(input.value);

            saveData.PlayerStateData.MissionProgress.forEach(function(m){
                m.Progress = 999;
            })

            saveData.PlayerStateData.CurrentMissionID = "^";
            saveData.PlayerStateData.RevealBlackHoles = true;
            saveData.PlayerStateData.HasAccessToNexus = true;
            saveData.PlayerStateData.MissionRecurrences = [];

            saveData.PlayerStateData.HoloExplorerInteraction.value = 999;
            saveData.PlayerStateData.HoloScepticInteraction.value = 999;
            saveData.PlayerStateData.HoloNooneInteraction.value = 999;

            saveData.PlayerStateData.Multitools[0] = defaultMultiTool;
            saveData.PlayerStateData.Inventory.Slots = [];
            saveData.PlayerStateData.Inventory_Cargo.Slots = [];
            saveData.PlayerStateData.WeaponInventory.Slots = [];
            saveData.PlayerStateData.ShipInventory.Slots = [];
            saveData.PlayerStateData.ShipOwnership[0] = defaultShip;
            
        }catch(e){
            console.log(e);

            saveData = e.message;
        }

        output.value = JSON.stringify(saveData, null, 2);
    }
</script>

<template>
    <div>
        <form @submit.prevent="transform()">
            <div>
                <base-input :stacked="true" v-model="input" type="textarea">Input</base-input>
            </div>

            <button>Transform</button>
        </form>

        <hr>

        <div>
            <base-input :stacked="true" v-model="output" type="textarea">Output</base-input>
        </div>
    </div>
</template>