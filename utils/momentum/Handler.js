import Coordinate from "./Coordinate";
import TrackingPoint from "./TrackingPoint";

export default class Handler {
    constructor(optTarget) {

        this.target_ = optTarget || document.documentElement
        this.targetBounds_ = this.target_.getBoundingClientRect()
        this.position_ = new Coordinate()
        this.trackingPoints_ = []

        this.startPosition_ = new Coordinate()
        this.lastDownPosition_ = new Coordinate()
        this.lastPosition_ = new Coordinate()
        this.lastVelocity_ = new Coordinate()
        this.boundOverflow_ = new Coordinate()


        // this.slideToStart_ = new Coordinate()
        // this.slideToTarget_ = new Coordinate()
        // this.slidingTo_ = false
        // this.slideToProgress_ = 0



        this.bounds_ = {
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0
        }

        this.animationsStopped_ = false
        this.hasBounds_ = false
        this.hasBoundsX_ = false
        this.hasBoundsY_ = false
        this.dragging_ = false
        this.movedSinceUserDown_ = false
        this.allowDecelerating_ = false
        this.decelerating_ = false
        this.resetTimerId_ = -1
        this.startTime_ = 0
        this.moveCallbacks_ = []
        this.upCallbacks_ = []
        this.downCallback_ = null
        this.preventMoveCheck_ = null
        this.precision_ = 3
        this.friction_ = new Coordinate(0.035, 0.035)
        this.activeOffsetFriction_ = new Coordinate(0, 0)
        this.offsetFriction_ = new Coordinate(0.1, 0.1)
        this.restitution_ = new Coordinate(0, 0)
        this.threshold_ = 5
        this.resetMs_ = 50
        this.maxVelocity_ = 70
        this.currentListenerMap_ = {}

        this.listenerOptions_ = {
            'passive': false,
            'useCapture': false
        }
    }





    onMove(callback, optCtx) {
        this.moveCallbacks_.push(callback.bind(optCtx || this));
    };

    onDown(callback, optCtx) {
        this.downCallback_ = callback.bind(optCtx || this);
    };


    onUp(callback, optCtx) {
        this.upCallbacks_.push(callback.bind(optCtx || this));
    };

    setFriction(friction) {
        this.friction_.x = this.friction_.y = friction;
        this.friction_.clamp(0, 1);
    };

    setOffsetFriction(friction) {
        this.offsetFriction_.x = this.offsetFriction_.y = friction;
        this.offsetFriction_.clamp(0, 1);
    };

    setThreshold(threshold) {
        this.threshold_ = threshold;
    };

    setRestitution(restitution) {
        this.restitution_.x = this.restitution_.y = restitution;
        this.restitution_.clamp(-1, 1);
    };

    setMaxVelocity(maxVelocity) {
        this.maxVelocity_ = Math.max(maxVelocity, 0);
    };

    setPreventMoveCheck(fnc) {
        this.preventMoveCheck_ = fnc;
    };

    getFriction() {
        return this.friction_;
    };

    getOffsetFriction() {
        return this.offsetFriction_;
    };

    getThreshold() {
        return this.threshold_;
    };

    getRestitution() {
        return this.restitution_;
    };

    getMaxVelocity() {
        return this.maxVelocity_;
    };

    getPreventMoveCheck() {
        return this.preventMoveCheck_;
    };

    getTarget() {
        return this.target_;
    };

    getTargetBounds(optUpdate) {
        if (optUpdate) {
            this.targetBounds_ = this.target_.getBoundingClientRect();
        }

        return this.targetBounds_;
    };

    setPosition(x, y, optReset) {
        this.position_.x = x;
        this.position_.y = y;

        if (optReset) {
            this.lastPosition_.x = x;
            this.lastPosition_.y = y;

            if (this.decelerating_) {
                this.lastVelocity_.x = 0;
                this.lastVelocity_.y = 0;
            }
        }
    };

    hasTouch_() {
        return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    };

