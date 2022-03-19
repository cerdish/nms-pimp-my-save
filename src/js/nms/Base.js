import * as THREE from 'three';
import BasePart from '@/js/nms/BasePart.js';
import * as _ from 'lodash';

class Base extends THREE.Group{
    constructor(base){
        super();
    }

    fromJson(json){
        let inputBase = JSON.parse(json);
        let self = this;

        inputBase.Objects.forEach(function(o){
            let part = new BasePart().fromJson(JSON.stringify(o));

            self.add(part);
        });

        return this;
    }

    getBaseParts(ObjectID, objects){
        objects = objects || this.children;

        let parts = _.filter(objects, function(o){
            return o.isBasePart && (o.ObjectID == ObjectID || !ObjectID);
        });

        let childParts = [];

        for(let i = 0; i < parts.length; i++){
            let p = parts[i];

            childParts = childParts.concat(this.getBaseParts(ObjectID, p.children));
        }

        parts = parts.concat(childParts);

        return parts;
    }

    toJson(){
        let base = {
            Objects: this.getBaseParts()
        };

        base.Objects = base.Objects.map(function(p){
            return {
                ObjectID: p.ObjectID,
                Position: p.position.toArray(),
                Up: p.up.toArray(),
                At: p.at.toArray(),
                UserData: p.UserData
            }
        })

        return JSON.stringify(base);
    }
};

export default Base;