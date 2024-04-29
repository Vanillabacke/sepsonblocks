import {
    createContext,
} from 'react';

import { SharedState } from 'Hooks/useSharedState';

// const NavigationContext = createContext(new SharedState({
//     overflow: undefined,
//     isDesktop: undefined,
//     isMobile: undefined,
// }));

// export default NavigationContext


const NavigationContentContext = createContext(new SharedState(false));

const OverflowContext = createContext(new SharedState(undefined));
const MobileOverflowContext = createContext(new SharedState(undefined));
const DesktopOverflowContext = createContext(new SharedState(undefined));

export default NavigationContentContext
export {
    OverflowContext,
    MobileOverflowContext,
    DesktopOverflowContext,
}
