import {Angle} from './Angle';
import {Numb} from "./Numb";

type VectorInit = {
    x: number,
    y: number
}

type AngleInit = {
    angle: Angle,
    magnitude: number
}

export class Vector {
    #x: number;
    #y: number;

    constructor(init: VectorInit | AngleInit) {
        if ("x" in init) {
            this.#x = init.x;
            this.#y = init.y;
        } else if ("angle" in init) {
            this.#x = init.magnitude * init.angle.cos;
            this.#y = init.magnitude * init.angle.sin;
        } else {
            throw new Error('Invalid initialization for Vector');
        }
    }

    get angle() {
        return new Angle(Math.atan2(this.#y, this.#x), true)
    }

    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    set x(newX) {
        this.#x = newX
    }

    set y(newY) {
        this.#y = newY
    }

    add(otherVector: Vector) {
        return new Vector({x: this.x + otherVector.x, y: this.y + otherVector.y})
    }

    subtract(otherVector: Vector) {
        return new Vector({x: this.x - otherVector.x, y: this.y - otherVector.y})
    }

    multiply(scalar: number) {
        return new Vector({x: this.x * scalar, y: this.y * scalar})
    }

    divide(scalar: number) {
        return new Vector({x: this.x / scalar, y: this.y / scalar})
    }

    distance(otherVector: Vector) {
        const dx = otherVector.x - this.x;
        const dy = otherVector.y - this.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }

    distanceX(otherVector: Vector) {
        return otherVector.x - this.x;
    }

    distanceY(otherVector: Vector) {
        return otherVector.y - this.y;
    }

    normalize() {
        const magnitude = this.magnitude
        if (magnitude !== 0) {
            return this.divide(magnitude)
        } else {
            throw new Error("Cannot normalize a zero vector.");
        }
    }

    dot(vector: Vector) {
        return  this.x * vector.x + this.y * vector.y
    }

    reverseX() {
        return new Vector({x: -this.x, y: this.y})
    }

    reverseY() {
        return new Vector({x: this.x, y: -this.y})
    }
    reverse() {
        return new Vector({x: -this.x, y: -this.y})
    }

    clone() {
        return new Vector({x: this.x, y: this.y})
    }

    limitMagnitude(maxMagnitude: number) {
        const currentMagnitude = this.magnitude;

        let newX = this.x;
        let newY = this.y;
        if (currentMagnitude > maxMagnitude) {
            const scaleFactor = maxMagnitude / currentMagnitude;
            newX = scaleFactor * this.x;
            newY = scaleFactor * this.y;
        }
        return new Vector({x: newX, y: newY})
    }
    vectorTo(otherVector: Vector) {
        return otherVector.subtract(this)
    }
    vectorFrom(otherVector: Vector) {
        return this.subtract(otherVector)
    }

    merge(otherVector: Vector, secondVectorStrength: number): Vector {
        secondVectorStrength = Numb.constrain(secondVectorStrength, 0, 1)
        const mergedX = (1 - secondVectorStrength) * this.x + secondVectorStrength * otherVector.x;
        const mergedY = (1 - secondVectorStrength) * this.y + secondVectorStrength * otherVector.y;

        return new Vector({ x: mergedX, y: mergedY });
    }

    angularMerge(otherVector: Vector, secondWeight: number) {
        const averageMagnitude = this.magnitude * (1 - secondWeight) + otherVector.magnitude * secondWeight
        const averageAngle = this.angle.averageShortest(otherVector.angle, secondWeight)
        return new Vector({angle: averageAngle, magnitude: averageMagnitude})
    }
}
