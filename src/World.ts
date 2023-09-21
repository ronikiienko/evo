import {Creature} from "./Creature/Creature";
import {Time} from "./utils/Time";
import {Rectangle} from "./utils/Rectangle";

export class World {
    creatures: Creature[] = []
    boundaries: Rectangle
    constructor(boundaries: Rectangle) {
        this.boundaries = boundaries
    }
    addCreature(creature: Creature, ) {
        this.creatures.push(creature)
    }

    update(dt: Time) {
        for (let creature of this.creatures) {
            creature.update()
        }
    }
}
