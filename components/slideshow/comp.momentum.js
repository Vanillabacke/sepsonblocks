import React, {
    useLayoutEffect,
    useRef,
    useState,
} from 'react'

import { useEffect } from 'react'


import useResizeObserver from 'Hooks/useResizeObserver'
import useMutationObserver from 'Hooks/useMutationObserver'


import useMouse from 'Hooks/useMouse'
import useTouch from 'Hooks/useTouch'
import useSwipe from 'Hooks/useSwipe'
import useSwipeEvents from 'Hooks/useSwipeEvents'

import useMomentumDrag from 'Hooks/useMomentumDrag'

import './style.scss'


import { Coordinate, TrackingPoint } from '../../utils/momentum'


// import Draggable from '../../utils/momentum/Draggable'



const slides = [
    {
        width: 400,
        height: 400,
        background: '#ff4c4c',
    },
    {
        width: 400,
        height: 800,
        background: '#dbff4c',
    },
    {
        width: 400,
        height: 400,
        background: '#4cffcd',
    },
    {
        width: 400,
        height: 400,
        background: '#4c9cff',
    },
    {
        width: 400,
        height: 400,
        background: '#4f4cff',
    },
    {
        width: 400,
        height: 400,
        background: '#4cffc5',
    },
]


export default function Slideshow( props ) {

    const translateMode = false
    
    
    const viewportRef = useRef()
    const itemsRef = useRef()


    const [itemsVector, setItemsVector] = useState({x:0,y:0})
    const [itemsTargetVector, setItemsTargetVector] = useState({x:0,y:0})
    const [swipeVector, setSwipeVector] = useState({x:0,y:0})
    
    
    const [maxLeft, setMaxLeft] = useState(false)
    const [maxTop, setMaxTop] = useState(false)
    const [maxRight, setMaxRight] = useState(false)
    const [maxBottom, setMaxBottom] = useState(false)






    const [currentPosition, setCurrentPosition] = useState({x:0,y:0})
    
    const {width, height, resizeContainer, resizeObserver} = useResizeObserver( viewportRef )
    const {mutations, mutationContainer, mutationObserver} = useMutationObserver( itemsRef )
    
    const [mouseState, { onMouseDown, onMouseUp } ] = useMouse( viewportRef )
    const [touches,  { onTouchStart, onTouchEnd } ] = useTouch( viewportRef )


    const draggableRef = useRef()


    // const {
    //     onSwipeLeft,
    //     onSwipeRight,
    //     onSwipeUp,
    //     onSwipeDown,
    //     onSwipeStart,
    //     onSwipeMove,
    //     onSwipeEnd,
    // } = useSwipeEvents(viewportRef)

    // const swipeState  = useSwipe( viewportRef, {
    //     // direction: 'horizontal',
    //     threshold: 10, 
    //     // preventDefault: true,
    //     // preventDefault: false,
    //     preventDefaultDirection: ['left', 'right']
    // })



    // const showDetail = swipeState.count > 0 || swipeState.swiping;
    
    const [autoHeight, setAutoHeight] = useState('autoHeight' in props) // TODO: make observable dom attribute
    
    const [ items, setItems ] = useState([])


    const [showCoords, setShowCoords] = useState(false);

   

    const [momentum] = useMomentumDrag( itemsRef, viewportRef, {
        // container: viewportRef.current,
        // containerBounds: true,
        // resizeUpdate: true,
        // autoAnchor: true,
        lockAxis: {
            x: false,
            y: true,
        },

        preventMove: function(movedX, movedY, isTouchDevice) {
            return movedY > 10 && isTouchDevice;
        }

        // friction: 0.01, // 0.035
        // maxVelocity: 400, // 70
        // restitution: -0.6, // -0.6
    })


    useLayoutEffect( () => {
        if( viewportRef.current ) {
            console.log("mounted")

            // new Draggable(itemsRef.current, {
            //     container: viewportRef.current,
            //     containerBounds: true,
            //     resizeUpdate: true,
            //     autoAnchor: true,
            //     lockAxis: {
            //         x: false,
            //         y: true,
            //     },

            //     friction: 0.01, // 0.035
            //     maxVelocity: 400, // 70
            //     restitution: -0.6, // -0.6
            // })
        }
    }, [])
   

    useLayoutEffect( () => {
        if( mutationContainer && width && height ) {
            resizeHandle()
        }
    }, [width,height, mutationContainer])
   
   
    useLayoutEffect( () => {
        // console.log("MUTATION")

        // if( mutationContainer ) {
            if( mutationContainer && width && height ) {
            // console.log( mutationContainer )
            resizeHandle()
        } 
    }, [mutations, mutationContainer, mutationObserver])




    const resizeHandle = () => {
        // console.log( "resize" )
    }

   
    const itemsWrapperStyle = {}
    // itemsWrapperStyle.position = "rela"
    // itemsWrapperStyle.left = -1200





    return (<div className="slideshow-wrapper">
        <button onClick={()=>{
                console.log("hallo")

                // console.log(momentum)

                // handleMove_(posX, posY, velX, velY)
                // momentum.handleMove_(200, 100, 0.0001, 0.0001)

                // console.log( momentum.getHandler() )
                const handler = momentum.getHandler()
                    // handler.addTrackingPoint_()


                // momentum.slideTo(new Coordinate(-400, 0))
                // momentum.translate(new Coordinate(-400, 0))
                // momentum.translate_(-400, 0)
                momentum.slideTo(-400, 0)

                // handler.animationsStopped_ = false
                // handler.dragging_ = true

                // handler.lastVelocity_ = new Coordinate(-400,0)
                // handler.activeOffsetFriction_ = new Coordinate(0,0)
                // handler.clearStartProperties_()
                // handler.start()
                // // handler.lastPosition_ = new Coordinate(0,0)
                // handler.allowDecelerating_ = true;
                // // handler.setPosition( Math.random() * 400, Math.random() * 200, true)
                // handler.setPosition( 400, 0, true)
                // // handler.trackingPoints_.push(
                // //     new TrackingPoint(new Coordinate(-400,0))
                // //     )
                // //     handler.addTrackingPoint_()
                // handler.positionUpdated_()
                // handler.decelerate_()
                // handler.update()

                
                // console.log('momentum.destroy()')
            }}>Hallo</button>

        <div className="slideshow-viewport" ref={viewportRef}>

            {/* <div style={{ position: "absolute", width: 10, height: 10, backgroundColor: '#ff00cc', transform: 'translate(-50%,-50%)', zIndex: 30, left: itemsVector.x, top: itemsVector.y,}}>itemsVector</div> 
            <div style={{ position: "absolute", width: 10, height: 10, backgroundColor: '#ff00cc', transform: 'translate(-50%,-50%)', zIndex: 30, left: itemsTargetVector.x, top: itemsTargetVector.y,}}>itemsTargetVector</div> 
            <div style={{ position: "absolute", width: 10, height: 10, backgroundColor: '#ff00cc', transform: 'translate(-50%,-50%)', zIndex: 30, left: swipeVector.x, top: swipeVector.y,}}>swipeVector</div>  */}

            {/* <h2>{showCoords.toString()}</h2> */}
            {/* {showDetail && swipeState.swiping && ( */}
                {/* <div style={{position: "absolute", zIndex: 20, userSelect: 'none', padding: 20, margin: 20, background: 'rgba(255,2552,255,.5)'}}>
                    <p>Swipe information:</p>
                    <p>Is swiping: {swipeState.swiping ? 'yes' : 'no'}</p>
                    <p>Direction: {swipeState.direction}</p>
                    <p>Alpha-x: {swipeState.alphaX}, Alpha-y: {swipeState.alphaY} </p>
                    <p>Swipe count: {swipeState.count}</p>
                    {itemsRef.current && <div><p>Container: {itemsRef.current.offsetLeft || 0} - {itemsRef.current.offsetTop || 0}</p></div>}
                    <p>current: {currentPosition.x} - {currentPosition.y}</p>
                </div> */}
            {/* )} */}

            <div className="slideshow-items" ref={itemsRef} style={itemsWrapperStyle}>
                {slides.map( (slide, index) => {
                    return <div key={index} className="slide">
                        <div className="slide-inner" style={{ ... slide }}>
                            {index + 1}
                        </div>
                    </div>
                })}
            </div>
        </div>
        </div>
    )
}




 // onMouseDown(() => setShowCoords(true));
    // onMouseUp(() => setShowCoords(false));

    // onTouchStart(() => setShowCoords(true));
    // onTouchEnd(() => setShowCoords(false));

    // onMouseDown
    // onMouseEnter
    // onMouseLeave
    // onMouseMove
    // onMouseOut
    // onMouseOver
    // onMouseUp


    // const [itemsVector, setItemsVector] = useState({x:0,y:0})
    // const [itemsTargetVector, setItemsTargetVector] = useState({x:0,y:0})
    // const [swipeVector, setSwipeVector] = useState({x:0,y:0})

    // onSwipeStart( () => {
    //     const {
    //         offsetTop,
    //         offsetLeft,
    //         // offsetWidth,
    //         // offsetHeight,
    //         // offsetParent,
    //     } = itemsRef.current

    //     // console.log( itemsRef.current.getBoundingClientRect() )
    //     // console.log( itemsRef.current.offset )
    //     // console.log( 'sshekhasdkjfhasdkjfhn e' )
    //     // setItemsVector({
    //     setCurrentPosition({
    //         x: offsetTop,
    //         y: offsetLeft,
    //     })
    // })


    // onSwipeEnd( () => {
    //     const {
    //         offsetTop,
    //         offsetLeft,
    //         // offsetWidth,
    //         // offsetHeight,
    //         // offsetParent,
    //     } = itemsRef.current

    //     // console.log( itemsRef.current.getBoundingClientRect() )
    //     // console.log( itemsRef.current.offset )
    //     // console.log( 'sshekhasdkjfhasdkjfhn e' )
    //     setItemsVector({
    //         x: offsetTop,
    //         y: offsetLeft,
    //     })
    // })


    // useEffect( () => {
    //     // console.log('mouseState', mouseState)
    //     // console.log( swipeState )

    //     const {
    //         alphaX,
    //         alphaY,
    //         count,
    //         swiping,
    //         direction,
    //     } = swipeState


    //     setSwipeVector({
    //         x: alphaX,
    //         y: alphaY,
    //     })

    //     setItemsTargetVector({
    //         x:  -alphaX + itemsVector.x,
    //         y:  -alphaY + itemsVector.y,
    //     })
    //     // if( direction == 'up' || direction == 'down') {}
    //     // if( direction == 'left' || direction == 'right') {}

    // }, [swipeState ])
   
    // useEffect( () => {
    //     // console.log('mouseState', mouseState)
    //     console.log( showCoords)
    // }, [showCoords])
    
    
    // useEffect( () => {
    //     // console.log('mouseState', mouseState)
    //     console.log('mouseEvents', mouseEvents)
    // }, [mouseEvents])

    // useEffect( () => {
    //     console.log('mouseState', mouseState)
    //     // console.log('mouseEvents', mouseEvents)
    // }, [mouseState])
