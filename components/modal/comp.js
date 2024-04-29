
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


// import { CSSTransition  } from 'react-transitioning'
import { CSSTransition } from "react-transition-group";

import useOverflow from 'Hooks/useOverflow'
import useResizeObserver from 'Hooks/useResizeObserver'
import useNavigationOverflow from 'Hooks/useNavigationOverflow'
import useMobileMenuToggle from 'Hooks/useMobileMenuToggle'




// import { useSharedState } from 'Hooks/use-shared-state';
import useModal from 'Hooks/useModal'


import './style.scss'



function InnerModal ( props ) {
    const innerRef = useRef()
    const {width, height, resizeContainer} = useResizeObserver(innerRef, {parent: false});

    // useEffect( () => {
    //     if( width == undefined || height == undefined ) return
    //     console.log({
    //         width, height, resizeContainer
    //     })
    // }, [width, height, resizeContainer])
    
    useEffect( () => {
        if( width == undefined) return
        props.onUpdateWidth(width)
    }, [width])

    useEffect( () => {
        if( height == undefined) return
        props.onUpdateHeight(height)
    }, [height])


    // useEffect( () => {

    //     // if( !resizeContainer ) return
    //     props.onUpdateWidth(width)
    //     props.onUpdateHeight(height)
    // }, [])

    return <div className="modal-inner" ref={innerRef}>
        {props.children}
    </div>
}




export default (props) => {

    const [modalContent, setModalContent] = useModal()
    
    const componentRef = useRef(props.customDom);
    const ref = useRef(null);
    // const [innerRef, setInnerRef] = useState(useRef(null))


    // const {width, height, resizeContainer} = useResizeObserver(innerRef, {parent: false});

    const [innerWidth, setInnerWidth] = useState(undefined)
    const [innerHeight, setInnerHeight] = useState(undefined)
    
    // console.log("modal-props", props)

    const duration = props?.duration || 800


    // const {
    //     children
    // } = props

    // useEffect( () => {
    //     console.log( "innerRef", innerRef)
    // }, [innerRef])

    
    
    // useEffect(() => {
    //     // console.log(resizeContainer, height)
    //     console.log(innerRef)
    //     // console.log(resizeContainer)

    // },[width, height, resizeContainer, innerRef])
    
    useEffect(() => {
        if( !componentRef?.current ) return
        // console.log('children',  children )
        if( modalContent ) {
            componentRef.current.classList.add('visible')

            // var msg = new SpeechSynthesisUtterance();
            // msg.text = "Leider finden viele Schwangere trotz intensiver Suche, auf Grund des aktuell akuten Hebammenmangels, keine Hebamme. Wir sind mit vielen Hebammen der Stadt Nürnberg vernetzt und möchten Sie an eine passende Hebamme vermitteln.";
            // window.speechSynthesis.speak(msg);
            // setInnerRef()
        } else {
            componentRef.current.classList.remove('visible')
        }
    },[modalContent])
   
    


    // if( !modalContent ) return

    const style = {
        width: `${innerWidth || 0}px`,
        height: `${innerHeight || 0}px`,
        
        '--duration': `${duration}ms`,
        // '--max-height': `${height}px`,

        '--max-width': `${innerWidth || 0}px`,
        '--max-height': `${innerHeight || 0}px`,
    }


    // const innerModal = <div className="modal-inner" ref={innerRef}>
    //     {modalContent && modalContent}
    // </div>
                    
    return <CSSTransition
                // transitionEnterTimeout={500}
                // transitionLeaveTimeout={300}
                timeout={200}
                in={!!modalContent}
                duration={duration}
                // duration={3000}
                // exit={false}
                classNames="modal"
            >
                <div className="modal-wrapper" ref={ref} style={style}>
                    {/* <button onClick={ () =>  { setModalContent(false) }}>Close Modal</button> */}

                    {/* {innerWidth} x {innerHeight} */}

                    <InnerModal onUpdateHeight={setInnerHeight} onUpdateWidth={setInnerWidth} >
                        <button className={"close-modal"} onClick={ () =>  { setModalContent(false) }}>Close Modal</button>
                        {modalContent}
                    </InnerModal>
                    {/* {innerModal} */}
                    {/* <div className="modal-inner" ref={innerRef}>
                        {modalContent && modalContent}
                    </div> */}
            </div>
        </CSSTransition>
}