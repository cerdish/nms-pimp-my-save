const randUniverseAddress = ()=> {
    return {
        RealityIndex: randNum(0,256),
        GalacticAddress: {
            VoxelX: randNum(-2048, 2048),
            VoxelY: randNum(-128, 128),
            VoxelZ: randNum(-2048, 2048),
            SolarSystemIndex: randNum(1, 4096),
            PlanetIndex: 1,
        },
    }
}

const universeAddressToHex = (universeAddress)=> {
    let hex = universeAddress.GalacticAddress.PlanetIndex.toString(16);
    hex += ("000" + universeAddress.GalacticAddress.SolarSystemIndex.toString(16)).slice(-3);
    hex += ("00" + universeAddress.RealityIndex.toString(16)).slice(-2);
    hex += ("00" + (universeAddress.GalacticAddress.VoxelY + 128).toString(16)).slice(-2);
    hex += ("000" + (universeAddress.GalacticAddress.VoxelZ + 2048).toString(16)).slice(-3);
    hex += ("000" + (universeAddress.GalacticAddress.VoxelX + 2048).toString(16)).slice(-3);

    return "0x" + hex.toUpperCase();
}

const randNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export { randUniverseAddress, universeAddressToHex }