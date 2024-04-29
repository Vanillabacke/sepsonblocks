import config from '../../config'

// console.log("config", config.breakpoints)

function getPixelBreakpoint ( selectedBreakpoint = 'default', fallbackValue = -1 ) {
    let pixelBreakpoint = 0

    if( typeof selectedBreakpoint == 'number' )  pixelBreakpoint = selectedBreakpoint
    if( typeof selectedBreakpoint == 'string' )  pixelBreakpoint = config.breakpoints[selectedBreakpoint] || fallbackValue

    return {
        name: selectedBreakpoint,
        value: pixelBreakpoint,
    }
}




export default function getBreakpointValue (responsiveProps, attributeName = false, selectedBreakpoint = false, options = {} ) {

    options = {
        // valuesInChildKey: false,
        key: false,
        sort: 'asc',

        ... options
    }


    let {
        // valuesInChildKey: key,
        key,
        sort,
    } = options

    let breakpointValue = false
    let pixelBreakpoint = getPixelBreakpoint(selectedBreakpoint).value
    
    sort = sort.toLocaleLowerCase()

    let value = undefined
    let breakpointOfValue = undefined


    Object.keys(responsiveProps).map( attr  => {
        if( attr == attributeName ) {
            let values = false

            try {
                // console.log( key, typeof key)
                if( typeof key == 'boolean'   && !key )     values =  responsiveProps[attr]
                if( typeof key == 'boolean'   && !!key )     values =  responsiveProps[attr]?.sizes
                if( typeof key == 'string'    && !!key )    values =  responsiveProps[attr]?.[key]

                
                let valueKeys = Object.keys(values)
                if( sort != 'asc' ) valueKeys = valueKeys.reverse()

                values && valueKeys.map( (breakpoint, index) => {
                    const currentPixelBreakpoint = getPixelBreakpoint(breakpoint )

                    
                    if( currentPixelBreakpoint.value <= pixelBreakpoint && sort == 'asc' 
                    ||  currentPixelBreakpoint.value >= pixelBreakpoint && sort != 'asc' ) {
                        value = values[currentPixelBreakpoint.name]
                        breakpointOfValue = currentPixelBreakpoint.name
                    }

                })
            } catch( err ) {
                console.error(`Key '${key}' not found in Object:`, responsiveProps )
            }
        }
    }) 



    if( value !== undefined ) {
        breakpointValue = {
            value: value,
            breakpoint: breakpointOfValue,
        }
    }

    return breakpointValue

}


// export default function getBreakpointValue (responsiveProps, attributeName = false, selectedBreakpoint = false, valuesInChildKey = false, sort = 'asc') {

//     let breakpointValue = false
//     let pixelBreakpoint = getPixelBreakpoint(selectedBreakpoint).value
    
//     sort = sort.toLocaleLowerCase()

//     let value = undefined
//     let breakpointOfValue = undefined


//     Object.keys(responsiveProps).map( attr  => {
//         if( attr == attributeName ) {
//             let values = false
//             if( typeof valuesInChildKey === 'boolean'   && !valuesInChildKey ) values =  responsiveProps[attr]
//             if( typeof valuesInChildKey === 'boolean'   && !!valuesInChildKey ) values =  responsiveProps[attr]?.sizes
//             if( typeof valuesInChildKey === 'string'    && !!valuesInChildKey ) values =  responsiveProps[attr]?.[valuesInChildKey]


//             let valueKeys = Object.keys(values)
//             if( sort != 'asc' ) valueKeys = valueKeys.reverse()

//             values && valueKeys.map( (breakpoint, index) => {
//                 const currentPixelBreakpoint = getPixelBreakpoint(breakpoint )

                
//                 if( currentPixelBreakpoint.value <= pixelBreakpoint && sort == 'asc' 
//                 ||  currentPixelBreakpoint.value >= pixelBreakpoint && sort != 'asc' ) {
//                     value = values[currentPixelBreakpoint.name]
//                     breakpointOfValue = currentPixelBreakpoint.name
//                 }

//             })
//         }
//     }) 



//     if( value !== undefined ) {
//         breakpointValue = {
//             value: value,
//             breakpoint: breakpointOfValue,
//         }
//     }

//     return breakpointValue

// }