    init() {
        if (this.hasTouch_()) {
            this.currentListenerMap_ = {
                'touchend': {
                    'target': this.target_,
                    'listener': this.handleUserUp_.bind(this)
                },
                'touchcancel': {
                    'target': this.target_,
                    'listener': this.handleUserUp_.bind(this)
                },
                'touchstart': {
                    'target': this.target_,
                    'listener': this.handleUserDown_.bind(this)
                },
                'touchmove': {
                    'target': this.target_,
                    'listener': this.handleUserMove_.bind(this)
                }
            };
        } else {
            this.currentListenerMap_ = {
                'mouseup': {
                    'target': this.target_,
                    'listener': this.handleUserUp_.bind(this)
                },
                'mouseleave': {
                    'target': this.target_,
                    'listener': this.handleUserUp_.bind(this)
                },
                'mousedown': {
                    'target': this.target_,
                    'listener': this.handleUserDown_.bind(this)
                },
                'mousemove': {
                    'target': this.target_,
                    'listener': this.handleUserMove_.bind(this)
                }
            };
        }

        this.currentListenerMap_['scroll'] = {
            'target': window,
            'listener': this.update.bind(this)
        };

        this.applyListenerMap_();
    };

    destroy() {
        this.removeListenerMap_();
        this.stop();
    };

    stop() {
        this.animationsStopped_ = true;
        this.allowDecelerating_ = false;
    };

    start() {
        this.animationsStopped_ = false;
        this.allowDecelerating_ = true;
    };

    setBounds(optMinX, optMaxX, optMinY, optMaxY) {
        this.bounds_.minX = optMinX || 0;
        this.bounds_.maxX = optMaxX || 0;
        this.bounds_.minY = optMinY || 0;
        this.bounds_.maxY = optMaxY || 0;

        this.hasBoundsX_ = this.bounds_.minX != 0 || this.bounds_.maxX != 0;
        this.hasBoundsY_ = this.bounds_.minY != 0 || this.bounds_.maxY != 0;
        this.hasBounds_ = this.hasBoundsX_ || this.hasBoundsY_;
    };

    update() {
        this.targetBounds_ = this.target_.getBoundingClientRect();
        this.positionUpdated_();
    };

    getRelativeElementPosition(element) {
        var bounds = element.getBoundingClientRect();

        return new Coordinate(
            bounds.left - this.targetBounds_.left,
            bounds.top - this.targetBounds_.top
        );
    };

    applyListenerMap_() {
        for (var type in this.currentListenerMap_) {
            var target = this.currentListenerMap_[type]['target'];

            target.addEventListener(
                type,
                this.currentListenerMap_[type]['listener'],
                this.listenerOptions_
            );
        }
    };

    removeListenerMap_() {
        for (var type in this.currentListenerMap_) {
            var target = this.currentListenerMap_[type]['target'];

            target.removeEventListener(
                type,
                this.currentListenerMap_[type]['listener'],
                this.listenerOptions_
            );
        }

        this.currentListenerMap_ = {};
    };

    getEventPosition_(event) {
        var position = new Coordinate();

        if (event.touches) {
            position.x = event.touches[0].clientX - this.targetBounds_.left;
            position.y = event.touches[0].clientY - this.targetBounds_.top;
        } else {
            position.x = event.clientX - this.targetBounds_.left;
            position.y = event.clientY - this.targetBounds_.top;
        }

        return position;
    };

    handleUserDown_(event) {
        var position = this.getEventPosition_(event);

        if (this.downCallback_ && !this.downCallback_(position.x, position.y)) {
            return;
        }

        this.dragging_ = true;
        this.allowDecelerating_ = false;

        // Set initial start values
        this.lastDownPosition_.x = position.x;
        this.lastDownPosition_.y = position.y;
        this.startPosition_.x = this.position_.x = position.x;
        this.startPosition_.y = this.position_.y = position.y;
        this.startTime_ = Date.now();

         // Reset velocity
        this.lastVelocity_.x = 0;
        this.lastVelocity_.y = 0;

        this.positionUpdated_();
        this.collectTrackingPoints_();
    };

    collectTrackingPoints_() {
        this.addTrackingPoint_();
        this.updateTrackingPoints_();

        if (this.dragging_) {
            this.requestAnimationFrame_(this.collectTrackingPoints_, this);
        }
    };

