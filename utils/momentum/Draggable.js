import Coordinate from "./Coordinate";
import Handler from "./Handler";

import {
    isDef,
    isString,
    isObject,
    isBoolean,
} from './helper'


import utils from './utils'







/*
container	        Element	            null	    Container of the draggable element. Also the target for the "drag events"
elementBounds	    Element|string	    null	    Determines if the bounds of a element should be used. As a shortcut you can pass 'container' or 'parent' as a string
bounds	            Object	            null	    Set the bounds manually {x: number y: number, width: number, height: number}
autoAnchor	        boolean	            false	    Determines if the anchor should be set on the start position the user has clicked
anchorX	            number	            0.5	        The anchor point on the horizontal axis.
anchorY	            number	            0.5	        The anchor point on the vertical axis.
threshold	        number	            5	        The minimum velocity the element needs to reach to trigger the throw animation
restitution	        number	            0	        The bounciness of the element if it hits the bounds. This will be multiplicated with the velocity. You can use negative values to let the element bounce out of the bounds. Numbers from -1 to 1 are valid.
friction	        number	            0.035	    The friction of the element. Lower values make the elements decelerate longer. Numbers from 0 to 1 are valid
offsetFriction	    number	            0.1	        The friction used out of bounds. This will be included in the calculations if you used a negative restitution. Numbers from 0 to 1 are valid
maxVelocity	        number	            70	        The maximum velocity the element can reach. Numbers greater than 0 are valid.
resizeUpdate	    boolean	            false	    Determines whether the draggable should be updated automatically after the browser is resized.
lockAxis	        Object	            null	    Locked axis will be excluded from the translation. For example: {x: false, y: true}. This will lock the y axis.
onUp	            Function	        null	    Callback which will be called if the user released the element.
onDown	            Function	        null	    Callback which will be called if the user hits the element before the drag. Whether you return true or false determimes if the drag will be accepted. If you want to preserve the default behaviour you should return the "hit" parameter. Parameter list: hit, cursorX, cursorY, elementX, elementY, elementWidth, elementHeight
onMove	            Function	        null	    This will be triggered before the element is going to be moved. At this point the element does not have the latest translation. You can return an coordinate object like "{x: number, y: number}" to manipulate the position of the element. Parameter list: posX, posY, velX, velY.
onTranslate	        Function	        null	    This will be called if the translation settled. Parameter list: elementX, elementY, elementWidth, elementHeight, elementBounds
preventMove	        Function	        null	    A function which needs to return wheter true or false to prevent the movement. This can be useful to add a move threshold. Paramter list: movedX, movedY, isTouchDevice
*/




export default class Draggable {
    constructor(element, optConfig) {
        this.element_ = element;
        this.defaults_ = {
            // @deprecated: containerBounds is deprecated and will be removed in the future.
            //               Use elementBounds instead
            //
            // containerBounds: true,
            container: document.documentElement,
            elementBounds: 'container',
            restitution: -0.6,
            resizeUpdate: true,
            autoAnchor: true
        };


        this.config = optConfig || {};


        
        this.slideToStart_ = new Coordinate()
        this.slideToTarget_ = new Coordinate()
        this.slidingTo_ = false
        this.slideToProgress_ = 0
        this.animationsStopped_ = true


        this.elementBounds_ = this.element_.getBoundingClientRect();
        this.anchorPoint_ = new Coordinate(.5, .5);
        this.lastTranslation_ = new Coordinate();
        this.positionOffset_ = new Coordinate();
        this.scrollOffset_ = new Coordinate();
        this.startPosition_ = new Coordinate();
        this.handler_ = null;
        this.destroyed_ = false;
        this.hasTranslation_ = false;
        this.scrollContainers_ = [];
        this.init_();
    }





