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

            self.attach(part);
        });

        return this;
    }

    addParts(parts){
        var self = this;

        parts.forEach(function(o){
            self.attach(o);
        });
    }

    createPart(ObjectID){
        return new BasePart(ObjectID);
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

        base.Objects = base.Objects.map(function(p, i){
            return p.toJson()
        })

        return JSON.stringify(base);
    }
};

export default Base;