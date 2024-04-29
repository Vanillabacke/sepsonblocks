import {
    useState,
    useEffect,
    useContext,
} from 'react';

import { useSharedState } from 'Hooks/useSharedState';

import ModalContext from './context'

function useModal() {

    const sharedState = useContext(ModalContext);

    const [modalContent, setModalContent] = useSharedState(sharedState);


    // useEffect(() => {

    // },[mobileMenu])

    return [modalContent, setModalContent];
}

export default useModal
export {
    ModalContext
}