    addTrackingPoint_() {
        this.trackingPoints_.push(
            new TrackingPoint(this.position_.clone())
        );
    };

    preventMove_(movedX, movedY) {
        return this.preventMoveCheck_ ?
            this.preventMoveCheck_(movedX, movedY, this.hasTouch_()) :
            false;
    };

    handleUserMove_(event) {
        if (this.dragging_) {
            var position = this.getEventPosition_(event);
            var movedX = Math.abs(this.lastDownPosition_.x - position.x);
            var movedY = Math.abs(this.lastDownPosition_.y - position.y);

            if (!this.preventMove_(movedX, movedY) || this.movedSinceUserDown_) {
                this.movedSinceUserDown_ = true;
                event.stopPropagation();
                event.preventDefault();

                this.position_.x = position.x;
                this.position_.y = position.y;

                this.positionUpdated_();
            }
        }
    };

    updateTrackingPoints_() {
        var timestamp = Date.now();
        var removeIndicies = [];

        for (var i = 0, len = this.trackingPoints_.length; i < len; i++) {
            if (timestamp - this.trackingPoints_[i].timestamp >= this.resetMs_) {
                removeIndicies.push(i);
            }
        }

        for (var i = 0, len = removeIndicies.length; i < len; i++) {
            this.trackingPoints_.splice(removeIndicies[i], 1);
        }

        if (this.trackingPoints_.length > 0) {
            var lastTrackingPoint = this.trackingPoints_[0];

            this.startPosition_ = lastTrackingPoint.position;
            this.startTime_ = lastTrackingPoint.timestamp;
        }
    };

    handleUserUp_(event) {
        this.lastDownPosition_.x = 0;
        this.lastDownPosition_.y = 0;
        this.movedSinceUserDown_ = false;

        if (this.dragging_) {
            this.dragging_ = false;
            this.allowDecelerating_ = true;


            // Calculate the velocity the object reached before the user
            // released the trigger. Depending on the start time.
            var timeDelta = (Date.now() - this.startTime_) / 15;

            this.lastVelocity_.x = (this.position_.x - this.startPosition_.x) / timeDelta;
            this.lastVelocity_.y = (this.position_.y - this.startPosition_.y) / timeDelta;

            // Clamp velocities to the max value
            this.lastVelocity_.clamp(-this.maxVelocity_, this.maxVelocity_);


            // Clear the start proeprties, so they won't mess up any
            // further calculations
            this.clearStartProperties_();


            // Clear previous tracking points. At this point all calculations which
            // are including the tracking points should be already made.
            this.trackingPoints_ = [];


            // Check if the velocity is greater than the threshold to enable
            // the decelerating from the calculated velocity
            if (Math.abs(this.lastVelocity_.x) >= this.threshold_ ||
                Math.abs(this.lastVelocity_.y) >= this.threshold_ ||
                this.boundOverflow_.x != 0 ||
                this.boundOverflow_.y != 0) {
                this.decelerate_();
            }

             // Call up callbacks
            for (var i = 0, len = this.upCallbacks_.length; i < len; i++) {
                this.upCallbacks_[i]();
            }
        }
    };

    clearStartProperties_() {
        this.startPosition_.x = 0;
        this.startPosition_.y = 0;
        this.startTime_ = 0;
    };

    roundDecimal_(num, dec) {
        var desc = parseInt(1 + '0'.repeat(dec), 10);

        return Math.round(num * desc) / desc;
    };

