
// https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript

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
export default function parseRatio(val)
{
    if( !val ) return false
    
    let result = false
    const regexp = /(\d+(\.\d+)?)/g
    const matches  = [...val.matchAll(regexp)]

    if( matches.length == 1) {
        return parseFloat(matches[0][0])
    }

    if( matches.length == 2) {
        return parseFloat(matches[1][0])/parseFloat(matches[0][0])
    }

    return result
}