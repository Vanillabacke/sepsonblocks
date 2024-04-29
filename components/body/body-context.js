import {
    createContext,
} from 'react';



/*

                useSharedState


                            https://github.com/nekocode/use-shared-state

                    https://github.com/sammysaglam/react-statey
                
                https://github.com/aaroncraigongithub/useSharedState

                https://github.com/magnumjs/shared-state-hook
                https://github.com/Foreinyel/react-use-shared-state
                https://github.com/kelp404/react-hooks-shared-state



*/

import { SharedState } from 'Hooks/useSharedState';

const CounterContext = createContext(new SharedState(0));

export default CounterContext








// export const BodyContext = createContext({ 
//     test:            'bodyVariableContext',
// })


// import {
//     h,
//     Component,
// } from 'preact'

// import {
//     useState,
//     useCallback,
// } from 'preact/hooks'

// import { useBetween } from 'use-between';

// const useCounter = () => {
//     const [count, setCount] = useState(0);
//     const inc = useCallback(() => setCount(c => c + 1), []);
//     const dec = useCallback(() => setCount(c => c - 1), []);
//     return {
//       count,
//       inc,
//       dec
//     };
//   };

// //   const useSharedCounter = () => useBetween(useCounter);
  
//   export default useCounter
//   export default useSharedCounter