    applyBounds_() {
        if (this.hasBounds_) {
            if (this.hasBoundsX_) {
                if (this.restitution_.x >= 0) {
                    this.position_.clampX(this.bounds_.minX, this.bounds_.maxX);

                    // Handle bounce by inverting the velocity for each axis
                    if (this.position_.x <= this.bounds_.minX ||
                        this.position_.x >= this.bounds_.maxX) {
                        this.lastVelocity_.x = (this.lastVelocity_.x * -1) * this.restitution_.x;
                    }
                } else {
                    if (this.boundOverflow_.x != 0) {
                        this.activeOffsetFriction_.x = this.offsetFriction_.x;
                        this.deflowBoundX_();
                    } else {
                        this.activeOffsetFriction_.x = 0;
                    }

                    var boundDiffMinX = this.roundDecimal_(this.bounds_.minX - this.position_.x, 2);
                    var boundDiffMaxX = this.roundDecimal_(this.bounds_.maxX - this.position_.x, 2);

                    if (boundDiffMinX > 0) {
                        this.boundOverflow_.x = boundDiffMinX;
                    } else if (boundDiffMaxX < 0) {
                        this.boundOverflow_.x = boundDiffMaxX;
                    } else {
                        this.boundOverflow_.x = 0;
                    }
                }
            }

            if (this.hasBoundsY_) {
                if (this.restitution_.y >= 0) {
                    this.position_.clampY(this.bounds_.minY, this.bounds_.maxY);

                     // Handle bounce by inverting the velocity for each axis
                    if (this.position_.y <= this.bounds_.minY ||
                        this.position_.y >= this.bounds_.maxY) {
                        this.lastVelocity_.y = (this.lastVelocity_.y * -1) * this.restitution_.y;
                    }
                } else {
                    if (this.boundOverflow_.y != 0) {
                        this.activeOffsetFriction_.y = this.offsetFriction_.y;
                        this.deflowBoundY_();
                    } else {
                        this.activeOffsetFriction_.y = 0;
                    }

                    var boundDiffMinY = this.roundDecimal_(this.bounds_.minY - this.position_.y, 2);
                    var boundDiffMaxY = this.roundDecimal_(this.bounds_.maxY - this.position_.y, 2);

                    if (boundDiffMinY > 0) {
                        this.boundOverflow_.y = boundDiffMinY;
                    } else if (boundDiffMaxY < 0) {
                        this.boundOverflow_.y = boundDiffMaxY;
                    } else {
                        this.boundOverflow_.y = 0;
                    }
                }
            }
        }
    };

    positionUpdated_() {
        this.applyBounds_();

        if (this.position_.x != this.lastPosition_.x || this.position_.y != this.lastPosition_.y) {
            for (var i = 0, len = this.moveCallbacks_.length; i < len; i++) {
                this.moveCallbacks_[i](
                    this.position_.x,
                    this.position_.y,
                    this.lastVelocity_.x,
                    this.lastVelocity_.y
                );
            }

            this.lastPosition_.x = this.position_.x;
            this.lastPosition_.y = this.position_.y;
        }
    };

    getPrecisionNumber_(num, precision) {
        var number = num.toString();
        return parseFloat(number.substring(0, number.indexOf('.') + (1 + precision))) || 0;
    };

    deflowBoundX_() {
        if (this.boundOverflow_.x != 0) {
            var restitution = this.restitution_.x;

            if (this.dragging_) {
                restitution /= 2;
            }

            this.position_.x += this.getPrecisionNumber_(this.boundOverflow_.x * (1 + restitution), this.precision_);
        }
    };

    deflowBoundY_() {
        if (this.boundOverflow_.y != 0) {
            var restitution = this.restitution_.x;

            if (this.dragging_) {
                restitution /= 2;
            }

            this.position_.y += this.getPrecisionNumber_(this.boundOverflow_.y * (1 + restitution), this.precision_);
        }
    }

