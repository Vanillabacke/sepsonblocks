import {useCallback, useRef} from 'react';

/*
*   https://github.com/alibaba/hooks/blob/ad9b937c54b94f5527193fa63abb1a9e9b76e1a0/packages/use-request/src/utils/usePersistFn.ts#L3
*/

function usePersistFn(fn) {
    const ref = useRef(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });

    ref.current = fn;

    const persist = useCallback((...args) => {
        const refFn = ref.current;
        if (refFn) {
            return refFn(...args);
        }
    }, [ref],);

    if (typeof fn === 'function') {
        return persist;
    }
    return undefined;
}

export default usePersistFn;