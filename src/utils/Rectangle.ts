import {Vector} from "./Vector";

export class Rectangle {
    #x: number
    #y: number
    #width: number
    #height: number

    constructor(x: number, y: number, width: number, height: number) {
        this.#x = x;
        this.#y = y;
        this.#width = width
        this.#height = height
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    get width() {
        return this.#width
    }

    get height() {
        return this.#height
    }

    get x1() {
        return this.#x + this.#width
    }

    get y1() {
        return this.#y + this.#height
    }

    containsPoint(point: Vector) {
        return (
            point.x >= this.x &&
            point.x <= this.x1 &&
            point.y >= this.y &&
            point.y <= this.y1
        )
    }

    intersectsWith(rectangle: Rectangle) {
        return (
            this.x < rectangle.x1 &&
            this.x1 > rectangle.x &&
            this.y < rectangle.y1 &&
            this.y1 > rectangle.y
        )
    }
}

