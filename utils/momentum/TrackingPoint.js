export default class TrackingPoint{
    constructor(position) {
        this.position = position;
        this.timestamp = Date.now();
    }
}