    decelerate_() {
        if (!this.allowDecelerating_) {
            return;
        }

        this.decelerating_ = true;

        if (Math.abs(this.lastVelocity_.x) > 0) {
            var friction = this.activeOffsetFriction_.x > 0 ? this.activeOffsetFriction_.x : this.friction_.x;
            this.lastVelocity_.x = this.getPrecisionNumber_(this.lastVelocity_.x * (1 - friction), this.precision_);
            this.position_.x += this.lastVelocity_.x;
            this.position_.x = parseFloat(this.position_.x.toFixed(this.precision_));
        }

        if (Math.abs(this.lastVelocity_.y) > 0) {
            var friction = this.activeOffsetFriction_.y > 0 ? this.activeOffsetFriction_.y : this.friction_.y;
            this.lastVelocity_.y = this.getPrecisionNumber_(this.lastVelocity_.y * (1 - friction), this.precision_);
            this.position_.y += this.lastVelocity_.y;
            this.position_.y = parseFloat(this.position_.y.toFixed(this.precision_));
        }

        // console.log('lastVelocity_', this.lastVelocity_)
        // Clamp velocity in case it changed during deceleration
        this.lastVelocity_.clamp(-this.maxVelocity_, this.maxVelocity_);

        // Notify listeners and apply bounds
        this.positionUpdated_();



        // Round velocity, so it gets canceled. This is done solarge  decimal numbers
        // will be sorted out. The user wouldn't even notice translation with decimal
        // digits this large.
        var velX = this.roundDecimal_(Math.abs(this.lastVelocity_.x), 2);
        var velY = this.roundDecimal_(Math.abs(this.lastVelocity_.y), 2);

        if (velX > 0 || velX > 0 || this.boundOverflow_.x != 0 || this.boundOverflow_.y != 0) {
            this.requestAnimationFrame_(this.decelerate_, this);
        } else {
            this.decelerating_ = false;
        }
    };


    
    
    // // https://spicyyoghurt.com/tools/easing-functions#:~:text=Easing%20functions%20work%20well%20in,will%20return%20the%20eased%20value.
    // easeLinear (t, b, c, d) {
    //     return c * t / d + b;
    // }
    
    // easeInQuad (t, b, c, d) {
    //     return c * (t /= d) * t + b;
    // }
    
    // easeInOutSine (t, b, c, d) {
    //     return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    // }
   
   
    // slideTo( point ) {
    //     // TODO: slideTo(x = 0, y = 0)
    //     // default values should be current axis position


    //     this.slideToStart_.x = this.position_.x
    //     this.slideToStart_.y = this.position_.y

    //     this.slideToTarget = new Coordinate(
    //         point.x, // this.position_.x - 
    //         point.y, // this.position_.y - 
    //     )

    //     this.slidingTo_ = true
    //     this.slideToProgress_ = 0
    //     this.requestAnimationFrame_(this.updateSlideTo, this)
    // }


    // updateSlideTo() {

    //     this.slideToProgress_ += 0.05
    //     if( this.slideToProgress_ >= 1 ) {
    //         this.slideToProgress_ = 1
    //         this.slidingTo_ = false
    //         console.log("finish slideTo")
    //     }


    //     // this.startPosition_ = new Coordinate()
    //     // this.lastDownPosition_ = new Coordinate()
    //     // this.lastPosition_ = new Coordinate()
    //     // this.lastVelocity_ = new Coordinate()
    //     // this.boundOverflow_ = new Coordinate()

    //     // this.setPosition(this.slideToTarget)
    //     // this.position_.x = this.easeLinear( this.slideToProgress_, this.position_.x,  this.slideToTarget.x, 1)
    //     // this.position_.x = this.easeInOutSine( this.slideToProgress_, this.slideToStart_.x,  this.slideToTarget.x, 1)
    //     this.lastVelocity_.x = this.slideToTarget.x
    //     // this.position_.x = this.easeInOutSine( this.slideToProgress_, 0,  this.slideToTarget.x, 1)
    //     // this.position_.y = this.easeLinear( this.slideToProgress_, this.position_.y,  this.slideToTarget.y, 1)
    //     // this.position_.y = this.easeInOutSine( this.slideToProgress_, this.slideToStart_.y,  this.slideToTarget.y, 1)
    //     this.lastVelocity_.y = this.slideToTarget.y
    //     // this.position_.y = this.easeInOutSine( this.slideToProgress_, 0,  this.slideToTarget.y, 1)

    //     this.update()
    //     // this.decelerate_()


    //     if( this.slidingTo_ ) this.requestAnimationFrame_(this.updateSlideTo, this)

    //     // Notify listeners and apply bounds
    //     // this.positionUpdated_();
    // }

    requestAnimationFrame_(callback, ctx) {
        if (!this.animationsStopped_) {
            (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)(callback.bind(ctx));
        }
    };

}