    updateSettings() {
        // Merge config
        var config = this.defaults_;

        utils.extendObject(config, this.config);

        this.config = config;

        // Notify handler about the new settings
        if (this.config.restitution && !isNaN(this.config.restitution)) {
            this.handler_.setRestitution(this.config.restitution);
        }

        if (this.config.friction && !isNaN(this.config.friction)) {
            this.handler_.setFriction(this.config.friction);
        }

        if (this.config.offsetFriction && !isNaN(this.config.offsetFriction)) {
            this.handler_.setOffsetFriction(this.config.offsetFriction);
        }

        if (this.config.threshold && !isNaN(this.config.threshold)) {
            this.handler_.setThreshold(this.config.threshold);
        }

        if (this.config.maxVelocity && !isNaN(this.config.maxVelocity)) {
            this.handler_.setMaxVelocity(this.config.maxVelocity);
        }

        if (this.config.preventMove && typeof this.config.preventMove === 'function') {
            this.handler_.setPreventMoveCheck(this.config.preventMove);
        }
    };


    updateBounds(optNoCache) {
        if (this.config.elementBounds) {
            if (optNoCache || !this.config.bounds) {
                if (isString(this.config.elementBounds)) {
                    switch (this.config.elementBounds) {
                        case 'parent':
                            var parentNode = (this.element_.parentNode);

                            if (parentNode != this.element_) {
                                this.config.elementBounds = parentNode;
                            } else {
                                this.config.elementBounds = this.config.container;
                            }
                            break;
                        case 'container':
                            this.config.elementBounds = this.config.container || document.documentElement;
                            break;
                    }

                    if (this.config.elementBounds.nodeType === Node.DOCUMENT_NODE) {
                        this.config.elementBounds = document.documentElement;
                    }
                }

                if (this.config.elementBounds.nodeType === Node.ELEMENT_NODE) {
                    // Use the bounds of the element and change the position of the object.
                    // This ensures the scroll position is included in the calculations
                    var bounds = this.config.elementBounds.getBoundingClientRect();
                    var targetOffset = utils.getPageOffset(this.handler_.getTarget());
                    var elementOffset = utils.getPageOffset((
                        this.config.elementBounds
                    ));

                    // Getting relative position to the handler target
                    elementOffset.x -= targetOffset.x;
                    elementOffset.y -= targetOffset.y;

                    this.config.bounds = {
                        x: elementOffset.x,
                        y: elementOffset.y,
                        width: bounds.width,
                        height: bounds.height
                    };
                }
            }
        }

        if (this.config.bounds) {
            var containerBounds = this.handler_.getTargetBounds(optNoCache);
            var overflowX = this.elementBounds_.width > containerBounds.width;
            var overflowY = this.elementBounds_.height > containerBounds.height;

            // @todo: Make inverting bounds for different bound targets possible

            this.handler_.setBounds(
                // min x
                overflowX ?
                this.positionOffset_.x + containerBounds.width - this.elementBounds_.width :
                this.config.bounds.x + this.positionOffset_.x,

                // max x
                overflowX ?
                this.positionOffset_.x :
                (this.config.bounds.x + this.config.bounds.width) - (this.elementBounds_.width - this.positionOffset_.x),

                // min y
                overflowY ?
                this.positionOffset_.y + containerBounds.height - this.elementBounds_.height :
                this.config.bounds.y + this.positionOffset_.y,

                // max y
                overflowY ?
                this.positionOffset_.y :
                (this.config.bounds.y + this.config.bounds.height) - (this.elementBounds_.height - this.positionOffset_.y)
            );
        }
    };


    updateScrollPositions() {
        this.scrollOffset_.x = 0;
        this.scrollOffset_.y = 0;

        for (var i = 0, len = this.scrollContainers_.length; i < len; i++) {
            var container = this.scrollContainers_[i];
            var bounds = container.getBoundingClientRect();

            if (container.scrollHeight > bounds.height) {
                this.scrollOffset_.y += container.scrollTop;
            }

            if (container.scrollWidth > bounds.width) {
                this.scrollOffset_.x += container.scrollLeft;
            }
        }
    };


    getHandler() {
        return this.handler_;
    };


