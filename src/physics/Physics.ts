import {World} from "../World";
import {Time} from "../utils/Time";
import {Rectangle} from "../utils/Rectangle";
import {Creature} from "../Creature/Creature";
import {Color} from "../utils/Color";

export class Physics {
    world: World
    constructor(world: World) {
        this.world = world
    }

    update(dt: Time) {
        for (let creature of this.world.creatures) {
            const newPosition = creature.position.add(creature.velocity.multiply(dt.getSeconds()))
            const creatureBoundaries = new Rectangle(newPosition.x, newPosition.y, creature.evolvableTraits.size, creature.evolvableTraits.size)
            if (this.world.boundaries.x > creatureBoundaries.x) creature.velocity = creature.velocity.reverseX()
            if (this.world.boundaries.x1 < creatureBoundaries.x1) creature.velocity = creature.velocity.reverseX()
            if (this.world.boundaries.y > creatureBoundaries.y) creature.velocity = creature.velocity.reverseY()
            if (this.world.boundaries.y1 < creatureBoundaries.y1) creature.velocity = creature.velocity.reverseY()
            creature.position = newPosition
        }
    }
}
