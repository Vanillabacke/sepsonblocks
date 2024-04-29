import {
	breakpoints,
} from "../../common"


/*
 * Converts a string to a bool.
 *
 * This conversion will:
 *
 *  - match 'true', 'on', or '1' as true.
 *  - ignore all white-space padding
 *  - ignore capitalization (case).
 *
 * '  tRue  ','ON', and '1   ' will all evaluate as true.
 *
 */
export default function parseBreakpoints(container, custom = {} )
{
    let result = {}

    // console.log( Object.keys(breakpoints) )
    Object.keys(breakpoints).map( (key, index) => {
        // console.log(key, index)
        result[`${breakpoints[key]}`] = 'value'
    })

    // result = container
    // console.log("breakpoints--", breakpoints)
    // breakpoints.map( (val, index) => {
    //     console.log(val, index)
    // })

    return result
}