    update(optPreventHandler) {
        optPreventHandler = optPreventHandler && optPreventHandler === true;

        if (!optPreventHandler) {
            this.updateSettings();
        }

        // Update element bounds and offsets
        this.elementBounds_ = this.element_.getBoundingClientRect();

        // Update anchor points
        if (!this.config.autoAnchor) {
            this.anchorPoint_.x = isDef(this.config.anchorX) ? this.config.anchorX : this.anchorPoint_.x;
            this.anchorPoint_.y = isDef(this.config.anchorY) ? this.config.anchorY : this.anchorPoint_.y;
            this.positionOffset_.x = this.elementBounds_.width * this.anchorPoint_.x;
            this.positionOffset_.y = this.elementBounds_.height * this.anchorPoint_.y;
        }

        // Set start position
        this.startPosition_.x = this.element_.offsetLeft;
        this.startPosition_.y = this.element_.offsetTop;

        var scrollContainers = [];
        var containerOffset = new Coordinate();
        var parentElement = this.element_.parentElement;

        while (parentElement) {
            if (parentElement == this.handler_.getTarget()) {
                break;
            }

            var position = utils.getStyle(parentElement, 'position');
            var overflow = utils.getStyle(parentElement, 'overflow');

            if (position == 'relative' || position == 'absolute') {
                var offset = utils.getPageOffset(parentElement);

                if (offset.x > containerOffset.x) {
                    containerOffset.x = offset.x;
                }

                if (offset.y > containerOffset.y) {
                    containerOffset.y = offset.y;
                }
            }

            if (overflow == 'auto' || overflow == 'scroll') {
                scrollContainers.push(parentElement);
            }

            parentElement = parentElement.parentElement;
        }

        this.startPosition_.x += containerOffset.x;
        this.startPosition_.y += containerOffset.y;

        // Remove old scroll containers
        var oldContainers = this.scrollContainers_.slice(0);
        this.scrollContainers_ = [];

        for (var i = 0, len = oldContainers.length; i < len; i++) {
            if (scrollContainers.indexOf(oldContainers[i]) === -1) {
                oldContainers[i].removeEventListener('scroll',
                    this.handleContainerScroll_.bind(this), false);
            } else {
                this.scrollContainers_.push(oldContainers[i]);
            }
        }

        // Add new scroll containers
        for (var i = 0, len = scrollContainers.length; i < len; i++) {
            if (this.scrollContainers_.indexOf(scrollContainers[i]) === -1) {
                this.scrollContainers_.push(scrollContainers[i]);

                scrollContainers[i].addEventListener('scroll',
                    this.handleContainerScroll_.bind(this), false);
            }
        }

        // Update scroll positions
        this.updateScrollPositions();

        // Update bounds with a refresh
        this.updateBounds(true);

        // Update handler
        if (!optPreventHandler) {
            this.handler_.update();
        }
    };


    handleContainerScroll_() {
        setTimeout(this.updateScrollPositions.bind(this), 0);
    };


    reset() {
        this.destroy();
        this.restore();
    };


    destroy() {
        this.destroyed_ = true;

        this.handler_.destroy();
        delete this.handler_;
        this.handler_ = null;

        utils.removeStyle(this.element_, 'transform', true);
    };


    restore() {
        this.destroyed_ = false;

        this.init_();
        this.handlerChanged();
    };


    init_() {
        // Setup handler
        this.handler_ = new Handler(this.config.container);
        this.handler_.onUp(this.handleUp_, this);
        this.handler_.onDown(this.handleDown_, this);
        this.handler_.onMove(this.handleMove_, this);

        // Update settings
        this.updateSettings();

        // Set the initial position
        this.setInitialPosition_();

        // Initial update
        this.update();

        // Init handler
        this.handler_.init();

        // Disable translation
        this.hasTranslation_ = false;

        // Reset last translation
        this.lastTranslation_.x = 0;
        this.lastTranslation_.y = 0;

        // Listen for browser events
        if (this.config.resizeUpdate) {
            window.addEventListener('resize', function () {
                setTimeout(function () {
                    this.setInitialPosition_();
                    this.update();
                }.bind(this), 0);
            }.bind(this), false);
        }

        // Scroll elements
        window.addEventListener('scroll', function () {
            setTimeout(function () {
                this.updateScrollPositions();
                this.updateBounds(true);
            }.bind(this), 0);
        }.bind(this), false);
    };


