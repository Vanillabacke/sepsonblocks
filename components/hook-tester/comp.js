
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

import useOverflow from 'Hooks/useOverflow'
import useResizeObserver from 'Hooks/useResizeObserver'

import useMobileMenuToggle from 'Hooks/useMobileMenuToggle'
import useNavigationOverflow from 'Hooks/useNavigationOverflow'
import useModal from 'Hooks/useModal'


import useSwipe from 'Hooks/useSwipe'
import useVerticalSwipe from 'Hooks/useVerticalSwipe'
import useHorizontalSwipe from 'Hooks/useHorizontalSwipe'
import useMouse from 'Hooks/useMouse'
import useWindowScroll from 'Hooks/useWindowScroll'
import useValidatedState  from 'Hooks/useValidatedState'
const passwordValidator = (password) => password.length > 3



import { useSharedState } from 'Hooks/useSharedState';
import CounterContext from '../body/body-context'


import './style.scss'






export default (props, compRef) => {
    
    const sharedState = useContext(CounterContext);
    // console.log( sharedState )
    const [state] = useSharedState(sharedState);

    
    const [mobileMenu, setMobileMenu] = useMobileMenuToggle()
    const [navigationOverflow, setNavigationOverflow] = useNavigationOverflow()

    const [modalContent, setModalContent] = useModal()


    const ref = useRef(null);

    // const [text, setText] = useRecoilState(textState);

    // const refThis = useRef(this);
    
    // const { refXOverflowing, refXScrollBegin, refXScrollEnd } = useOverflow(ref);
    // const { size } = useResizeObserver(ref);
    const {width, height, resizeContainer} = useResizeObserver(ref, {parent: false});





    const swipeState = useSwipe(ref);
    // const swipeState = useVerticalSwipe(ref);
    const showDetail = swipeState.count > 0 || swipeState.swiping;


    const [ showCoords, setShowCoords] = useState(false);
    const [position, { onMouseEnter, onMouseLeave }] = useMouse(ref); 
    onMouseEnter(() => setShowCoords(true))
    onMouseLeave(() => setShowCoords(false))


    const [password, setPassword, validation] = useValidatedState(passwordValidator, 'sk8');




    const [scrollY, setScrollY] = useState(window.scrollY);
  
    useWindowScroll((event) => {
        setScrollY(window.scrollY);
    });
  

    // open = () => this.setState({ open:true });
    // close = () => this.setState({ open:false });

    const [open, setOpen] = useState(true)
    

    // console.log(props)

    

    useEffect(() => {
        // console.log( refThis )
        // console.log('this', this)
        // console.log( 'compRef', compRef )
        // console.log( ref.current )
        // console.log( ref.current.parentNode )
        // console.log( ref.current.parentNode.host )
        // console.log( ref )

        // if( ref.current ) {
        //     useResizeObserver(ref.current.parentNode.host, (entry)=>{
        //         console.log( 'using', entry )
        //     })
        // }


    }, [ref])
    
    useEffect(() => {
        if( !width && !height) return

        // console.log( 'resizeContainer', resizeContainer )
        // console.log( width, height )

    }, [width, height, resizeContainer])
    
    
    // return props.children


    // return <div><div className="overflow-wrapper" ref={ref}>
    //     {/* <button onClick={() => {setValue(value + 1)}}>Add</button><br />
    //     {value}<br /> */}
    //     {/* { refXScrollEnd.toString() } */}
    //     {props.children}
    // </div></div>


//     return  <div>
//         aslkdfjasdklfjlsa
//         {/* <Count />
//     <Buttons />
//     <Count />
//     <Buttons /> */}
    
//     {props.children}
// </div>

     return <div className="overflow-wrapper" ref={ref}>
         <div>state: {state}</div>
         <div>mobileMenu: {mobileMenu.toString()}</div>
         <div>navigationOverflow: {navigationOverflow.toString()}</div>
         
        <button onClick={() => { 
            setModalContent(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio animi at, dignissimos optio mollitia provident accusantium rerum?`)
        }}>Open Modal</button><br />



        
        


        {showCoords && (
            <p>{position.clientX}, {position.clientY}</p>
        )}

        {showDetail && (
          <div>
            <p>Swipe information:</p>
            <p>Is swiping: {swipeState.swiping ? 'yes' : 'no'}</p>
            <p>Direction: {swipeState.direction}</p>
            <p>Alpha-x: {swipeState.alphaX}, Alpha-y: {swipeState.alphaY} </p>
            <p>Swipe count: {swipeState.count}</p>
          </div>
        )}

        <button onClick={() => { 
            // document.getElementById('main').append("hallo")

            // vc-test-comp

            var x = document.createElement("vc-test-comp");                        // Create a <p> node
            var t = document.createTextNode("This is a paragraph.");    // Create a text node
            x.appendChild(t);                                           // Append the text to <p>
            document.body.appendChild(x);                               // Append <p> to <body>
        }}>Add Lazy Component</button><br />

        <p>window y-scroll: {scrollY}</p>


        {/* <button onClick={() => {setValue(value + 1)}}>Add</button><br />
        {value}<br /> */}
        {/* { refXScrollEnd.toString() } */}
        {/* <RecoilRoot>
        </RecoilRoot> */}
            {props.children}


            <p>
                <input
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  
                    placeholder="Insert password"
                /><br />
                {validation.valid ? 'Password is valid' : 'Password is too short'}
            </p>
    </div>



    // return <div className="overflow-wrapper" ref={ref}>
    //     {/* <button onClick={() => {setValue(value + 1)}}>Add</button><br />
    //     {value}<br /> */}
    //     {/* { refXScrollEnd.toString() } */}
    //     {props.children}
    //     </div>
    
    // return <div className="overflower" ref={ref}>
    //     <div className="overflower-inner" ref={refInner}>
    //         {props.children}
    //     </div>
    // </div>

    // return <div className="overflower" ref={ref}>
    //   <button onClick={() => {
    //     setRanData( Math.round(Math.random() * 100) )
    //   }}>Click</button>
    //   {ranData.toString()}
    //   {props.children}
    // </div>
}