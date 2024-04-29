/*
*   https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useUnmount/index.ts
*/

import {useEffect} from 'react';
import usePersistFn from 'Hooks/usePersistFn';
// import {isFunction} from '../utils';

function isFunction(obj) {
    return typeof obj === 'function';
}

const useUnmount = (fn) => {
    const fnPersist = usePersistFn(fn);

    useEffect(() => () => {
        if (isFunction(fnPersist)) {
            fnPersist();
        }
    }, [],);
};

export default useUnmount;