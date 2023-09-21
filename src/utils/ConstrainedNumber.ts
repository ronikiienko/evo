export class ConstrainedNumber {
    number: number
    #min: number
    #max: number


    constrain(number: number) {
        return Math.min(Math.max(number, this.#min), this.#max)
    }

    constructor(number: number, min = 0, max = 1) {
        this.#min = min
        this.#max = max
        this.number = this.constrain(number)
    }

    set(newNumber: number) {
        return new ConstrainedNumber(this.constrain(newNumber), this.#min, this.#max)
    }

    add(addedNumber: number) {
        return new ConstrainedNumber(this.constrain(this.number + addedNumber), this.#min, this.#max)
    }

    subtract(subtractedNumber: number) {
        return new ConstrainedNumber(this.constrain(this.number - subtractedNumber), this.#min, this.#max)
    }
}
