import {
    h,
} from 'react'

import {
    useRef,
    useEffect,
    useState,
    useCallback,
    // useLayoutEffect,
} from 'react'

import classname from 'classname';


import useStateRef  from 'Hooks/useStateRef'

function usesLeftButton(e) {
    const button = e.buttons || e.which || e.button;
    return button === 1;
}

function getFixedOffset() {
    // When browser window is zoomed, IOS browsers will offset "location:fixed" component coordinates
    // from the actual window coordinates
    let fixedElem = document.createElement('div');
    fixedElem.style.cssText = 'position:fixed; top: 0; left: 0';
    document.body.appendChild(fixedElem);
    const rect = fixedElem.getBoundingClientRect();
    document.body.removeChild(fixedElem);
    return [rect.left, rect.top]
}

function isZoomed() {
    // somewhat arbitrary figure to decide whether we need to use getFixedOffset (above) or not
    return Math.abs(1 - (document.body.clientWidth / window.innerWidth)) > 0.02;
}






const defaultProps = {
    parent: false,


    targetKey: 'ddc',
    children: null,
    customDragElement: null,
    disappearDraggedElement: false,
    dragClone: false,
    ghostElemOpacity: 0.9,
    dragData: {},
    dragHandleClassName: '',
    onDragStart: () => {},
    onDrag: () => {},
    onDragEnd: () => {},
    onDrop: () => {},
    
    onUp: () => {},
    onDown: () => {},
    onMove: () => {},

    noDragging: false,
    render: null,
    xOnly: false,
    yOnly: false,
    zIndex: 1000,
};





