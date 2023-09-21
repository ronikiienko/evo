import {Canvas} from "./utils/Canvas";
import {Graphics} from "./graphics/Graphics";
import {World} from "./World";
import {Creature} from "./Creature/Creature";
import {Rand} from "./utils/Rand";
import {Rang} from "./utils/Rang";
import {Vector} from "./utils/Vector";
import {Physics} from "./physics/Physics";
import {wrappedRAF} from "./wrappedRAF";
import {Time} from "./utils/Time";
import {Rectangle} from "./utils/Rectangle";
import {Color} from "./utils/Color";
import {EvolvableTraits} from "./Creature/EvolvableTraits";
import {Traits} from "./Creature/Traits";

const canvas = new Canvas(document.querySelector('canvas'), 500, 500);


const world = new World(new Rectangle(0, 0, 500, 500))
const graphics = new Graphics(canvas, world);
const physics = new Physics(world)

for (let i = 0; i < 20; i++) {
    world.addCreature(new Creature({
        position: new Vector({
            x: Rand.inRange(new Rang(0, canvas.width)),
            y: Rand.inRange(new Rang(0, canvas.height))
        }),
        world: world,
        velocity: new Vector({x: Rand.inRange(new Rang(0, 200)), y: Rand.inRange(new Rang(0, 200))}),
        traits: new Traits({
            isPredator: false
        }),
        evolvableTraits: new EvolvableTraits({
            size: 10,
            color: Color.randomColor(),
            maxHp: 0.2,
            strength: 0.2,
            visibilityRange: 0.2
        })
    }))
}

const cb = (dt: Time) => {
    physics.update(dt)
    world.update(dt)
    graphics.update()
}

wrappedRAF(cb)
