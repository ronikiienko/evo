import {Rand} from "../utils/Rand";
import {Rang} from "../utils/Rang";
import {Numb} from "../utils/Numb";

const evolvableTraitsTypes = {
    maxSpeed: 'maxSpeed',
    size: 'size'
}

type EvolvableTraitsObj = {
    maxSpeed: number,
    size: number
}
export class EvolvableTraits {
    evolvableTraitsObj: EvolvableTraitsObj
    constructor(init: EvolvableTraitsObj) {
        this.evolvableTraitsObj = init
    }
    clone(): EvolvableTraits {
        const clonedEvolvableTraitsObj: EvolvableTraitsObj = {
            maxSpeed: this.evolvableTraitsObj.maxSpeed,
            size: this.evolvableTraitsObj.size
        };

        return new EvolvableTraits(clonedEvolvableTraitsObj);
    }
    evolve() {
        const newEvolvableTraits = this.clone()
        const evolvableTraitsKeys = Object.keys(newEvolvableTraits.evolvableTraitsObj)
        const evolvedKey = evolvableTraitsKeys[Rand.inRange(new Rang(0, evolvableTraitsKeys.length - 1))]
        switch (evolvedKey) {
            case evolvableTraitsTypes.maxSpeed: {
                newEvolvableTraits.evolvableTraitsObj.maxSpeed = Numb.constrain(newEvolvableTraits.evolvableTraitsObj.maxSpeed + 0.1, 0, 1)
            }
            break;
            case evolvableTraitsTypes.size: {
                newEvolvableTraits.evolvableTraitsObj.size = Numb.constrain(newEvolvableTraits.evolvableTraitsObj.size + newEvolvableTraits.evolvableTraitsObj.size * 0.5 * Rand.sign(), 0, 1)
            }
        }
        return newEvolvableTraits
    }

    get maxSpeed() {
        return this.evolvableTraitsObj.maxSpeed
    }
    get maxSpeedReal() {
        return (this.evolvableTraitsObj.maxSpeed + 0.001) * 400
    }
    get size() {
        return this.evolvableTraitsObj.size
    }
    get sizeReal() {
        return Math.max((this.evolvableTraitsObj.size + 0.001) * 50, 1)
    }
}
