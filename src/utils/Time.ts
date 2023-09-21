export class Time {
    #milliseconds: number;

    constructor(milliseconds: number = Date.now()) {
        this.#milliseconds = milliseconds;
    }

    getMilliseconds(): number {
        return this.#milliseconds;
    }

    setMilliseconds(milliseconds: number): void {
        this.#milliseconds = milliseconds;
    }

    getSeconds(): number {
        return this.#milliseconds / 1000;
    }

    setSeconds(seconds: number): void {
        this.#milliseconds = seconds * 1000;
    }

    getMinutes(): number {
        return this.#milliseconds / (1000 * 60);
    }

    setMinutes(minutes: number): void {
        this.#milliseconds = minutes * 1000 * 60;
    }

    add(time: Time) {
        return new Time(this.getMilliseconds() + time.getMilliseconds())
    }

    subtract(time: Time) {
        return new Time(this.getMilliseconds() - time.getMilliseconds())
    }

    greaterThan(time: Time) {
        return this.getMilliseconds() > time.getMilliseconds()
    }
}
