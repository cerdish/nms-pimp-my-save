import * as THREE from 'three';

const floorWidth = 5.33333;
const wallHeight = 3.33333;

const index = {
    "^U_EXTRACTOR_S":{
        dimensions:[floorWidth / 2, wallHeight * 2, floorWidth / 2],
        meshOffset:[0, wallHeight, 0]
    },
    "^U_GENERATOR_S":{
        dimensions:[floorWidth / 2, wallHeight * 2, floorWidth / 2],
        meshOffset:[0, wallHeight, 0]
    },
    "^U_SILO_S":{
        dimensions:[floorWidth / 2, wallHeight * 2, floorWidth / 2],
        meshOffset:[0, wallHeight, 0]
    },
    "^T_FLOOR":{
        dimensions:[floorWidth, 0.275 / 2, floorWidth],
        meshOffset:[0, 0.275 / 4, 0]
    },
    "^F_ROOF5":{
        dimensions:[floorWidth, wallHeight / 4, floorWidth],
        meshOffset:[0, wallHeight / 8, 0]
    },
    "^T_FLOOR_Q":{
        dimensions:[floorWidth / 2, 0.275 / 2, floorWidth / 2],
        meshOffset:[0, 0.275 / 4, 0]
    },
    "^T_WALL":{
        dimensions:[floorWidth, wallHeight, 0.275 / 2],
        meshOffset:[0, wallHeight / 2, 0]
    },
    "^T_WALL_H":{
        dimensions:[floorWidth / 2, wallHeight, 0.275 / 2],
        meshOffset:[0, wallHeight / 2, 0]
    },
    "^T_RAMP_H":{
        dimensions:[floorWidth / 2, wallHeight, floorWidth],
        meshOffset:[0, wallHeight / 2, 0]
    },
    "^T_WALL_Q":{
        dimensions:[floorWidth, wallHeight / 4, 0.275 / 2],
        meshOffset:[0, wallHeight / 8, 0]
    },
    "^U_POWERLINE":{
        dimensions:[0.3, 0.3, 1],
        meshOffset:[0, 0, 0.5],
        isWire:true
    },
    "^U_PORTALLINE":{
        dimensions:[0.3, 0.3, 1],
        meshOffset:[0, 0, 0.5],
        isWire:true
    },
    "^U_PIPELINE":{
        dimensions:[0.3, 0.3, 1],
        meshOffset:[0, 0, 0.5],
        isWire:true
    },
    "^TELEPORTER":{
        dimensions:[floorWidth, floorWidth, floorWidth / 4],
        meshOffset:[0, wallHeight , 0]
    },
    "^BASE_FLAG":{
        dimensions:[floorWidth / 2, wallHeight / 2, floorWidth / 2],
        meshOffset:[0, wallHeight / 4, 0]
    },
    "^BUILDSAVE":{
        dimensions:[floorWidth / 2, wallHeight / 4, floorWidth / 2],
        meshOffset:[0, wallHeight / 8, 0]
    },
    "^U_MINIPORTAL":{
        dimensions:[floorWidth / 2, wallHeight, floorWidth / 2],
        meshOffset:[0, wallHeight / 2, 0],
        geometry:new THREE.CylinderGeometry( floorWidth / 4, floorWidth / 4, wallHeight, 32 )
    },
    "^GARAGE_MECH":{
        dimensions:[floorWidth * 1.5, wallHeight / 4, floorWidth * 1.5],
        meshOffset:[0, wallHeight / 8, 0],
        geometry:new THREE.CylinderGeometry( floorWidth * 1.5 / 2, floorWidth * 1.5 / 2, wallHeight / 4, 32 )
    },
    "^BUILDDOOR_WATER":{
        dimensions:[floorWidth / 2, wallHeight / 4, floorWidth / 2],
        meshOffset:[0, wallHeight / 8, 0],
        geometry:new THREE.CylinderGeometry( floorWidth / 4, floorWidth / 4, wallHeight / 4, 32 )
    },
    "^CUBEFRAME":{
        dimensions:[4, 4, 4],
        meshOffset:[0, 2, 0]
    },
    "^BUILDTERMINAL":{
        dimensions:[floorWidth, wallHeight / 2, floorWidth / 2],
        meshOffset:[0, wallHeight / 4, 0]
    },
    "^S_RUG0":{
        dimensions:[floorWidth, 0.1, floorWidth * 2]
    },
    "^BASE_LAVA3":{
        dimensions:[floorWidth / 2, wallHeight / 2, floorWidth / 4],
        meshOffset:[0, wallHeight / 4, 0]
    },
    "^BUILDSOFA":{
        dimensions:[floorWidth - 2, wallHeight / 4, floorWidth / 4],
        meshOffset:[0, wallHeight / 8, 0]
    },
    "^BUILDLANDINGPAD":{
        dimensions:[floorWidth * 5, 0.1, wallHeight / 4, floorWidth * 5],
        meshOffset:[0, wallHeight / 8, 0]
    },
    "^BASE_TREE02":{
        dimensions:[floorWidth / 16, 0.1, wallHeight * 3, floorWidth / 16],
        meshOffset:[0, wallHeight * 1.5, 0],
        geometry:new THREE.CylinderGeometry( floorWidth / 16, floorWidth / 16, wallHeight * 3, 32 )
    }
};

index["^T_GFLOOR"] = index["^T_FLOOR"]
index["^T_WALL_WIN3"] = index["^T_WALL"]
index["^T_DOOR"] = index["^T_WALL"]
index["^T_DOOR_H"] = index["^T_WALL_H"]
index["^BUILD_REFINER2"] = index["^U_MINIPORTAL"]

function getDimensions(ObjectID){
    return getVar(ObjectID, "dimensions", [floorWidth, wallHeight, floorWidth]);
}

function getMeshOffset(ObjectID){
    return getVar(ObjectID, "meshOffset", false);
}

function getGeometry(ObjectID){
    let geo = getVar(ObjectID, "geometry", getDefaultGeometry(ObjectID));

    return geo.clone();
}

function getDefaultGeometry(ObjectID){
    let dimensions = getDimensions(ObjectID);
        
    let geometry = new THREE.BoxGeometry(dimensions[0], dimensions[1], dimensions[2]);

    return geometry;
}

function getIsWire(ObjectID){
    return getVar(ObjectID, "isWire", false);
}

function getVar(ObjectID, key, _default){
    if(ObjectID && !index[ObjectID]) console.log("missing part", ObjectID);

    if(ObjectID && index[ObjectID] && index[ObjectID][key]) return index[ObjectID][key];

    return _default;
}

export { index, getDimensions, getMeshOffset, getGeometry, getIsWire };