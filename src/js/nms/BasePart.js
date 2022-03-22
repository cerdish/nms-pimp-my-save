import * as THREE from 'three';
import * as basePartIndex from '@/js/nms/basePartIndex.js';

class BasePart extends THREE.Object3D{
    ObjectID = "x";
    UserData = 0;
    Timestamp = 1;
    at = new THREE.Vector3(0,0,1);
    isBasePart = true;

    #mesh = null;

    constructor(ObjectID, position, up, at){
        super()

        if(ObjectID){
            this.setObjectID(ObjectID);
        }else{
            this.setObjectID("x");
        }

        if(position){
            this.setPosition(position);
        }
        
        if(up){
            this.setUp(up);
        }else{
            this.setUp([0, 1, 0]);
        }

        if(at){
            this.setAt(at);
        }

        let scale = this.at.length();

        this.setScale(scale);
    }

    setPosition(position){
        this.position.fromArray(position);

        return this;
    }

    setScale(scale){
        if(basePartIndex.getIsWire(this.ObjectID)){
            this.scale.set(1, 1, scale);
        }else{
            this.scale.set(scale, scale, scale);
        }

        return this;
    }

    setUp(up){
        this.up.fromArray(up);

        return this; 
    }

    setAt(at){
        let lookAtObj = new THREE.Object3D();
        lookAtObj.position.fromArray(this.position.toArray());
        
        lookAtObj.translateOnAxis(new THREE.Vector3().fromArray(at), 1);
        
        this.lookAt(lookAtObj.position);

        this.at.fromArray(at);
    }

    setObjectID(ObjectID){
        this.ObjectID = ObjectID;

        this.buildMesh();

        return this;
    }

    buildMesh(){
        let geometry = basePartIndex.getGeometry(this.ObjectID);
        
        let meshOffset = basePartIndex.getMeshOffset(this.ObjectID);

        if(meshOffset){
            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(meshOffset[0], meshOffset[1], meshOffset[2]));
        }

        let material = new THREE.MeshStandardMaterial( { color: 0xDDEEFF } );

        this.#mesh = new THREE.Mesh(geometry, material);

        this.#mesh.castShadow = true;
        this.#mesh.receiveShadow = true;

        this.clear();

        this.attach(this.#mesh);

        if(!basePartIndex.getIsWire(this.ObjectID)){
            this.attach(new THREE.ArrowHelper(this.up.clone().normalize(), this.position.clone(), 2));
            this.attach(new THREE.ArrowHelper(this.at.clone().normalize(), this.position.clone(), 2));
        }

        return this;
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
            Timestamp: Math.round(new Date() / 1000) - (60*60*24)
        }
    }

    clone(ObjectID, position, up, at){
        ObjectID = ObjectID || this.ObjectID;
        position = position || this.position.toArray();
        up = up || this.up.toArray();
        at = at || this.at.toArray();

        return new BasePart(ObjectID, position, up, at);
    }

    cloneOnAxis(axis, count, offset, totalOffset){
        if(totalOffset) offset = totalOffset / count;

        let clones = [];

        for(let i = 0; i < count; i++){
            let moveDistance = i * offset;

            let clone = this.clone();
            clone.translateOnAxis(axis, moveDistance);

            clones.push(clone);
        }

        return clones;
    }

    cloneOnArc(axis, radius, count, arcDegrees, arcOffset, moveAxis){
        moveAxis = moveAxis || this.at;
        moveAxis = moveAxis.clone();

        let clones = [];

        let step = arcDegrees / count;

        for(let i = 0; i < count; i++){
        }

        return clones
    }
};

export default BasePart;