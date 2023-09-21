import {Rand} from "../utils/Rand";
import {Time} from "../utils/Time";
import {Vector} from "../utils/Vector";
import {World} from "../World";
import {EvolvableTraits} from "./EvolvableTraits";
import {Traits} from "./Traits";
import {Rang} from "../utils/Rang";

type CreatureInit = {
    position: Vector,
    velocity: Vector,
    world: World,
    traits: Traits
    evolvableTraits: EvolvableTraits,
}

export class Creature {
    id: string
    name: string
    hp: number
    position: Vector
    velocity: Vector
    evolvableTraits: EvolvableTraits
    traits: Traits
    born: Time
    lastDivision: Time
    world: World
    constructor(init: CreatureInit) {
        this.id = Rand.getId()
        this.name = Rand.getName()
        this.position = init.position
        this.velocity = init.velocity
        this.world = init.world
        this.evolvableTraits = init.evolvableTraits
        this.traits = init.traits
        this.lastDivision = new Time()
        this.born = new Time()
    }

    divide() {
        if (this.world.creatures.length > 500) return
        this.lastDivision = new Time()
        const clone = new Creature({
            world: this.world,
            velocity: new Vector({x: 0, y: 0}),
            position: this.position.clone().add(new Vector({x: Rand.inRange(new Rang(20, 40)), y: Rand.inRange(new Rang(20, 40))})),
            evolvableTraits: this.evolvableTraits.evolve(),
            traits: this.traits
        })
        this.world.addCreature(clone)
    }

    update() {
        const visibilityRange = 50
        const lifespan = new Time(10000)
        const reproduceInterval = new Time(5000)


        if (!this.traits.isPredator) {
            if (new Time().subtract(this.lastDivision).greaterThan(reproduceInterval)) {
                this.divide()
            }
        }
        if (new Time().subtract(this.born).greaterThan(lifespan)) {
            this.world.removeCreature(this)
        }

        if (this.traits.isPredator) {
            const distances = []
            for (let creature of this.world.creatures) {
                if (creature === this) continue
                if (creature.traits.isPredator) continue
                distances.push({
                    distance: this.position.distance(creature.position),
                    creature: creature
                })
            }
            const sortedDistances = distances.sort((a, b) => {
                if (a.distance < b.distance) {
                    return - 1
                } else if (a.distance > b.distance) {
                    return 1
                }
                return 0
            })
            if (sortedDistances[0]) {
                const vectorToVictim = this.position.subtract(sortedDistances[0].creature.position).multiply(-0.2)
                this.velocity = this.velocity.add(vectorToVictim).limitMagnitude(this.evolvableTraits.maxSpeedReal)
            } else {
                this.velocity = this.velocity.multiply(0.9)
            }
            for (let sortedDistance of sortedDistances) {
                if (sortedDistance.distance < this.evolvableTraits.sizeReal + sortedDistance.creature.evolvableTraits.sizeReal) {
                    this.world.removeCreature(sortedDistance.creature)
                    this.divide()
                }
            }
        } else {
            const distances = []
            for (let creature of this.world.creatures) {
                if (creature === this) continue
                if (!creature.traits.isPredator) continue
                distances.push({
                    distance: this.position.distance(creature.position),
                    creature: creature
                })
            }
            const sortedDistances = distances.sort((a, b) => {
                if (a.distance < b.distance) {
                    return - 1
                } else if (a.distance > b.distance) {
                    return 1
                }
                return 0
            })
            if (sortedDistances[0]) {
                const vectorFromPredator = this.position.subtract(sortedDistances[0].creature.position).multiply(0.2)
                this.velocity = this.velocity.add(vectorFromPredator).limitMagnitude(this.evolvableTraits.maxSpeedReal).multiply(visibilityRange / sortedDistances[0].distance)
            } else {
                this.velocity = this.velocity.multiply(0.9)
            }
        }


        if (this.world.boundaries.x > this.position.x) this.position.x = this.evolvableTraits.sizeReal
        if (this.world.boundaries.x1 < this.position.x) this.position.x = this.world.boundaries.x1 - this.evolvableTraits.sizeReal
        if (this.world.boundaries.y > this.position.y) this.position.y = this.evolvableTraits.sizeReal
        if (this.world.boundaries.y1 < this.position.y) this.position.y = this.world.boundaries.y1 - this.evolvableTraits.sizeReal
    }
}
