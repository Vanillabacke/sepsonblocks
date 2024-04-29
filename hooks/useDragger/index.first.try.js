import {
    h,
} from 'react'

import {
    useRef,
    useEffect,
    useState,
    // useLayoutEffect,
} from 'react'

import classname from 'classname';



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
    dragElemOpacity: 0.9,
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
        dragElemOpacity,
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


    const [dragContainer, setDragContainer] = useState()
    const [isMounted, setMounted]       = useState(false)

    // The DOM elem we're dragging, and the elements we're dragging over.
    const [dragElem, setDragElem]           = useState(null)
    const [sourceElem, setSourceElem]       = useState(null)
    const [currentTarget, setCurrentTarget] = useState(null)
    const [prevTarget, setPrevTarget]       = useState(null)

    const [ghost, setGhost]       = useState(null)


    // offset factors that occur when dragging in a zoomed-in IOS browser
    const [fixedOffsetLeft, setFixedOffsetLeft] = useState(0)
    const [fixedOffsetTop, setFixedOffsetTop] = useState(0)

    // scrolling at edge of window
    const [scrollTimer, setScrollTimer] = useState(null)
    const [xScroll, setXScroll] = useState(0)
    const [yScroll, setYScroll] = useState(0)


    const [leftOffset, setLeftOffset]       = useState(0)
    const [topOffset, setTopOffset]         = useState(0)
    const [left, setLeft]                   = useState(0)
    const [top, setTop]                     = useState(0)
    const [clicked, setClicked]             = useState(false)
    const [dragging, setDragging]           = useState(false)


    const clickedRef = useRef(clicked)
    const draggingRef = useRef(dragging)
    const dragElemRef = useRef(dragElem)
    const prevTargetRef = useRef(prevTarget)
    const currentTargetRef = useRef(currentTarget)







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
            // dragElem: dragElem,
            dragElem: dragElemRef.current,
            containerElem: dragContainer,
            sourceElem: sourceElem,
        }, extraData);
        return e;
    }



    const setTheCurrentTarget = (x, y) => {
        // drop the z-index to get this elem out of the way, figure out what we're dragging over, then reset the z index
        dragElemRef.current.style.zIndex = -1;
        const target = document.elementFromPoint(x, y) || document.body;
        dragElemRef.current.style.zIndex = zIndex;
        // prevent it from selecting itself as the target
        setCurrentTarget(dragElemRef.current.contains(target) ? document.body : target);
        currentTargetRef.current = dragElemRef.current.contains(target) ? document.body : target;
    };

    const setFixedOffset = () => {
        if (isZoomed()){
            [fixedOffsetLeft, fixedOffsetTop] = getFixedOffset();
        }
    };

    const doScroll = () => {
        window.scrollBy(xScroll, yScroll)
        setFixedOffset();
    };

    const startScrolling = (x, y) => {
        [xScroll, yScroll] = [x,y];
        if(!scrollTimer){
            setScrollTimer( setInterval(doScroll, 50) )
        }
    };

    const stopScrolling = () => {
        clearInterval(scrollTimer);
        setScrollTimer(null)
    };


    const generateEnterLeaveEvents = (x, y) => {
        // generate events as we enter and leave elements while dragging
        const prefix = targetKey;
        setTheCurrentTarget(x, y);
        if (currentTargetRef.current !== prevTargetRef.current) {
            if (prevTargetRef.current) { prevTargetRef.current.dispatchEvent(buildCustomEvent(`${prefix}DragLeave`)); }
            if (currentTargetRef.current) { currentTargetRef.current.dispatchEvent(buildCustomEvent(`${prefix}DragEnter`)); }
        }
        setPrevTarget(currentTarget)
        prevTargetRef.current = currentTargetRef.current
    };

    const generateDropEvent = (x, y) => {
        // generate a drop event in whatever we're currently dragging over
        setTheCurrentTarget(x, y);
        const customEvent = buildCustomEvent(`${targetKey}Drop`, { x, y });
        // currentTarget.dispatchEvent(customEvent);
        currentTargetRef.current.dispatchEvent(customEvent);
    };







    // Start the Drag
        const handleMouseDown = (e) => {
            // console.log("handleMouseDown")
            if (usesLeftButton(e) && !noDragging) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('touchmove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
                document.addEventListener('touchend', handleMouseUp);
                onDown && onDown(e)
                startDrag(e.clientX, e.clientY);
            }
        };

        const handleTouchStart = (e) => {
            // console.log("handleTouchStart")
            if (!noDragging) {
                e.stopPropagation();
                setFixedOffset();
                startDrag(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            }
        };

        const startDrag = (clickX, clickY) => {
            // console.log("startDrag")
            document.addEventListener(`${targetKey}Dropped`, onDrop);
            const rect = dragContainer.getBoundingClientRect();

            setClicked( true )
            clickedRef.current = true

            setLeftOffset( rect.left - clickX )
            setTopOffset( rect.top - clickY )
            setLeft( rect.left )
            setTop( rect.top )
    
            isMounted && dragContainer.classList.add('is-dragging')
            // this.props.onDragStart(this.props.dragData);
            onDragStart({
                ... dragData,
                ... {
                    dragGhost: dragElemRef.current,
                }
    
            });
        };


        // useEffect( () => {
        //     console.log("clicked", clicked)
        // },[clicked])








        // During Drag
        const handleMouseMove = (e) => {
            // console.log("handleMouseMove", clickedRef)
            if (!noDragging) {
                e.preventDefault();
                // if (clicked) {
                if (clickedRef.current) {
                    drag(e.clientX, e.clientY);
                    window.getSelection().removeAllRanges(); // prevent firefox native-drag issue when image is highlighted
                    isMounted && dragContainer.classList.add('is-dragging')
                }
            }
        };

        const handleTouchMove = (e) => {
            // console.log("handleTouchMove")
            if (!noDragging) {
                e.preventDefault();  // prevents window scrolling
                // if (clicked) {
                if (clickedRef.current) {
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


        // drag = (x, y) => {
        //     this.generateEnterLeaveEvents(x, y);
        //     const stateChanges = { dragging: true };
        //     const offScreen = this.getOffscreenCoordinates(x, y);
        //     if (offScreen) {
        //         this.startScrolling(...offScreen)
        //     } else {
        //         this.stopScrolling();
        //         if (!this.props.yOnly) { stateChanges.left = (this.state.leftOffset + x) - this.fixedOffsetLeft; }
        //         if (!this.props.xOnly) { stateChanges.top = (this.state.topOffset + y) - this.fixedOffsetTop; }
        //     }
        //     this.setState(stateChanges);
        //     this.props.onDrag(this.props.dragData, this.currentTarget, x, y);
        // };

        const drag = (x, y) => {
            // console.log("drag")
            generateEnterLeaveEvents(x, y);
            const stateChanges = { dragging: true };
            const offScreen = getOffscreenCoordinates(x, y);
            if (offScreen) {
                startScrolling(...offScreen)
            } else {
                stopScrolling();
                if (!yOnly) { stateChanges.left = (leftOffset + x) - fixedOffsetLeft; }
                if (!xOnly) { stateChanges.top = (topOffset + y) - fixedOffsetTop; }
            }

            // !!!!!!!!!!!! this.setState(stateChanges);
            setDragging(stateChanges.dragging)
            draggingRef.current = stateChanges.dragging
            setLeft(stateChanges.left)
            setTop(stateChanges.top)
            // onDrag(dragData, currentTarget, x, y);
            onDrag(dragData, currentTargetRef.current, x, y);
        };





        // Drop
        const handleMouseUp = (e) => {
            // console.log("handleMouseUp")
            setClicked(false);
            clickedRef.current = false
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
            if (draggingRef.current) {
                drop(e.clientX, e.clientY);
                window.getSelection().removeAllRanges(); // prevent weird-looking highlights
            }
            onUp && onUp(e)
            isMounted && dragContainer.classList.remove('is-dragging')
        };
        
        const handleTouchEnd = (e) => {
            // console.log("handleTouchEnd")
            setClicked(false);
            clickedRef.current = false
            if (draggingRef.current) {
                drop(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            }
        };





        // mousemove and touchmove
        const handleMove = (e) => {
            // console.log("handleMove")
            onMove && onMove(e)
        }

        const drop = (x, y) => {
            // console.log("drop")
            stopScrolling();
            generateDropEvent(x, y);
            document.removeEventListener(`${targetKey}Dropped`, onDrop);
            isMounted && setDragging(false)
            draggingRef.current = false
            isMounted && dragContainer.classList.remove('is-dragging')
            onDragEnd(dragData, currentTargetRef.current, x, y);
        };

        const getDisplayMode = () => {
            if (draggingRef.current && !dragClone && !customDragElement) {
                if (disappearDraggedElement) {
                    return 'disappeared'
                }
                return 'hidden'
            }
            return 'normal'
        };









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



    useEffect(() => {
        // console.log("dragg will removed", dragContainer)

        if (dragContainer) {
            // dragContainer.current
            // console.log(dragContainer)
            setMounted(true)


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
            setMounted(false)
        }
    }, [dragContainer])

    // return {height, resizeContainer, resizeObserver, width}
    // return {width, height, resizeContainer, resizeObserver}
    // return dragContainer


    useEffect( () => {

        // const content = this.props.render ? this.props.render(this.state) : this.props.children;
        const content = children;

        const displayMode = getDisplayMode();
        
        // dragging will be applied to the "ghost" element
        let ghostContent;
        if (customDragElement) {
            ghostContent = customDragElement;
        } else {
            // ghostContent = content;   // dragging a clone
            ghostContent = "dragger";   // dragging a clone
        }
        
        
        const ghostStyles = {
            position: 'fixed',
            // cursor: 'move',
            left: left,
            top: top,
            zIndex: zIndex,
            opacity: dragElemOpacity,
            display: draggingRef.current ? 'block' : 'none',
            // display: 'block',
            
            '--left-offset': `${ (leftOffset * -1) || 0}px`,
            '--top-offset': `${ (topOffset * -1) || 0}px`,
        };
        
        
        setGhost(
                <div className="dragger-ghost" style={ghostStyles}
                //  ref={(c) => { setDragElem(c) }}
                 ref={(c) => { dragElemRef.current = c }}
                //  ref={(c) => { dragElem = c; }}
                >
                    {ghostContent}
                </div>
            )
            
    }, [
        left,
        top,
        zIndex,
        dragElemOpacity,
        draggingRef,
        dragging,
        clickedRef,
        clicked,
        leftOffset,
        topOffset,
    ])


    return {
        // displayMode,
        // ghostContent,
        // ghostStyles,
        ghost,
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
  