    setInitialPosition_() {
        var initialPosition = this.handler_.getRelativeElementPosition(this.element_);

        this.handler_.setPosition(
            initialPosition.x + this.positionOffset_.x,
            initialPosition.y + this.positionOffset_.y,
            true
        );
    };


    translate_(x, y) {
        if (this.destroyed_) {
            return;
        }

        x = x - this.positionOffset_.x - this.startPosition_.x + this.scrollOffset_.x;
        y = y - this.positionOffset_.y - this.startPosition_.y + this.scrollOffset_.y;

        if (this.config.lockAxis && this.hasTranslation_) {
            if (isObject(this.config.lockAxis)) {
                if (true == this.config.lockAxis.x) {
                    x = this.lastTranslation_.x;
                }

                if (true == this.config.lockAxis.y) {
                    y = this.lastTranslation_.y;
                }
            }
        }

        utils.setTranslation(this.element_, x, y);

        this.lastTranslation_.x = x;
        this.lastTranslation_.y = y;
        this.hasTranslation_ = true;

        if (this.config.onTranslate) {
            this.config.onTranslate(
                x,
                y,
                this.elementBounds_.width,
                this.elementBounds_.height,
                this.config.bounds ?
                this.config.bounds :
                this.handler_.getTargetBounds()
            );
        }
    };


    hitTest_(x1, y1, x2, y2, width, height) {
        return x1 >= x2 && x1 < x2 + width && y1 >= y2 && y1 < y2 + height;
    };


    handleDown_(x, y) {
        if (this.destroyed_) {
            return false;
        }

        var elementPosition = this.handler_.getRelativeElementPosition(this.element_);
        var containsPoint = this.hitTest_(x, y, elementPosition.x, elementPosition.y,
            this.elementBounds_.width, this.elementBounds_.height);

        if (this.config.autoAnchor && containsPoint) {
            this.positionOffset_.x = x - elementPosition.x;
            this.positionOffset_.y = y - elementPosition.y;
            this.updateBounds();
        }

        if (this.config.onDown) {
            var customHit = this.config.onDown(containsPoint, x, y, elementPosition.x, elementPosition.y,
                this.elementBounds_.width, this.elementBounds_.height);

            if (isBoolean(customHit)) {
                return customHit;
            }
        }

        return containsPoint;
    };


    handleUp_() {
        if (this.destroyed_) {
            return;
        }

        if (this.config.onUp) {
            this.config.onUp();
        }
    };


    handleMove_(posX, posY, velX, velY) {
        if (this.destroyed_) {
            return;
        }

        if (this.config.onMove) {
            var newPosition = this.config.onMove(posX, posY, velX, velY);

            if (isObject(newPosition)) {
                if (newPosition.hasOwnProperty('x')) {
                    posX = parseFloat(newPosition['x']);
                }

                if (newPosition.hasOwnProperty('y')) {
                    posY = parseFloat(newPosition['y']);
                }
            }
        }

        this.translate_(posX, posY);
    }






    // https://spicyyoghurt.com/tools/easing-functions#:~:text=Easing%20functions%20work%20well%20in,will%20return%20the%20eased%20value.
    easeLinear (t, b, c, d) {
        return c * t / d + b;
    }
    
    easeInQuad (t, b, c, d) {
        return c * (t /= d) * t + b;
    }
    
