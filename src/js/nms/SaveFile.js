import * as _ from 'lodash';
import blankShip from '@/js/nms/data/blankShip.json';
import blankMultiTool from '@/js/nms/data/blankMultiTool.json';
import expandedSlotIndicies from '@/js/nms/data/expandedSlotIndicies.json';
import { randUniverseAddress, universeAddressToHex } from '@/js/nms/utils.js';
import Base from '@/js/nms/Base.js';
import defaultBase from '@/js/nms/data/defaultBase.json';

class SaveFile{
    constructor(json){
        if(json){
            let parsedSave = JSON.parse(json);

            let self = this;

            _.forEach(parsedSave, function(value, key){
                self[key] = value;
            });
        }
    }

    completeAllMissions(){
        this.PlayerStateData.MissionProgress.forEach(function(m){
            m.Progress = 999;
        });

        let global_stats = _.find(this.PlayerStateData.Stats, {GroupId: "^GLOBAL_STATS"});
        let see_station = _.find(global_stats.Stats, {Id: "^STATION_MARKER"});

        see_station.Value.IntValue = 1;

        this.PlayerStateData.CurrentMissionID = "^";
        this.PlayerStateData.RevealBlackHoles = true;
        this.PlayerStateData.HasAccessToNexus = true;
        this.PlayerStateData.MissionRecurrences = [];
        this.PlayerStateData.FirstAtlasStationDiscovered = true;

        this.PlayerStateData.HoloExplorerInteraction.value = 999;
        this.PlayerStateData.HoloScepticInteraction.value = 999;
        this.PlayerStateData.HoloNooneInteraction.value = 999;

        this.PlayerStateData.KnownTech.push("^HYPERDRIVE");
        this.PlayerStateData.KnownTech.push("^TERRAINEDITOR");
        this.PlayerStateData.KnownProducts.push("^ANTIMATTER");
        this.PlayerStateData.KnownProducts.push("^AM_HOUSING");
        this.PlayerStateData.KnownProducts.push("^BASE_FLAG");

        return this;
    }

    removeShips(){
        this.PlayerStateData.ShipOwnership = this.PlayerStateData.ShipOwnership.map(function(ship){
            return blankShip;
        });

        this.PlayerStateData.ShipInventory.Slots = [];
        
        return this;
    }

    removeMultitools(){
        this.PlayerStateData.Multitools = this.PlayerStateData.Multitools.map(function(mt){
            return blankMultiTool;
        });

        this.PlayerStateData.WeaponInventory.Slots = [];
        
        return this;
    }

    clearInventor(){
        this.PlayerStateData.Inventory.Slots = [];
        this.PlayerStateData.Inventory_Cargo.Slots = [];

        return this;
    }

    randomizeLocation(){
        this.PlayerStateData.UniverseAddress = randUniverseAddress();
        this.SpawnStateData.PlayerPositionInSystem = [];

        return this;
    }

    updateStartLocation(){
        this.PlayerStateData.GameStartAddress1 = this.PlayerStateData.UniverseAddress;
        this.PlayerStateData.GameStartAddress2 = this.PlayerStateData.UniverseAddress;

        return this;
    }

    expandSuit(){
        this.expandValidSlotIndices(this.PlayerStateData.Inventory);
        this.expandValidSlotIndices(this.PlayerStateData.Inventory_Cargo);
        this.expandValidSlotIndices(this.PlayerStateData.Inventory_TechOnly);

        return this;
    }

    expandMultitools(){        
        this.PlayerStateData.Multitools.forEach((mt) => {
            console.log(mt)
            this.expandValidSlotIndices(mt.Store);
        });

        return this;
    }

    expandShips(){
        this.PlayerStateData.ShipOwnership.forEach((ship) => {
            this.expandValidSlotIndices(ship.Inventory);
            this.expandValidSlotIndices(ship.Inventory_TechOnly);
        });

        return this;
    }

    expandValidSlotIndices(item){
        item.ValidSlotIndices = expandedSlotIndicies;
        item.Class = {InventoryClass: "S"};
        item.Width = 8;
        item.Height = 6;

        return this;
    }

    addBase(ua, name){
        let base = new Base().fromJson(JSON.stringify(defaultBase)).clear();

        base.setGalacticAddress(universeAddressToHex(ua)).setName(name);

        base.addParts([base.createPart("^BASE_FLAG").setPosition([1, 1, 1])]);
        
        this.PlayerStateData.PersistentPlayerBases.push(JSON.parse(base.toJson()));

        return this;
    }
}

export {SaveFile as default};