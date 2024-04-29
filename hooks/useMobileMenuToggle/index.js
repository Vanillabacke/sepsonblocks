import {
    useState,
    useEffect,
    useContext,
} from 'react';

import { useSharedState } from 'Hooks/useSharedState';

import MobileMenuToggleContext from './context'

function useMobileMenuToggle() {

    const sharedState = useContext(MobileMenuToggleContext);

    const [mobileMenu, setMobileMenu] = useSharedState(sharedState);


    // useEffect(() => {

    // },[mobileMenu])

    return [mobileMenu, setMobileMenu];
}

export default useMobileMenuToggle
export {
    MobileMenuToggleContext
}

