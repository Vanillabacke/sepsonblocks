// https://raw.githubusercontent.com/antonioru/beautiful-react-hooks/master/src/useGlobalEvent.ts

import { useEffect } from 'react'
import useHandlerSetterRef from '../utils/useHandlerSetterRef'

/**
 * Accepts an event name then returns a callback setter for a function to be performed when the event triggers.
 */
 const useGlobalEvent = (eventName, fn, opts) => {
    const [handler, setHandler] = useHandlerSetterRef(fn);
    handler.current = fn;
    useEffect(() => {
        const cb = (event) => {
            if (handler.current) {
                handler.current(event);
            }
        };
        if (handler && eventName) {
            window.addEventListener(eventName, cb, opts);
        }
        return () => {
            if (eventName) {
                window.removeEventListener(eventName, cb, opts);
            }
        };
    }, [eventName, opts]);
    return setHandler;
};
export default useGlobalEvent;
