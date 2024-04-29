import config from '../../../../config';


export default function getBreakpointValue(responsiveProps, attributeName = false, selectedBreakpoint = false) {
    let breakpointValue = false;

    if (typeof selectedBreakpoint === 'string') {
        let value = undefined;
        let breakpointOfValue = undefined;

        Object.keys(responsiveProps).forEach(attr => {
            if (attr === attributeName) {
                const values = responsiveProps[attr]?.sizes;

                if (values) {
                    Object.keys(values).forEach(breakpoint => {
                        const breakpointConfig = config.breakpoints.find(bp => bp.key === breakpoint);
                        const selectedIndex = config.breakpoints.findIndex(bp => bp.key === selectedBreakpoint);
                        if (breakpointConfig && breakpointConfig.index <= selectedIndex) {
                            value = values[breakpoint];
                            breakpointOfValue = breakpoint;
                        }
                    });
                }
            }
        });

        if (value !== undefined) {
            breakpointValue = {
                value: value,
                breakpoint: breakpointOfValue,
            };
        }
    }

    return breakpointValue;
}




// import config from '../../../../config'

// export default function getBreakpointValue (responsiveProps, attributeName = false, selectedBreakpoint = false) {

//     // const propAttributes = {}

//     // const breakpointValue = {
//     //     value: undefined
//     // }

//     let breakpointValue = false

//     if( typeof selectedBreakpoint == 'string' ) {
//         let value = undefined
//         let breakpointOfValue = undefined

//         Object.keys(responsiveProps).map( attr  => {
//             // console.log('attr', attr)
//             if( attr == attributeName ) {

//                 const values = responsiveProps[attr]?.sizes
                
//                 values && Object.keys( values ).map( (breakpoint, index) => {
//                     if( index <= config.breakpointIndex[selectedBreakpoint] ) {
//                         value = values[breakpoint]
//                         breakpointOfValue = breakpoint
//                     }
//                     // console.log('breakpoint', [breakpoint, index])
//                 })
//                 // console.log('---value', value)
                
//                 // if( attrList.includes(map[attr]) ) {
//                 //     propAttributes[`${map[attr]}-${value}`] = true
//                 // } else {
//                 //     propAttributes[map[attr]] = value
//                 // }
//             }
//         })
//         // console.log(selectedBreakpoint, propAttributes)
//         //breakpointValue.value = value

//         if( value !== undefined ) {
//             breakpointValue = {
//                 value: value,
//                 breakpoint: breakpointOfValue,
//             }
//         }

//     }

//     return breakpointValue



//     // else {

    



//     //     Object.keys(responsiveProps).map( attr => {
//     //         if( !map.hasOwnProperty(attr) ) return

//     //         // console.log( attr, props.attributes.responsive[attr]?.sizes)
//     //         const values = responsiveProps[attr]?.sizes
//     //         values && Object.keys( values ).map( breakpoint => {
//     //             // console.log(breakpoint)

//     //             // if( map[attr] == 'horizontal' || map[attr] == 'vertical'  ) {
//     //             if( attrList.includes(map[attr]) ) {
//     //                 if( breakpoint == 'default') propAttributes[`${map[attr]}-${values[breakpoint]}`] = true
//     //                 else {
//     //                     propAttributes[`${map[attr]}-${breakpoint}-${values[breakpoint]}`] = true
//     //                 }

//     //             } else {

//     //                 if( breakpoint == 'default') propAttributes[map[attr]] = values[breakpoint]
//     //                 else {
//     //                     propAttributes[`${map[attr]}-${breakpoint}`] = values[breakpoint]
//     //                 }
//     //             }
//     //         })
//     //     })
//     //     // console.log('propAttributes', propAttributes)
    
//     //     return propAttributes
//     // }

// }