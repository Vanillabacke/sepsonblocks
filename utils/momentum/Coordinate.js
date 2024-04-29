
export default class Coordinate {
    constructor(optX, optY) {
        this.x = optX || 0;
        this.y = optY || 0;
    }

    clone() {
        return new Coordinate(this.x, this.y);
    }

    clamp(min, max) {
        this.clampX(min, max);
        this.clampY(min, max);
    }

    clampX(min, max) {
        this.x = Math.min(Math.max(this.x, min), max);
    }

    clampY(min, max) {
        this.y = Math.min(Math.max(this.y, min), max);
    }
}