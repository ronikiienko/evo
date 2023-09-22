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
type Distances = { distance: number, creature: Creature }[]
type Collisions = Creature[]

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
    lastEaten: Time
    lifespan: Time
    reproductionInterval: Time
    visibilityRange: number = 50

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
        this.lifespan = new Time(Rand.inRange(new Rang(15000, 20000)))
        this.reproductionInterval = new Time(Rand.inRange(new Rang(10000, 12000)))
    }

    divide() {
        if (this.world.creatures.length > 500) return
        this.lastDivision = new Time()
        const clone = new Creature({
            world: this.world,
            velocity: new Vector({x: 0, y: 0}),
            position: this.position.clone().add(new Vector({
                x: Rand.inRange(new Rang(20, 40)),
                y: Rand.inRange(new Rang(20, 40))
            })),
            evolvableTraits: this.evolvableTraits.evolve(),
            traits: this.traits
        })
        this.world.addCreature(clone)
    }

    getDistancesToOtherCreatures(toPreys = false) {
        const distances: Distances = []
        for (let creature of this.world.creatures) {
            if (creature === this) continue
            if (toPreys && creature.traits.isPredator) continue
            if (!toPreys && !creature.traits.isPredator) continue
            distances.push({
                distance: this.position.distance(creature.position),
                creature: creature
            })
        }
        return distances.sort((a, b) => {
            if (a.distance < b.distance) {
                return -1
            } else if (a.distance > b.distance) {
                return 1
            }
            return 0
        })
    }

    getCollisionsByDistances(distances: Distances) {
        const collisions: Collisions = []
        for (let distance of distances) {
            if (distance.distance < this.evolvableTraits.sizeReal + distance.creature.evolvableTraits.sizeReal) {
                collisions.push(distance.creature)
            }
        }
        return collisions
    }


    handlePredatorUpdate() {
        const sortedDistancesToPreys = this.getDistancesToOtherCreatures(true)
        const preyCollisions = this.getCollisionsByDistances(sortedDistancesToPreys)
        for (const collidedPray of preyCollisions) {
            this.world.removeCreature(collidedPray)
            this.divide()
        }
        if (sortedDistancesToPreys[0]) {
            const vectorToPrey = this.position.vectorTo(sortedDistancesToPreys[0].creature.position)
            const acceleration = vectorToPrey.limitMagnitude(1)
            this.velocity = this.velocity.add(acceleration).limitMagnitude(this.evolvableTraits.maxSpeedReal)
        } else {
            this.velocity = this.velocity.multiply(0.9)
        }
    }

    handlePreyUpdate() {
        if (new Time().subtract(this.lastDivision).greaterThan(this.reproductionInterval)) {
            this.divide()
        }
        const sortedDistancesToPredators = this.getDistancesToOtherCreatures()

        const distanceToClosestPredator = sortedDistancesToPredators[0]
        if (distanceToClosestPredator) {
            const dangerCoefficient = this.visibilityRange / distanceToClosestPredator.distance
            let dangerAcceleration = new Vector({x: 0, y: 0})
            let stoppingAcceleration = new Vector({x: 0, y: 0});
            if (dangerCoefficient < 1) {
                stoppingAcceleration = this.velocity.reverse()
            } else {
                dangerAcceleration = this.position.vectorFrom(distanceToClosestPredator.creature.position).multiply(dangerCoefficient)
            }
            const acceleration = dangerAcceleration.add(stoppingAcceleration).limitMagnitude(4)
            this.velocity = this.velocity.add(acceleration).limitMagnitude(this.evolvableTraits.maxSpeedReal)
        } else {
            this.velocity = this.velocity.multiply(0.9)
        }
    }

    handleCreatureUpdate() {
        if (new Time().subtract(this.born).greaterThan(this.lifespan)) {
            this.world.removeCreature(this)
        }
    }

    update() {
        if (this.traits.isPredator) this.handlePredatorUpdate()
        if (!this.traits.isPredator) this.handlePreyUpdate()
        this.handleCreatureUpdate()


        if (this.world.boundaries.x > this.position.x) this.position.x = this.evolvableTraits.sizeReal
        if (this.world.boundaries.x1 < this.position.x) this.position.x = this.world.boundaries.x1 - this.evolvableTraits.sizeReal
        if (this.world.boundaries.y > this.position.y) this.position.y = this.evolvableTraits.sizeReal
        if (this.world.boundaries.y1 < this.position.y) this.position.y = this.world.boundaries.y1 - this.evolvableTraits.sizeReal
    }
}
