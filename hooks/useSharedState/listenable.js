import { useEffect } from 'react';
export class Listenable {
    constructor() {
        this._listeners = Array();
    }
    hasListeners() {
        return this._listeners.length > 0;
    }
    addListener(listener) {
        this._listeners.push(listener);
    }
    removeListener(listener) {
        const index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    }
}
export class ChangeNotifier extends Listenable {
    notifyListeners() {
        if (!this.hasListeners())
            return;
        for (const listener of this._listeners) {
            listener();
        }
    }
}
export class ValueNotifier extends Listenable {
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        const previous = this.value;
        this.value = value instanceof Function ? value(this.value) : value;
        this.notifyListeners(this.value, previous);
    }
    notifyListeners(current, previous) {
        if (!this.hasListeners())
            return;
        for (const listener of this._listeners) {
            listener(current, previous);
        }
    }
}
/**
 * Hook a callback to component
 *
 * @param listenable Listenable to hook
 * @param listener Bind the callback to listenable after component mounted and unbind it after component unmounted
 */
export function useListen(listenable, listener, onListen) {
    useEffect(() => {
        // console.log("listen")
        listenable.addListener(listener);
        let onRemove;
        if (onListen) {
            onRemove = onListen();
        }
        return () => {
            listenable.removeListener(listener);
            if (onRemove) {
                onRemove();
            }
        };
    }, [listenable, listener, onListen]);
}