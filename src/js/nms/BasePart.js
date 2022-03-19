import * as THREE from 'three';
import * as basePartIndex from '@/js/nms/basePartIndex.js';

class BasePart extends THREE.Mesh{
    ObjectID = "x";
    Position = [0,0,0];
    Up = [0,1,0];
    At = [0,0,1];
    UserData = 0;
    at = new THREE.Vector3()

    constructor(ObjectID, position, up, at){
        let geometry = basePartIndex.getGeometry(ObjectID);
        
        let meshOffset = basePartIndex.getMeshOffset(ObjectID);

        if(meshOffset){
            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(meshOffset[0], meshOffset[1], meshOffset[2]));
        }

        let material = new THREE.MeshStandardMaterial( { color: 0xDDEEFF } );

        super(geometry, material);

        this.castShadow = true;
        this.receiveShadow = true;

        if(position){
            this.Position = position;
            this.position.fromArray(position);
        }
        
        if(up){
            this.Up = up;
            this.up.fromArray(up);
        }

        if(at){
            this.At = at;
            this.at.fromArray(at);

            let lookAtObj = new THREE.Object3D();
            lookAtObj.position.fromArray(this.position.toArray());

            lookAtObj.translateOnAxis(this.at, 1);

            this.lookAt(lookAtObj.position);
        }

        if(basePartIndex.getIsWire(ObjectID)){
            this.scale.set(1, 1, this.at.length());

            console.log(this.At);
        }

        this.attach(new THREE.ArrowHelper(this.up.clone().normalize(), this.position.clone(), 5));
        this.attach(new THREE.ArrowHelper(this.at.clone().normalize(), this.position.clone(), 5));
    }

    fromJson(json){
        let inputPart = JSON.parse(json);

        let clone = new BasePart(inputPart.ObjectID, inputPart.Position, inputPart.Up, inputPart.At);

        return clone;
    }
};

export default BasePart;