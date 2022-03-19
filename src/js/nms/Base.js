import * as THREE from 'three';
import BasePart from '@/js/nms/BasePart.js';

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
        })

        return this;
    }
};

export default Base;