    easeInOutSine (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
   
   
    slideTo(posX = 0, posY = 0) {
        // // TODO: slideTo(x = 0, y = 0)
        // // default values should be current axis position

        
        // this.slideToStart_.x = this.lastTranslation_.x
        // this.slideToStart_.y = this.lastTranslation_.y
        
        // this.slideToTarget = new Coordinate(
        //     posX, // this.position_.x - 
        //     posY, // this.position_.y - 
        //     )
            
            
        //     // this.translate_(-400, 0)
            
            
            
        //     this.slidingTo_ = true
        //     this.slideToProgress_ = 0
            
        // this.animationsStopped_ = false
        // this.requestAnimationFrame_(this.updateSlideTo, this)
    }
    
    
    updateSlideTo() {
        
        // this.slideToProgress_ += 0.05
       
       
        // // const translateX = this.easeInOutSine( this.slideToProgress_, this.lastTranslation_.x,  this.slideToTarget.x, 1)
        // const translateX = this.easeInOutSine( this.slideToProgress_, this.slideToStart_.x,  this.slideToTarget.x, 1)
        // // const translateY = this.easeInOutSine( this.slideToProgress_, this.lastTranslation_.y,  this.slideToTarget.y, 1)
        // const translateY = this.easeInOutSine( this.slideToProgress_, this.slideToStart_.y,  this.slideToTarget.y, 1)
        
        // if( this.slideToProgress_ >= 1 ) {
        //     this.slideToProgress_ = 1
        //     this.slidingTo_ = false
        //     this.animationsStopped_ = true
        //     // this.setInitialPosition_()

        //     this.lastTranslation_.x = translateX
        //     this.lastTranslation_.y = translateY
            
            
        //     this.startPosition_.x = translateX
        //     this.startPosition_.y = translateY

        //     console.log("finish slideTo")
        // }

        // // console.log("translate_")
        // // this.translate_(-400, 0)
        // utils.setTranslation(this.element_,
        //     // this.easeInOutSine( this.slideToProgress_, this.slideToStart_.x,  this.slideToTarget.x, 1), // this.slideToTarget.x,
        //     translateX, // this.slideToTarget.x,
        //     // this.easeInOutSine( this.slideToProgress_, this.slideToStart_.y,  this.slideToTarget.y, 1), // this.slideToTarget.y,
        //     translateY, // this.slideToTarget.y,
        // );


        // this.lastTranslation_.x = translateX
        // this.lastTranslation_.y = translateY

        // this.startPosition_.x = translateX
        //     this.startPosition_.y = translateY

        // // this.translate_(this.slideToTarget.x, this.slideToTarget.y)
        // // this.translate_(this.slideToTarget.x, this.slideToTarget.y)

        // // this.startPosition_ = new Coordinate()
        // // this.lastDownPosition_ = new Coordinate()
        // // this.lastPosition_ = new Coordinate()
        // // this.lastVelocity_ = new Coordinate()
        // // this.boundOverflow_ = new Coordinate()

        // // this.setPosition(this.slideToTarget)
        // // this.position_.x = this.easeLinear( this.slideToProgress_, this.position_.x,  this.slideToTarget.x, 1)
        // // this.position_.x = this.easeInOutSine( this.slideToProgress_, this.slideToStart_.x,  this.slideToTarget.x, 1)
        // // this.lastVelocity_.x = this.slideToTarget.x
        // // this.position_.x = this.easeInOutSine( this.slideToProgress_, 0,  this.slideToTarget.x, 1)
        // // this.position_.y = this.easeLinear( this.slideToProgress_, this.position_.y,  this.slideToTarget.y, 1)
        // // this.position_.y = this.easeInOutSine( this.slideToProgress_, this.slideToStart_.y,  this.slideToTarget.y, 1)
        // // this.lastVelocity_.y = this.slideToTarget.y
        // // this.position_.y = this.easeInOutSine( this.slideToProgress_, 0,  this.slideToTarget.y, 1)

        // // this.update()
        // // this.decelerate_()


        // if( this.slidingTo_ ) this.requestAnimationFrame_(this.updateSlideTo, this)

        // // Notify listeners and apply bounds
        // // this.positionUpdated_();
    }



    requestAnimationFrame_(callback, ctx) {
        if (!this.animationsStopped_) {
            (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)(callback.bind(ctx));
        }
    }
}