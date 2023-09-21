export class Rang {
    start: number
    end: number
    constructor(start: number, end: number) {
        if (start > end) {
            throw new Error("Start value must be less than or equal to the end value.");
        }

        this.start = start;
        this.end = end;
    }

    contains(value: number): boolean {
        return value >= this.start && value <= this.end;
    }

    get size(): number {
        return this.end - this.start + 1;
    }

    overlaps(otherRange: Rang): boolean {
        return this.start <= otherRange.end && this.end >= otherRange.start;
    }

    // Find the intersection of two ranges
    intersection(otherRange: Rang): Rang | null {
        const start = Math.max(this.start, otherRange.start);
        const end = Math.min(this.end, otherRange.end);

        if (start <= end) {
            return new Rang(start, end);
        }

        return null; // No intersection
    }
}
