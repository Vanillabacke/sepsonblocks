import {
    createContext,
} from 'react';

import { SharedState } from 'Hooks/useSharedState';

const NavigationOverflowContext = createContext(new SharedState(false));
export default NavigationOverflowContext