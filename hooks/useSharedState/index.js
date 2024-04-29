/* https://github.com/nekocode/use-shared-state */


import {
    useState,
    useRef,
    useCallback
} from 'react';

import {
    ValueNotifier,
    useListen
} from './listenable';

export * from './listenable';

export class SharedState extends ValueNotifier {

}


/**
 * Hook a shared state to component
 *
 * @param sharedState Shared state to hook
 * @param shouldUpdate Boolean or function to decide whether to re-render current component when the value of the shared state changes
 */
export function useSharedState(_sharedState, shouldUpdate = true) {
    const [sharedState, setSharedState] = useState(_sharedState)
    return [sharedState, setSharedState]
    // // console.log( sharedState )
    // const [state, setState] = useState(sharedState.getValue());
    // const stateRef = useRef(state);
    // stateRef.current = state;

    // const shouldUpdateRef = useRef(shouldUpdate);
    // shouldUpdateRef.current = shouldUpdate;

    // const listener = useCallback((current, previous) => {
    //     const f = shouldUpdateRef.current;
    //     if (f === false || (f instanceof Function && !f(current, previous))) {
    //         // If the `shouldUpdate` is or returns false, do not update state
    //         return;
    //     }
    //     setState(current);
    // }, []);

    // const onListen = useCallback(() => {
    //     // If the state changed before the listener is added, notify the listener
    //     if (sharedState.getValue() !== stateRef.current) {
    //         listener(sharedState.getValue(), stateRef.current);
    //     }
    // }, [sharedState, listener]);


    // useListen(sharedState, listener, onListen);


    // // return the same function object between renderings
    // const setSharedState = useCallback((v) => {
    //     sharedState.setValue(v);
    // }, [sharedState]);

    // return [sharedState.getValue(), setSharedState];
}
