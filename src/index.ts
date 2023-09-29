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

const worldWidth = window.innerWidth
const worldHeight = window.innerHeight

const canvas = new Canvas(document.querySelector('canvas'), worldWidth, worldHeight);


const world = new World(new Rectangle(0, 0, worldWidth, worldHeight))
const graphics = new Graphics(canvas, world);
const physics = new Physics(world)

for (let i = 0; i < 400; i++) {
    world.addCreature(new Creature({
        position: new Vector({
            x: Rand.inRange(new Rang(0, canvas.width / 4 * 3)),
            y: Rand.inRange(new Rang(0, canvas.height))
        }),
        world: world,
        velocity: new Vector({x: Rand.inRange(new Rang(0, 200)), y: Rand.inRange(new Rang(0, 200))}),
        traits: new Traits({
            isPredator: true
        }),
        evolvableTraits: new EvolvableTraits({
            maxSpeed: 0.2,
            size: 0.05
        })
    }))
}
for (let i = 0; i < 200; i++) {
    world.addCreature(new Creature({
        position: new Vector({
            x: Rand.inRange(new Rang(canvas.width / 2, canvas.width)),
            y: Rand.inRange(new Rang(0, canvas.height))
        }),
        world: world,
        velocity: new Vector({x: 0, y: 0}),
        traits: new Traits({
            isPredator: false
        }),
        evolvableTraits: new EvolvableTraits({
            maxSpeed: 0.2,
            size: 0.05
        })
    }))
}
const cb = (dt: Time) => {
    // console.time('Physics')
    // physics.update(dt)
    // console.timeEnd('Physics')
    // console.time('World')
    // world.update(dt)
    // console.timeEnd('World')
    // console.time('Graphics')
    // graphics.update()
    // console.timeEnd('Graphics')

    physics.update(dt)
    world.update(dt)
    graphics.update()
}

wrappedRAF(cb)
