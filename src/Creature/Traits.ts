type TraitsInit = {
    isPredator: boolean
}
export class Traits {
    isPredator: boolean
    constructor(init: TraitsInit) {
        this.isPredator = init.isPredator
    }
}
