import {Rang} from "./Rang";
import {Rand} from "./Rand";

export class Color {
    #rgba: number[];

    constructor(rgb: number[], alpha: number = 1) {
        this.#rgba = [...rgb, alpha];
    }

    get rgb(): number[] {
        return this.#rgba.slice(0, 3);
    }

    get rgba(): number[] {
        return this.#rgba;
    }

    get r(): number {
        return this.#rgba[0];
    }

    get g(): number {
        return this.#rgba[1];
    }

    get b(): number {
        return this.#rgba[2];
    }

    get a(): number {
        return this.#rgba[3];
    }

    get rgbString(): string {
        return `rgb(${this.#rgba[0]}, ${this.#rgba[1]}, ${this.#rgba[2]})`;
    }

    get rgbaString(): string {
        return `rgba(${this.#rgba[0]}, ${this.#rgba[1]}, ${this.#rgba[2]}, ${this.#rgba[3]})`;
    }

    static randomColor(): Color {
        const randomRgb = [
            Rand.inRange(new Rang(0, 255)),
            Rand.inRange(new Rang(0, 255)),
            Rand.inRange(new Rang(0, 255)),
        ];
        const randomAlpha = Math.random();

        return new Color(randomRgb, randomAlpha);
    }
}
