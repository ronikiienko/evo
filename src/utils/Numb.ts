export class Numb {
    static constrain(number: number, min: number, max: number) {
        return Math.max(Math.min(number, max), min)
    }
}
