import {
    useState,
    useEffect,
    useContext,
} from 'react';

import { useSharedState } from 'Hooks/useSharedState';

import NavigationOverflowContext from './context'

function useNavigationOverflow() {

    const sharedState = useContext(NavigationOverflowContext);

    const [mobileMenu, setMobileMenu] = useSharedState(sharedState);


    // useEffect(() => {

    // },[mobileMenu])

    return [mobileMenu, setMobileMenu];
}

export default useNavigationOverflow
export {
    NavigationOverflowContext
}