function useDragger(ref, options = {} ) {

    options = {
        ... defaultProps,
        ... options,
    }


    const that = this

    const {
        targetKey,
        children,
        customDragElement,
        disappearDraggedElement,
        dragClone,
        ghostElemOpacity,
        dragData,
        dragHandleClassName,
        onDragStart,
        onDrag,
        onDragEnd,
        onDrop,
        onUp,
        onDown,
        onMove,
        noDragging,
        render,
        xOnly,
        yOnly,
        zIndex,
    } = options

    // const [targetKey, setTargetKey] = useState(options.targetKey || defaultProps.tar)
    const [targetKeys, setTargetKeys] = useState([])



    useEffect( () => {

        if( typeof targetKey != 'string' ) return
        // console.log(" ")
        // // console.log("hook: dataKey ", options.targetKey)
        // console.log("hook: dataKey ",targetKey.split(','))
        // // console.log("hook: highlightClassName ", highlightClassName)
        // console.log(" ")

        setTargetKeys( targetKey.split(',') )
    },[targetKey])


    useEffect( () => {
        targetKeys.forEach( (k) => {
            // console.log(k)
            if (dragContainer) {
                // dragContainer.addEventListener(`${k}DragEnter`, handleDragEnter, false);
                // dragContainer.addEventListener(`${k}DragLeave`, handleDragLeave, false);
                // dragContainer.addEventListener(`${k}Drop`, handleDrop, false);
            }
        })
    },[targetKeys])


    const [dragContainer, setDragContainer] = useState()
    // const [isMounted, setMounted]       = useState(false)

    const isMounted = useRef(false)
    const [ghost, setGhost]       = useState(null)

    const [ghostStyles, setGhostStyles] = useState({})
    // const ghost       = useRef(null)





    // The DOM elem we're dragging, and the elements we're dragging over.
    const ghostElem = useRef(null)
    const sourceElem = useRef(null)
    const currentTarget = useRef(null)
    const prevTarget = useRef(null)

    // offset factors that occur when dragging in a zoomed-in IOS browser
    const fixedOffsetLeft = useRef(0)
    const fixedOffsetTop = useRef(0)

    // scrolling at edge of window
    const scrollTimer = useRef(null)
    const xScroll = useRef(0)
    const yScroll = useRef(0)
    
    // const clicked = useRef(false)
    // const dragging = useRef(false)
    
    const [clicked, setClicked] = useStateRef(false)
    const [dragging, setDragging] = useStateRef(false)

    const leftOffset = useRef(0)
    const topOffset = useRef(0)
    const left = useRef(0)
    const top = useRef(0)


    const [pos, setPos ] = useState({x:0, y: 0})



    // const handleClick = useCallback( (node) => {
    //     console.log("handleClick")
    // },[] )



    const addListeners = (elem) => {
        elem.addEventListener('mousedown', (e) => { handleMouseDown(e); }, false);
        // elem.addEventListener('touchstart', (e) => { this.handleTouchStart(e); }, false);
        elem.addEventListener('touchstart', (e) => { handleTouchStart(e); }, { passive: false } );
        // must add touchmove listener here in order for preventDefault() to work, to prevent scrolling during drag..
        elem.addEventListener('touchmove', handleTouchMove, { passive: false });
        elem.addEventListener('touchend',  handleTouchEnd);


        elem.addEventListener('mousemove', handleMove, {passive: true});
        elem.addEventListener('touchmove', handleMove, {passive: true});
    }


    const buildCustomEvent = (eventName, extraData = {}) => {
        let e;
        if (typeof window.CustomEvent !== 'function') {
            // we are in IE 11 and must use old-style method of creating event
            e = document.createEvent('CustomEvent');
            e.initCustomEvent(eventName, true, true, {});
        } else {
            e = new CustomEvent(eventName, { bubbles: true, cancelable: true });
        }
        // Add useful data to the event
        Object.assign(e, {
            dragData: dragData,
            ghostElem: ghostElem.current,
            dragContainer: dragContainer,
            // sourceElem: sourceElem.current,
        }, extraData);
        return e;
    }



    const setCurrentTarget = (x, y) => {

        if( !ghostElem.current ) return
        // drop the z-index to get this elem out of the way, figure out what we're dragging over, then reset the z index
        ghostElem.current.style.zIndex = -1;
        const target = document.elementFromPoint(x, y) || document.body;
        ghostElem.current.style.zIndex = zIndex;
        // prevent it from selecting itself as the target
        currentTarget.current = ghostElem.current.contains(target) ? document.body : target;
    }

    const setFixedOffset = () => {
        if (isZoomed()){
            [fixedOffsetLeft.current, fixedOffsetTop.current] = getFixedOffset();
        }
    }


    const doScroll = () => {
        window.scrollBy(xScroll.current, yScroll.current)
        setFixedOffset();
    }

    const startScrolling = (x, y) => {
        [xScroll.current, yScroll.current] = [x,y];
        if(!scrollTimer.current){
            scrollTimer.current = setInterval(doScroll, 50);
        }
    }

    const stopScrolling = () => {
        clearInterval(scrollTimer.current);
        scrollTimer.current = null;
    }


    const generateEnterLeaveEvents = (x, y) => {
        
        setCurrentTarget(x, y);

        // generate events as we enter and leave elements while dragging
        const prefix = targetKey;
        if (currentTarget.current !== prevTarget.current) {
            if (prevTarget.current) { prevTarget.current.dispatchEvent(buildCustomEvent(`${prefix}DragLeave`)); }
            if (currentTarget.current) { currentTarget.current.dispatchEvent(buildCustomEvent(`${prefix}DragEnter`)); }
        }
        prevTarget.current = currentTarget.current;



        // targetKeys.forEach( (k) => {
        //     if (prevTarget.current) {
        //         // generate events as we enter and leave elements while dragging
        //         const prefix = k;
        //         if (currentTarget.current !== prevTarget.current) {
        //             if (prevTarget.current) { prevTarget.current.dispatchEvent(buildCustomEvent(`${prefix}DragLeave`)); }
        //             if (currentTarget.current) { currentTarget.current.dispatchEvent(buildCustomEvent(`${prefix}DragEnter`)); }
        //         }
        //         prevTarget.current = currentTarget.current;
        //     }
        // })
        
        
        
    }

    const generateDropEvent = (x, y) => {
        // generate a drop event in whatever we're currently dragging over
        setCurrentTarget(x, y);

        if( !currentTarget.current ) return 


        const customEvent = buildCustomEvent(`${targetKey}Drop`, { x, y });
        // targetKeys.forEach( (k) => {
        //     const customEvent = buildCustomEvent(`${k}Drop`, { x, y });
        //     currentTarget.current.dispatchEvent(customEvent);
        // })
    }






    // Start the Drag
        const handleMouseDown = (e) => {
            if (usesLeftButton(e) && !noDragging) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('touchmove', handleMouseMove);
                document.addEventListener('mouseup',   handleMouseUp);
                document.addEventListener('touchend',  handleMouseUp);
                onDown && onDown(e)
                startDrag(e.clientX, e.clientY);
            }
        };

        const handleTouchStart = (e) => {
            if (!noDragging) {
                e.stopPropagation();
                setFixedOffset();
                startDrag(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            }
        };

        const startDrag = (clickX, clickY) => {

            document.addEventListener(`${targetKey}Dropped`, onDrop);
            // targetKeys.forEach( (k) => {
            //     document.addEventListener(`${k}Dropped`, onDrop);
            // })
            const rect = dragContainer.getBoundingClientRect();
            // this.setState({
            //     clicked: true,
            //     leftOffset: rect.left - clickX,
            //     topOffset: rect.top - clickY,
            //     left: rect.left,
            //     top: rect.top,
            // });
            // clicked.current = true
            setClicked(true)
            leftOffset.current = rect.left - clickX
            topOffset.current = rect.top - clickY
            left.current = rect.left
            top.current = rect.top

            isMounted.current && dragContainer.classList.add('is-dragging')
            // this.props.onDragStart(this.props.dragData);
            onDragStart({
                ... dragData,
                ... {
                    dragGhost: ghostElem.current,
                }

            });
        };







    // During Drag
        const handleMouseMove = (e) => {
            if (!noDragging) {
                e.preventDefault();
                if (clicked.current) {
                    drag(e.clientX, e.clientY);
                    // console.log("handleMouseMove", e)
                    window.getSelection().removeAllRanges(); // prevent firefox native-drag issue when image is highlighted
                    isMounted.current && dragContainer.classList.add('is-dragging')
                }
            }
        };

        const handleTouchMove = (e) => {
            if (!noDragging) {
                e.preventDefault();  // prevents window scrolling
                if (clicked.current) {
                    drag(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
                }
            }
        };


        const getOffscreenCoordinates = (x, y) => {
            // are we offscreen (or very close, anyway)? if so by how much?
            const LEFTEDGE = 10
            const RIGHTEDGE = window.innerWidth - 10
            const TOPEDGE = 10
            const BOTTOMEDGE = window.innerHeight - 10
            const xOff = x < LEFTEDGE ? x - LEFTEDGE : x > RIGHTEDGE ? x - RIGHTEDGE : 0;
            const yOff = y < TOPEDGE ? y - TOPEDGE : y > BOTTOMEDGE? y - BOTTOMEDGE : 0;
            return yOff || xOff ? [xOff, yOff] : false;
        };
    

       

        const drag = (x, y) => {
            generateEnterLeaveEvents(x, y);
            const stateChanges = { dragging: true };
            const offScreen = getOffscreenCoordinates(x, y);

            if (offScreen) {
                startScrolling(...offScreen)
            } else {
                stopScrolling();
                if (!yOnly) { stateChanges.left = (leftOffset.current + x) - fixedOffsetLeft.current }
                if (!xOnly) { stateChanges.top = (topOffset.current + y) - fixedOffsetTop.current }
            }
            // this.setState(stateChanges);

            // dragging.current = stateChanges.dragging
            setDragging(stateChanges.dragging)
            left.current = stateChanges.left
            top.current = stateChanges.top

            setPos({
                x: stateChanges.left,
                y: stateChanges.top,
            })
            onDrag(dragData, currentTarget.current, x, y);
        };



    


    // Drop
        const handleMouseUp = (e) => {
            // clicked.current = false
            setClicked(false)
            if (dragging.current) {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('touchmove', handleMouseMove);
                document.removeEventListener('mouseup',   handleMouseUp);
                document.removeEventListener('touchend',  handleMouseUp);
                drop(e.clientX, e.clientY);
                window.getSelection().removeAllRanges(); // prevent weird-looking highlights
            }
            onUp && onUp(e)
            isMounted.current && dragContainer.classList.remove('is-dragging')

        };

        const handleTouchEnd = (e) => {
            // clicked.current = false
            setClicked(false)
            if (dragging.current) {
                drop(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            }
        };







    // mousemove and touchmove
        const handleMove = (e) => {
            onMove && onMove(e)
        }
    
        const drop = (x, y) => {



            // console.log( "drop", isMounted.current)
            // console.log( "drop:key:", targetKey)
            // console.log( " ")
            // console.log( {dragging: dragging.current, clicked: clicked.current, left: left.current, top: top.current, })
            stopScrolling();
            generateDropEvent(x, y);
            document.removeEventListener(`${targetKey}Dropped`, onDrop);
            // targetKeys.forEach( (k) => {
            //     document.removeEventListener(`${k}Dropped`, onDrop);
            // })
            // this._isMounted && this.setState({ dragging: false });
            if(isMounted.current) {
                
                // dragging.current =  false
                setDragging(false)
                dragContainer.classList.remove('is-dragging')
            }


            console.log( {dragging: dragging.current, clicked: clicked.current, left: left.current, top: top.current, })
            // dragging.current = false
            // clicked.current = false
            onDragEnd(dragData, currentTarget.current, x, y);

        };
    
        const getDisplayMode = () => {
            if (dragging.current && !dragClone && !customDragElement) {
                if (disappearDraggedElement) {
                    return 'disappeared'
                }
                return 'hidden'
            }
            return 'normal'
        };




/*
    useEffect(() => {

        
 
        //  console.log( {dragging: dragging.current, clicked: clicked.current, left: left.current, top: top.current, })
 
         

        setGhostStyles({
            // display:    dragging.current ? 'block' : 'none',
            position: 'fixed',
            pointerEvents: 'none',
            // cursor: 'move',
            left:       left.current,
            top:        top.current,
            zIndex:     zIndex.current,
            opacity:    ghostElemOpacity,

            '--left-offset': `${ (leftOffset.current * -1) || 0}px`,
            '--top-offset': `${ (topOffset.current * -1) || 0}px`,
        })
          
    },[
        customDragElement,
        ghostElem.current,
        sourceElem.current,
        currentTarget.current,
        prevTarget.current,
        xScroll.current,
        yScroll.current,
        clicked.current,
        dragging.current,
        leftOffset.current,
        topOffset.current,
        left.current,
        top.current,
        isMounted.current,
        pos,
    ])



    useEffect( () => {
        // console.log( ghostStyles )

         // const content = this.props.render ? this.props.render(this.state) : this.props.children;
         const displayMode = getDisplayMode();

         // dragging will be applied to the "ghost" element
         let ghostContent;
         if (customDragElement) {
             ghostContent = customDragElement;
         } else {
             // ghostContent = content;   // dragging a clone
             ghostContent = <div>Ghost</div>   // dragging a clone
         }

        setGhost(
            <div className="dragger-ghost" style={ghostStyles} ref={(c) => { ghostElem.current = c; }}>
                {ghostContent}<br />
                dragging: {dragging.current.toString()}<br />
                clicked: {clicked.current.toString()}
            </div>
        )
    }, [ghostStyles])

    */


    
    useEffect(() => {
        // const content = this.props.render ? this.props.render(this.state) : this.props.children;
        const displayMode = getDisplayMode();

        // dragging will be applied to the "ghost" element
        let ghostContent;
        if (customDragElement) {
            ghostContent = customDragElement;
        } else {
            // ghostContent = content;   // dragging a clone
            ghostContent = <div>Ghost</div>   // dragging a clone
        }

        // console.log( {dragging: dragging.current, clicked: clicked.current, left: left.current, top: top.current, })

        const ghostStyles = {
            position: 'fixed',
            pointerEvents: 'none',
            // cursor: 'move',
            left:       left.current,
            top:        top.current,
            zIndex:     zIndex.current,
            opacity:    ghostElemOpacity,
            display:    dragging.current ? 'block' : 'none',

            '--left-offset': `${ (leftOffset.current * -1) || 0}px`,
            '--top-offset': `${ (topOffset.current * -1) || 0}px`,
        };

        // const ghost = (
        //     <div className="dragger-ghost" style={ghostStyles} ref={(c) => { ghostElem.current = c; }}>
        //         {ghostContent}
        //     </div>
        // )

        // setGhost( ghost )

        // console.log("update ghost")

        // ghost.current = (
        setGhost(
            <div className="dragger-ghost" style={ghostStyles} ref={(c) => { ghostElem.current = c; }}>
                {ghostContent}<br />
                dragging: {dragging.current.toString()}<br />
                clicked: {clicked.current.toString()}
            </div>
        )

        
    },[
        customDragElement,
        ghostElem.current,
        sourceElem.current,
        currentTarget.current,
        prevTarget.current,
        xScroll.current,
        yScroll.current,
        clicked.current,
        dragging.current,
        leftOffset.current,
        topOffset.current,
        left.current,
        top.current,
        isMounted.current,
        pos,
    ])
  






    useEffect(() => {
        if (ref.current) {
            // if (!(ref.current.parentNode instanceof HTMLElement) && !!ref.current.parentNode ?.host) { // shadowDom
            if (!(ref.current.parentNode instanceof HTMLElement) && !!ref.current.parentNode?.host) { // shadowDom
                setDragContainer(ref.current.parentNode.host)
            } else {
                setDragContainer((options.parent ? ref.current.parentNode : ref.current))
            }
        }

        return (dragContainer) => {
            // onUnmount
            console.log("removed", dragContainer)
        }
    }, [ref])


    // useEffect( () => {
    //     console.log("dragging, clicking")
    //     console.log( 'effect', {dragging: dragging.current, clicked: clicked.current, left: left.current, top: top.current, })
    // }, [
    //     dragging,
    //     clicked,
    // ])



    useEffect(() => {
        // console.log("dragg will removed", dragContainer)

        if (dragContainer) {
            // dragContainer
            // console.log(dragContainer)
            // setMounted(true)
            isMounted.current = true


            // set draggable attribute 'false' on any images, to prevent conflicts w browser native dragging
            const imgs = dragContainer.getElementsByTagName('img')
            for (let i = 0; i < imgs.length; i += 1) {
                imgs[i].setAttribute('draggable', 'false');
            }



            // capture events
            if (dragHandleClassName) {
                // if drag handles
                const elems = dragContainer.getElementsByClassName(dragHandleClassName);
                for (let i = 0; i < elems.length; i += 1) {
                    addListeners(elems[i]);
                    // elems[i].style.cursor = 'move';
                }
            } else {
                // ... or not
                addListeners(dragContainer);
                // this.containerElem.style.cursor = 'move';
            }



        } else  {
            // setMounted(false)
            isMounted.current = false
        }
    }, [dragContainer])

    


    return {
        // displayMode,
        // ghostContent,
        // ghostStyles,
        ghost: dragging.current ? ghost : false, // || <div>Ghost</div>,
        // ghost: ghost, // || <div>Ghost</div>,
        // ghost: <div>Ghost</div>,
    }


}

export default useDragger



  
  
//   function useResizeObserver(ref, options = {
//       parent: false
//   }) {
  
//       const [size, setSize] = useState()
//       const [width, setWidth] = useState()
//       const [height, setHeight] = useState()
//       const [resizeContainer, setResizeContainer] = useState()
  
//       const resizeObserver = useRef(new ResizeObserver((entries) => {
//           const {width, height} = entries[0].contentRect
//           setWidth(width)
//           setHeight(height)
//       }))
  
//       useEffect(() => {
//           if (ref.current) {
//               // if (!(ref.current.parentNode instanceof HTMLElement) && !!ref.current.parentNode ?.host) { // shadowDom
//               if (!(ref.current.parentNode instanceof HTMLElement) && !!ref.current.parentNode?.host) { // shadowDom
//                   setResizeContainer(ref.current.parentNode.host)
//               } else {
//                   setResizeContainer((options.parent ? ref.current.parentNode : ref.current))
//               }
//           }
  
//           return () => {
//               // console.log( 'resizeObserver', resizeObserver.current )
//               // console.log( 'resizeObserver: resizeContainer', resizeContainer )
//               if(resizeObserver.current && resizeContainer) resizeObserver.current.unobserve(resizeContainer)
//           }
//       }, [ref])
  
//       useEffect(() => {
//           if (resizeContainer) {
//               // console.log( resizeContainer )
//               // resizeObserver.current.observe(resizeContainer)
//               // console.log( 'resizeContainer', resizeContainer )
//               resizeObserver.current.observe(resizeContainer)
//           }
//       }, [resizeContainer])
  
//       // return {height, resizeContainer, resizeObserver, width}
//       return {width, height, resizeContainer, resizeObserver}
//   }
  
//   export default useResizeObserver
  