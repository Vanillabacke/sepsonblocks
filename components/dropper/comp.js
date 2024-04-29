
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
import useDropper from 'Hooks/useDropper'


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
        // ghost,
        // highlighted,
        highlight,
        highlightClassName,
        targetKeys,
    } = useDropper(ref,{
        // targetKey: 'random-key'
        targetKey: targetKey
    })

    useEffect(() => {
        // ref

        // console.log("ref", ref)
        // console.log("props", props)
    }, [ref])

    // useEffect(() => {
    //     // ref
    //     console.log("highlight", highlight)
    // }, [highlight])
    
    // useEffect(() => {
    //     // ref
    //     console.log("highlight", highlight)
    // }, [highlight])
    
    useEffect(() => {
        // ref
        // console.log("dataKey", dataKey)
        setTargetKey(dataKey)
    }, [dataKey])
    


     return <div className="dropper" ref={ref}>
         <h4>Dropper</h4>
         {highlight ? 'highlighted' : 'nope'}
        {/* {highlightClassName} */}
        {props.children}<br />
        <strong>{targetKeys.toString()}</strong>
    </div>

}