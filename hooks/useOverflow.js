import {
    useState,
    useEffect,
} from 'react';


import useResizeObserver from 'Hooks/useResizeObserver'

function useOverflow(outerRef = false, innerRef = false, options = {}) {

    options = {
        overflowX: true,
        overflowY: false,
        ... options
    }

    const [overflow, setOverflow] = useState(undefined)
    const [overflowX, setOverflowX] = useState(undefined)
    const [overflowY, setOverflowY] = useState(undefined)

    
    if( !outerRef || !innerRef ) return {overflow, overflowX, overflowY}
    if( !outerRef.current ) return {overflow, overflowX, overflowY}
    if( !innerRef.current ) {
        // console.log( 'innerRef', innerRef )
        // return {overflow, overflowX, overflowY}
    }
    // if( !innerRef.current ) return {overflow, overflowX, overflowY}
    // console.log( 'options', options )
    // console.log( 'innerRef', innerRef.current)
    

    
   

    const {
        width: componentWidth,
        height: componentHeight,
        resizeContainer: componentResizeContainer
    } = useResizeObserver(outerRef);
    
    const {
        width: wrapperWidth,
        height: wrapperHeight,
        resizeContainer: wrapperResizeContainer
    } = useResizeObserver(innerRef);


    useEffect(() => {
        if(
            !componentWidth
            ||  !componentHeight
            ||  !wrapperWidth
            ||  !wrapperHeight
            ||  !componentResizeContainer
            ||  !wrapperResizeContainer
            ) return
            
            
            let isOverflowing = false
            let isOverflowingX = false
            let isOverflowingY = false
                        
            wrapperResizeContainer.style.position = `absolute`
            
            if( wrapperWidth > componentWidth) isOverflowingX = true
            else isOverflowingX = false
            
            if( wrapperHeight > componentHeight) isOverflowingY = true
            else isOverflowingY = false


            // console.log( " ")
            // console.log( 'options', options)
            // console.log( "before", {
            //     isOverflowing,
            //     isOverflowingX,
            //     isOverflowingY,
            // })



            if( options.overflowX && options.overflowY ) {
                if( isOverflowingX || isOverflowingY ) isOverflowing = true
            }

            if( options.overflowX && !options.overflowY ) {
                componentResizeContainer.style.height = `${wrapperHeight}px`
                // componentResizeContainer.style.width = `${wrapperWidth}px`
                if( isOverflowingX ) {
                    isOverflowing = true
                }
            }
            
            if( !options.overflowX && options.overflowY ) {
                // componentResizeContainer.style.width = `${wrapperWidth}px`
                componentResizeContainer.style.height = `${wrapperHeight}px`
                if( isOverflowingY ) {
                    isOverflowing = true
                }
            }

            // console.log( "after", {
            //     isOverflowing,
            //     isOverflowingX,
            //     isOverflowingY,
            // })

            // console.log( " ")

        
            setOverflow(isOverflowing)
            setOverflowX(isOverflowingX)
            setOverflowY(isOverflowingY)
    }, [
        componentWidth,
        componentHeight,
        componentResizeContainer,
        
        wrapperWidth,
        wrapperHeight,
        wrapperResizeContainer
    ])


    // useEffect(() => {

    // },[overflow, overflowX, overflowY])

    return {overflow, overflowX, overflowY};
}

export default useOverflow



// import Preact, {
    // h,
//     Component,
//     // createRef,
//     // useRef,
//     useRef,
// } from 'preact';

// import useWindowSize from 'Hooks/use-window-size';
// import useResizeObserver from 'Hooks/use-resize-observer';

// function useOverflow(ref) {
//     const [refXOverflowing, setRefXOverflowing] =   useState(false);
//     const [refYOverflowing, setRefYOverflowing] =   useState(false);

//     const [refXScrollBegin, setRefXScrollBegin] =   useState(true);
//     const [refXScrollEnd,   setRefXScrollEnd]   =   useState(false);

//     const [refYScrollBegin, setRefYScrollBegin] =   useState(true);
//     const [refYScrollEnd,   setRefYScrollEnd]   =   useState(false);


//     const {width, height} = useResizeObserver(ref);

//     useEffect(() => {

//         // console.log( ref )
        
//         if (!ref.current) {
//             return;
//         }
//         const isXOverflowing = ref.current.scrollWidth > ref.current.clientWidth;
//         const isYOverflowing = ref.current.scrollHeight > ref.current.clientHeight;

//         if (refXOverflowing!== isXOverflowing) {
//             setRefXOverflowing(isXOverflowing);
//         }

//         if (refYOverflowing!== isYOverflowing) {
//             setRefYOverflowing(isYOverflowing);
//         }

//         const handleScroll = () => {

//             // Handle X Overflow
//             const offsetRight = ref?.current?.scrollWidth - ref?.current?.clientWidth;
//             if (ref?.current?.scrollLeft >= offsetRight && refXScrollEnd === false) {
//                 setRefXScrollEnd(true);
//             } else {
//                 setRefXScrollEnd(false);
//             }

//             if (ref?.current?.scrollLeft === 0) {
//                 setRefXScrollBegin(true);
//             } else {
//                 setRefXScrollBegin(false);
//             }

//             // Handle Y Overflow
//             const offsetBottom = ref?.current?.scrollHeight - ref?.current?.clientHeight;
//             if (ref?.current?.scrollTop >= offsetBottom && refYScrollEnd === false) {
//                 setRefYScrollEnd(true);
//             } else {
//                 setRefYScrollEnd(false);
//             }

//             if (ref?.current?.scrollTop === 0) {
//                 setRefYScrollBegin(true);
//             } else {
//                 setRefYScrollBegin(false);
//             }

//         }

//         ref.current.addEventListener('scroll', handleScroll);

//         return () => ref.current?.removeEventListener('scroll', handleScroll);
//     }, [
//         ref,
//         // size,
//         width,
//     ]); // Empty array ensures that effect is only run on mount and unmount

//     return {
//         refXOverflowing,
//         refXScrollBegin,
//         refXScrollEnd,
//         refYOverflowing,
//         refYScrollBegin,
//         refYScrollEnd
//     }
// }


// export default useOverflow




// import 
// {
//     useState,
//     useEffect,
// } from 'preact/hooks'


// export default ( outerContainer, innerContainer ) => {
//     const [refOuter, setOuterContainer] = useState()
//     const [refInner, setInnerContainer] = useState()

//     const [data, setData ] = useState(false)

//     useEffect( () => { setOuterContainer(outerContainer) }, [ outerContainer ] )
//     useEffect( () => { setInnerContainer(innerContainer) }, [ innerContainer ] )
//     useEffect( () => { setInnerContainer(innerContainer) }, [ innerContainer ] )

//     return [
//         refOuter,
//         refInner,
//     ]
    
//     // return {ref, data, setData}
//     // return [ref, data, setData]
// }