import * as _ from 'lodash';
import blankShip from '@/js/nms/data/blankShip.json';
import blankMultiTool from '@/js/nms/data/blankMultiTool.json';
import expandedSlotIndicies from '@/js/nms/data/expandedSlotIndicies.json';
import shipTech from '@/js/nms/data/shipTech.json';
import shipBaseStats from '@/js/nms/data/shipBaseStats.json';
import multitoolTech from '@/js/nms/data/multitoolTech.json';
import multitoolBaseStats from '@/js/nms/data/multitoolBaseStats.json';
import { randUniverseAddress, universeAddressToHex } from '@/js/nms/utils.js';
import Base from '@/js/nms/Base.js';
import defaultBase from '@/js/nms/data/defaultBase.json';
import allTech from '@/js/nms/data/allTech.json';
import allProducts from '@/js/nms/data/allProducts.json';
import allWordGroups from '@/js/nms/data/allWordGroups.json';
import exosuitInventory from '@/js/nms/data/exosuitInventory.json';
import exosuitTech from '@/js/nms/data/exosuitTech.json';
import exosuitCargo from '@/js/nms/data/exosuitCargo.json';

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
            //console.log(mt)
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

    upgradeShipTech(){
        this.PlayerStateData.ShipOwnership.forEach((ship) => {
            ship.Inventory_TechOnly.Slots = shipTech;
            ship.Inventory.Slots = _.filter(ship.Inventory.Slots, function(s){
                //console.log(s)
                return s.Type.InventoryType != "Technology";
            });
        });

        return this;
    }

    upgradeShipStats(){
        this.PlayerStateData.ShipOwnership.forEach((ship) => {
            ship.Inventory_TechOnly.BaseStatValues = shipBaseStats;
        });

        return this;
    }

    upgradeMultitoolTech(){
        this.PlayerStateData.Multitools.forEach((mt) => {
            mt.Store.Slots = multitoolTech;
        });

        return this;
    }

    upgradeMultitoolStats(){
        this.PlayerStateData.Multitools.forEach((mt) => {
            mt.Store.BaseStatValues = multitoolBaseStats;
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

    addGhostBase(ua, name){
        let base = new Base().fromJson(JSON.stringify(defaultBase)).clear();

        base.setGalacticAddress(universeAddressToHex(ua)).setName("gb-" + name);

        base.addParts([base.createPart("^BASE_FLAG").setPosition([1, 1, 1]), base.createPart("^BUILDLANDINGPAD").setPosition([1, 0.1, 1]), base.createPart("^TELEPORTER").setPosition([10, 1, 1])]);
        
        this.PlayerStateData.PersistentPlayerBases.push(JSON.parse(base.toJson()));

        return this;
    }

    removeGhostBases(){
        this.PlayerStateData.PersistentPlayerBases = _.filter(this.PlayerStateData.PersistentPlayerBases, function(b){
            return b.Name.indexOf("gb-") > -1;
        });

        return this;
    }

    addAllTech(){
        this.PlayerStateData.KnownProducts = allTech;

        return this;
    }
    
    addAllProducts(){
        this.PlayerStateData.KnownProducts = allProducts;

        return this;
    }
    
    addAllWords(){
        this.PlayerStateData.KnownWordGroups = allWordGroups;

        return this;
    }

    upgradeSuit(){
        this.PlayerStateData.Inventory.Slots = exosuitInventory;
        this.PlayerStateData.Inventory_TechOnly.Slots = exosuitTech;
        this.PlayerStateData.Inventory_Cargo.Slots = exosuitCargo;

        return this;
    }
}

export {SaveFile as default};