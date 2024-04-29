import {
    createContext,
} from 'react';

import { SharedState } from 'Hooks/useSharedState';
// import { useBetween  } from 'Hooks/useBetween';



// import { createStore  } from 'Hooks/useStore'

// const defaultUser = { username: 'Foo' };
// export const [useUserStore] = createStore(defaultUser); // we've created store with initial value.
// // useUserStore has the same signature like react useState hook, but the state will be shared across all components using it




// const NavigationContext = createContext(new SharedState({
//     overflow: undefined,
//     isDesktop: undefined,
//     isMobile: undefined,
// }));

// export default NavigationContext


// const NavigationContentContext = createContext(new SharedState(false));


const NavigationContentContext = createContext(new SharedState(undefined));

const OverflowContext = createContext(new SharedState(undefined));
const MobileOverflowContext = createContext(new SharedState(undefined));
const DesktopOverflowContext = createContext(new SharedState(undefined));

export default NavigationContentContext
export {
    OverflowContext,
    MobileOverflowContext,
    DesktopOverflowContext,
}
