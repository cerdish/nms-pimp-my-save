const randUniverseAddress = ()=> {
    return {
        RealityIndex: randNum(0,256),
        GalacticAddress: {
            VoxelX: randNum(-2048, 2048),
            VoxelY: randNum(-128, 128),
            VoxelZ: randNum(-2048, 2048),
            SolarSystemIndex: randNum(1, 4096),
            PlanetIndex: 1,
        }
    }
}

const universeAddressToHex = (universeAddress)=> {
    let x = universeAddress.GalacticAddress.VoxelX;
    let y = universeAddress.GalacticAddress.VoxelY;
    let z = universeAddress.GalacticAddress.VoxelZ;

    if(y < 0) y = 256 + y;
    if(x < 0) x = 4096 + x;
    if(z < 0) z = 4096 + z;

    let hex = universeAddress.GalacticAddress.PlanetIndex.toString(16);
    hex += ("000" + universeAddress.GalacticAddress.SolarSystemIndex.toString(16)).slice(-3);
    hex += ("00" + universeAddress.RealityIndex.toString(16)).slice(-2);
    hex += ("00" + y.toString(16)).slice(-2);
    hex += ("000" + z.toString(16)).slice(-3);
    hex += ("000" + x.toString(16)).slice(-3);

    return "0x" + hex.toUpperCase();
}

const hexToUniverseAddress = (hex)=> {
    hex = hex.slice(-14);

    let x = parseInt(hex.slice(-3), 16);
    let y = parseInt(hex.slice(6, 8), 16);
    let z = parseInt(hex.slice(8, 11), 16);

    if(y > 128) y = (256 - y) * -1;
    if(x > 2048) x = (2048 - x) * -1;
    if(z > 2048) z = (2048 - z) * -1;

    return {
        RealityIndex: parseInt(hex.slice(4, 6), 16),
        GalacticAddress: {
            VoxelX: x,
            VoxelY: y,
            VoxelZ: z,
            SolarSystemIndex: parseInt(hex.slice(1, 4), 16),
            PlanetIndex: parseInt(hex.slice(0, 1), 16),
        }
    }
}

const randNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export { randUniverseAddress, universeAddressToHex, hexToUniverseAddress }