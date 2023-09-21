import {Rand} from "../utils/Rand";
import {Rang} from "../utils/Rang";
import {Color} from "../utils/Color";
import {Numb} from "../utils/Numb";

const evolvableTraitsTypes = {
    maxHp: 'maxHp',
    strength: 'strength',
    size: 'size',
    color: 'color',
    visibilityRange: 'visibilityRange'
}

type EvolvableTraitsObj = {
    maxHp: number
    strength: number
    size: number
    color: Color
    visibilityRange: number
}
export class EvolvableTraits {
    evolvableTraitsObj: EvolvableTraitsObj
    constructor(init: EvolvableTraitsObj) {
        this.evolvableTraitsObj = init
    }
    clone(): EvolvableTraits {
        const clonedEvolvableTraitsObj: EvolvableTraitsObj = {
            maxHp: this.evolvableTraitsObj.maxHp,
            strength: this.evolvableTraitsObj.strength,
            size: this.evolvableTraitsObj.size,
            color: new Color(this.evolvableTraitsObj.color.rgba),
            visibilityRange: this.evolvableTraitsObj.visibilityRange
        };

        return new EvolvableTraits(clonedEvolvableTraitsObj);
    }
    evolve() {
        const newEvolvableTraits = this.clone()
        const evolvableTraitsKeys = Object.keys(newEvolvableTraits.evolvableTraitsObj)
        const evolvedKey = evolvableTraitsKeys[Rand.inRange(new Rang(0, evolvableTraitsKeys.length - 1))]
        switch (evolvedKey) {
            case evolvableTraitsTypes.maxHp: {
                newEvolvableTraits.evolvableTraitsObj.maxHp = Numb.constrain(newEvolvableTraits.evolvableTraitsObj.maxHp + 0.1 * Rand.sign(), 0, 1)
            }
            break;
            case evolvableTraitsTypes.size: {
                newEvolvableTraits.evolvableTraitsObj.size = Numb.constrain(newEvolvableTraits.evolvableTraitsObj.size + 5 * Rand.sign(), 1, 50)
            }
                break;
            case evolvableTraitsTypes.strength: {
                newEvolvableTraits.evolvableTraitsObj.strength = Numb.constrain(newEvolvableTraits.evolvableTraitsObj.strength + 0.1 * Rand.sign(), 0, 1)
            }
                break;
            case evolvableTraitsTypes.color: {
                newEvolvableTraits.evolvableTraitsObj.color = Color.randomColor()
            }
                break;
            case evolvableTraitsTypes.visibilityRange: {
                newEvolvableTraits.evolvableTraitsObj.visibilityRange = Numb.constrain(newEvolvableTraits.evolvableTraitsObj.visibilityRange + 5 * Rand.sign(), 1, 100)
            }
                break;
        }
        return newEvolvableTraits
    }

    get size() {
        return this.evolvableTraitsObj.size
    }
    get strength() {
        return this.evolvableTraitsObj.strength
    }
    get color() {
        return this.evolvableTraitsObj.color
    }
    get visibilityRange() {
        return this.evolvableTraitsObj.visibilityRange
    }
    get maxHp() {
        return this.evolvableTraitsObj.maxHp
    }
}
