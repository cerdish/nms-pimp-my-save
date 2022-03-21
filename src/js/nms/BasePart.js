import * as THREE from 'three';
import * as basePartIndex from '@/js/nms/basePartIndex.js';

class BasePart extends THREE.Mesh{
    ObjectID = "x";
    Position = [0,0,0];
    Up = [0,1,0];
    At = [0,0,1];
    UserData = 0;
    at = new THREE.Vector3()
    isBasePart = true;

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

        if(ObjectID) this.ObjectID = ObjectID;

        if(position){
            this.Position = position;
        }

        this.position.fromArray(this.Position);
        
        if(up){
            this.Up = up;
        }

        this.up.fromArray(this.Up);

        if(at){
            this.At = at;

            console.log("at found",at)
            
            let lookAtObj = new THREE.Object3D();
            lookAtObj.position.fromArray(this.position.toArray());
            
            lookAtObj.translateOnAxis(new THREE.Vector3().fromArray(at), 1);
            
            this.lookAt(lookAtObj.position);
        }

        this.at.fromArray(this.At);
        
        let scale = this.at.length();

        if(basePartIndex.getIsWire(ObjectID)){
            this.scale.set(1, 1, scale);
        }else{
            this.scale.set(scale, scale, scale);

            this.attach(new THREE.ArrowHelper(this.up.clone().normalize(), this.position.clone(), 2));
            this.attach(new THREE.ArrowHelper(this.at.clone().normalize(), this.position.clone(), 2));
        }

    }

    fromJson(json){
        let inputPart = JSON.parse(json);

        let clone = new BasePart(inputPart.ObjectID, inputPart.Position, inputPart.Up, inputPart.At);

        return clone;
    }

    toJson(){
        return  {
            ObjectID: this.ObjectID,
            Position: this.position.toArray(),
            Up: this.up.toArray(),
            At: this.at.toArray(),
            UserData: this.UserData,
            Timestamp: Math.round(new Date() / 1000) - i
        }
    }
};

export default BasePart;