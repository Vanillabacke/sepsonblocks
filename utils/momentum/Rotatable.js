import Handler from "./Handler";
import utils from "./utils";

export default class Rotatable {
    constructor(element) {
        this.element_ = element;
        this.elementBounds_ = this.element_.getBoundingClientRect();
        this.handler_ = null;
        this.lastRotation_ = 0;
        this.startRotation_ = 0;
        this.init_();
    }

    init_() {
        this.handler_ = new Handler(this.element_.parentElement);
        this.handler_.onDown(this.handleDown_, this);
        this.handler_.onMove(this.handleMove_, this);
        this.handler_.init();
    }

    getRotationDegree_(x, y, r) {
        return 180 - Math.atan2(x - r, y - r) * (180 / Math.PI);
    }

    handleDown_(x, y) {
        var rotation = this.getRotationDegree_(x, y, this.elementBounds_.width / 2);
        this.startRotation_ = rotation - this.lastRotation_;
        return true;
    }

    handleMove_(x, y) {
        var rotation = this.getRotationDegree_(x, y, this.elementBounds_.width / 2);
      
        this.lastRotation_ = rotation - this.startRotation_;
        this.lastRotation_ %= 360;
      
        utils.setStyle(this.element_, 'transform', 'rotate(' + this.lastRotation_ + 'deg)');
    }
    
    getHandler() {
        return this.handler_;
    }
}