
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
    useCallback,
    useContext,
} from 'react'

import useDimensionBreakpoint from 'Hooks/useDimensionBreakpoint'

// import useOverflow from 'Hooks/use-overflow'
import useResizeObserver from 'Hooks/useResizeObserver'
// import useFullscreen from 'Hooks/use-fullscreen'
// import useInViewport from 'Hooks/use-in-viewport'
// import useOnlineStatus from 'Hooks/use-online-status'
// import useNetwork from 'Hooks/use-network'




// import { useRouter, useLocation, useHistory } from 'wouter-preact'

// import { useLocation } from 'preact/hooks'



// import { useUserStore } from '../navigation/context';
import { useGlobalState } from 'Hooks/useGlobalState';

import './style.scss'




export default (props, compRef) => {
    const ref = useRef();


    const [counter, setCounter] = useGlobalState('counterStore', 0)

    // const [user, setUser] = useUserStore();

    // // const router = useRouter()
    // const parentLocation = useLocation();
    // // const [parentLocation] = useHistory();


    // useEffect(() => {
    //     console.log( 'parentLocation', parentLocation )
    // }, [parentLocation])

    // const connection = useNetwork();

    // const {width, height, resizeContainer } = useResizeObserver(ref, { parent: true })
    // const {height, resizeContainer, resizeObserver, width} = useResizeObserver(ref, { parent: false })
    // const {height, resizeContainer, resizeObserver, width} = useResizeObserver(ref, { parent: true })
    // useEffect( () => {
    //     // console.log( 'resizeContainer:hook', resizeContainer )
    //     console.log( 'resizeContainer:hook',{height, resizeContainer, resizeObserver, width} )
    // }, [width, height, resizeContainer])
   

    
    // const { breakpoint, breakpointData } = useDimensionBreakpoint(ref)
    const { breakpointData, resizeContainer, width, height } = useDimensionBreakpoint(ref, {}, {
        // window: true,
        // container: true,
        parent: true, // not detecting parent
    })

    // const [text, setText] = useRecoilState(textState);

    // const refThis = useRef(this);
    
    // const { refXOverflowing, refXScrollBegin, refXScrollEnd } = useOverflow(ref);
    // const { size } = useResizeObserver(ref);
    // const {width, height, resizeContainer} = useResizeObserver(ref, {parent: true});

    

    // function logout() {
    //     setUser(null)
    //   }

    useEffect(() => {
        // if( ref.current ) {
        //     useResizeObserver(ref.current.parentNode.host, (entry)=>{
        //         console.log( 'using', entry )
        //     })
        // }

        console.log( ref.current )
        console.log('outline', ref.current.style.getPropertyValue('display') )
        // console.log( ref.current.style )
        // console.log( ref.current.currentStyle )
        // console.log( getComputedStyle( ref.current ) )
    }, [ref])
    
    
    // useEffect(() => {
    //     console.log( 'breakpointData', breakpointData )
    // }, [breakpointData])
    
    
    // useEffect(() => {
    //     console.log( 'onlineStatus', onlineStatus )
    // }, [onlineStatus])
    
    // useEffect(() => {
    //     console.log( 'connection', connection )
    // }, [connection])
    
    
    // console.log('children', props.children )
    
    

     return <div className="dimension-wrapper" ref={ref} style={{
                // marginTop: "100vh",
                // marginBottom: "100vh",
                border: '2px solid #0cf',
                // display: 'flex',
            }}>
            {Math.round(width)} x {Math.round(height)}<br />
            {/* {user && <strong>Press this button to log out: <button onClick={logout}>Log out</button></strong>}<br /> */}
            {props.children}

            <div>
                <h4>{counter}</h4>
                <button onClick={() => setCounter(counter+1)}>Click</button>
            </div>
    </div>

}