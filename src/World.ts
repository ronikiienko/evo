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

    removeCreature(creatureToRemove: Creature) {
        const indexToRemove = this.creatures.findIndex(instance => instance === creatureToRemove);

        if (indexToRemove !== -1) {
            this.creatures.splice(indexToRemove, 1);
        }
    }
}
