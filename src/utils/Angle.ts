export class Angle {
    #degrees: number;

    constructor(degOrRad: number, isRadians = false) {
        if (!isRadians) {
            this.deg = degOrRad;
        } else {
            this.deg = this.#radiansToDegrees(degOrRad);
        }
    }

    #degreesToRadians(degrees: number) {
        return (degrees * Math.PI) / 180;
    }

    #radiansToDegrees(radians: number) {
        return (radians * 180) / Math.PI;
    }
    #getNormalizedDegrees(degrees: number) {
        return degrees % 360
    }
    #getNormalizedRadians(radians: number) {
        return radians % (2 * Math.PI)
    }
    get deg() {
        return this.#degrees
    }
    get rad() {
        return this.#degreesToRadians(this.deg)
    }
    set deg(deg) {
        this.#degrees = deg
    }

    get degNormalized() {
        return  this.#getNormalizedDegrees(this.deg)
    }
    get radNormalized() {
        return this.#getNormalizedRadians(this.rad)
    }

    normalize() {
        const newDeg = this.#getNormalizedDegrees(this.deg)
        return new Angle(newDeg)
    }
    add(angle: Angle): Angle {
        const newDeg = this.deg + angle.deg
        return new Angle(newDeg)
    }
    subtract(angle: Angle): Angle {
        const newDeg = this.deg - angle.deg
        return new Angle(newDeg)
    }
    multiply(angle: Angle): Angle {
        const newDeg = this.deg * angle.deg
        return new Angle(newDeg)
    }

    get sin() {
        return Math.sin(this.rad)
    }
    get cos() {
        return Math.cos(this.rad)
    }
    get tan() {
        return Math.tan(this.rad)
    }
    get ctg() {
        return 1 / Math.tan(this.rad);
    }

    equals(angle: Angle) {
        return this.deg === angle.deg
    }

    averageShortest(angle: Angle): Angle {
        let diff = angle.deg - this.deg;
        diff = ((diff + 180) % 360) - 180;
        return new Angle(this.deg + diff / 2);
    }

    averageAbsolute(angle: Angle): Angle {
        const averageDeg = (this.deg + angle.deg) / 2;
        return new Angle(averageDeg);
    }
}
