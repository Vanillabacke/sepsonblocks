import config from '../../../../config'

export default function parsePropsToAttributes (responsiveProps, selectedBreakpoint = false) {
    const map = {
        padding: 'padding',
        margin: 'margin',
        size: 'size',
        order: 'order',

        'horizontal-align': 'horizontal',
        'vertical-align': 'vertical',
        'text-align': 'text',

    }

    const attrList = [
        'horizontal',
        'vertical',
        'text',
    ]

    const propAttributes = {}


    if( typeof selectedBreakpoint == 'string' ) {
        Object.keys(responsiveProps).map( attr  => {
            // console.log('attr', attr)
            const values = responsiveProps[attr]?.sizes
            
            let value = undefined
            
            values && Object.keys( values ).map( (breakpoint, index) => {
                if( index <= config.breakpointIndex[selectedBreakpoint] ) {
                    value = values[breakpoint]
                }
                // console.log('breakpoint', [breakpoint, index])
            })
            // console.log('---value', value)
            
            if( attrList.includes(map[attr]) ) {
                propAttributes[`${map[attr]}-${value}`] = true
            } else {
                propAttributes[map[attr]] = value
            }
        })
        // console.log(selectedBreakpoint, propAttributes)
        return propAttributes

    } else {

    



        Object.keys(responsiveProps).map( attr => {
            if( !map.hasOwnProperty(attr) ) return

            // console.log( attr, props.attributes.responsive[attr]?.sizes)
            const values = responsiveProps[attr]?.sizes
            values && Object.keys( values ).map( breakpoint => {
                // console.log(breakpoint)

                // if( map[attr] == 'horizontal' || map[attr] == 'vertical'  ) {
                if( attrList.includes(map[attr]) ) {
                    if( breakpoint == 'default') propAttributes[`${map[attr]}-${values[breakpoint]}`] = true
                    else {
                        propAttributes[`${map[attr]}-${breakpoint}-${values[breakpoint]}`] = true
                    }

                } else {

                    if( breakpoint == 'default') propAttributes[map[attr]] = values[breakpoint]
                    else {
                        propAttributes[`${map[attr]}-${breakpoint}`] = values[breakpoint]
                    }
                }
            })
        })
        // console.log('propAttributes', propAttributes)
    
        return propAttributes
    }

}