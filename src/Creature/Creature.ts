import {Rand} from "../utils/Rand";
import {Time} from "../utils/Time";
import {Vector} from "../utils/Vector";
import {World} from "../World";
import {EvolvableTraits} from "./EvolvableTraits";
import {Traits} from "./Traits";

type CreatureInit = {
    position: Vector,
    velocity: Vector,
    world: World,
    traits: Traits
    evolvableTraits: EvolvableTraits
}

export class Creature {
    id: string
    name: string
    hp: number
    position: Vector
    velocity: Vector
    evolvableTraits: EvolvableTraits
    traits: Traits
    lastDivision: Time
    world: World
    constructor(init: CreatureInit) {
        this.hp = 1
        this.id = Rand.getId()
        this.name = Rand.getName()
        this.position = init.position
        this.velocity = init.velocity
        this.world = init.world
        this.evolvableTraits = init.evolvableTraits
        this.traits = init.traits
        this.lastDivision = new Time()
    }

    divide() {
        this.lastDivision = new Time()
        const clone = new Creature({
            world: this.world,
            velocity: new Vector({x: 0, y: 0}),
            position: this.position.clone(),
            evolvableTraits: this.evolvableTraits.evolve(),
            traits: this.traits
        })
        this.world.addCreature(clone)
    }

    update() {
        if (new Time().subtract(this.lastDivision).greaterThan(new Time(5000))) {
            this.divide()
        }
    }
}
