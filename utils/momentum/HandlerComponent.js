function abstractMethod() {
    throw Error('unimplemented abstract method');
}

export default class HandlerComponent {
    constructor(){
        this.handlerChangeCallbacks_ = [];
    }

    getHandler = function(){
        return abstractMethod();
    }


    onHandlerChange = function(callback){
        this.handlerChangeCallbacks_.push(callback);
    }


    handlerChanged = function() {
        for (var i = 0, len = this.handlerChangeCallbacks_.length; i < len; i++) {
            this.handlerChangeCallbacks_[i](this.getHandler());
        }
    }
}