import {
    useState,
    useEffect,
} from 'react';


import useResizeObserver from './useResizeObserver'
import useWindowSize from './useWindowSize'


import getBreakpointValue from './utils/getBreakpointValue'


/*
    const { breakpointData, resizeContainer, width, height } = useDimensionBreakpoint(ref, {}, {
        window: true,       // observe window resize
        container: true,    // observe reference 
        parent: true,       // observe parent node of reference
    })
*/







let responsive = {
    // size: {
    //     scurr: {
    //         default: 12,
    //         s: 6,
    //         xl: 9
    //     },
    //     selected: "xl"
    // },

    // order: {
    //     scurr: {
    //         default: 8
    //     },
    //     selected: "default"
    // },

    // "vertical-align": {
    //     scurr: {
    //         default: "bottom",
    //         l: "center",
    //         xxl: "bottom"
    //     },
    //     selected: "xxl"
    // }
}


responsive = {
    size: {
        default: 1,
        s: 3,
        m: 6,
        xl: 9,
        xxl: 12,
    },

    order: {
        default: 8
    },

    "vertical-align": {
        default: "bottom",
        l: "center",
        xxl: "bottom"
    }
}



// console.log( getBreakpointValue(responsive, 'size' ) )
// console.log(" ")
// console.log( getBreakpointValue(responsive, 'size' ,'random_undefined' ) )
// console.log(" ")
// console.log( getBreakpointValue(responsive, 'size' , 1600 ) )
// console.log(" ")
// console.log( 'size: m', getBreakpointValue(responsive, 'size' ,'m' ) )
// console.log( 'size: m desc', getBreakpointValue(responsive, 'size' ,'m', false, 'desc' ) )
// console.log( 'size: m asc', getBreakpointValue(responsive, 'size' ,'m', false, 'asc' ) )


// console.log( 'size: m', getBreakpointValue(responsive, 'size' ,'m' ) )
// console.log( 'size: m desc', getBreakpointValue(responsive, 'size' ,'m', {
//     // key: "scurr",
//     // key: false,
//     sort: 'desc',
// }) )
// console.log( 'size: m asc', getBreakpointValue(responsive, 'size' ,'m', {
//     key: "scurr",
//     // key: false,
//     sort: 'asc',
// }) )
// console.log(" ")
// console.log( getBreakpointValue(responsive, 'size' ,'xl' ) )
// console.log( getBreakpointValue(responsive, 'size' ,'default' ) )



/******
 * 
 * create new useObject() hook for object like useArray() 
 * -> method for getClosestValue
 *
 *  ----> Filter: if ( width > currentWidth && height && currentHeight ) return element
 * array.filter
 * 
 */

function useDimensionBreakpoint( ref, dataSet = {}, options = {} ) {

    options = {
        window: false,
        container: true,
        parent: false,

        ... options
    }

    
    const [breakpointData, setBreakpointData] = useState(false)


    const [dom, setDom] = useState(false)




    const breakpointHook = () => {
        if( options.window ) return {
            ... useWindowSize(),
            resizeContainer: window,
        }

        if( options.container ) {
            return useResizeObserver(ref, { parent: options.parent || false })
        }
    }


    const {width, height, resizeContainer } = breakpointHook()


    useEffect( () => {
        if(typeof width !== 'number' || typeof height !== 'number') return

    //    console.log( resizeContainer, { width, height } )
    }, [ width, height ])

    
    

    return { breakpointData, resizeContainer, width, height }
}

export default useDimensionBreakpoint