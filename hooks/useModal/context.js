import {
    createContext,
} from 'react';

import { SharedState } from 'Hooks/useSharedState';

const ModalContext = createContext(new SharedState(false));
export default ModalContext