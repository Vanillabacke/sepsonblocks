
// import React, {
//     h,
//     Component,
//     createRef,
//     useRef,
// } from 'react'


// import Preact, {
//     h,
//     Component,
//     // createRef,
//     // useRef,
//     useRef,
// } from 'preact';


import {
    h,
    Component,
} from 'react'

import {
    useRef,
    useEffect,
    useState,
    // useCallback,
    // useContext,
} from 'react'

// import useOverflow from 'Hooks/use-overflow'
// import useResizeObserver from 'Hooks/use-resize-observer'

// import useMobileMenuToggle from 'Hooks/use-mobile-menu-toggle'
// import useNavigationOverflow from 'Hooks/use-navigation-overflow'
// import useModal from 'Hooks/use-modal'
import useDragger from 'Hooks/useDragger'


// import { useSharedState } from 'Hooks/use-shared-state';
// import CounterContext from '../body/body-context'


import './style.scss'






export default (props, compRef) => {
   
    const {
        dataKey
    } = props


    const ref = useRef(null);

    const [targetKey, setTargetKey] = useState()

    const {
        dropKey,
        ghost,
    } = useDragger(ref,{
        // targetKey: 'random-key'
        targetKey: targetKey
    })

    useEffect(() => {
        // ref
    }, [ref])
   
   
    // useEffect(() => {
    //     // ref
    //     console.log("############## targetKey", dropKey)
    // }, [dropKey])

    useEffect(() => {
        // ref
        // console.log("dataKey", dataKey)
        setTargetKey(dataKey)
    }, [dataKey])
    


     return <div className="dragger" ref={ref}>
         <h4>Dragger</h4>
        {props.children}
        {ghost}
    </div>

}