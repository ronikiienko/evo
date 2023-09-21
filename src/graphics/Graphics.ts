import {Canvas} from "../utils/Canvas";
import {World} from "../World";
import {Color} from "../utils/Color";

export class Graphics {
    world: World
    canvas: Canvas
    constructor(canvas: Canvas, world: World) {
        this.canvas = canvas
        this.world = world
    }
    update() {
        this.canvas.fill(new Color([0,0,0]))
        for (let creature of this.world.creatures) {
            this.canvas.ctx.beginPath()
            this.canvas.ctx.arc(creature.position.x, creature.position.y, creature.evolvableTraits.sizeReal, 0, Math.PI * 2)
            this.canvas.ctx.fillStyle = creature.traits.isPredator ? 'red' : 'green'
            this.canvas.ctx.fill()
        }
    }
}
