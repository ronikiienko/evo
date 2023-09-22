export class Numb {
    static constrain(number: number, min: number, max: number) {
        return Math.max(Math.min(number, max), min)
    }
    static average(numbers: number[]) {
        const sum = numbers.reduce((a, b) => a + b, 0);
        const avg = (sum / numbers.length) || 0;
        return avg
    }
}
