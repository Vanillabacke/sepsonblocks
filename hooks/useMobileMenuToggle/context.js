import {
    createContext,
} from 'react';

import { SharedState } from 'Hooks/useSharedState';

const MobileMenuToggleContext = createContext(new SharedState(false));
export default MobileMenuToggleContext