
// https://github.com/akiran/json2mq

/*
 * Converts JSON to Media Query String.
 * 
 *      // Media type
 *          ({screen: true}) 
 *          --> 'screen'
 *      
 *      // Media type with negation
 *          ({handheld: false})
 *          --> 'not handheld'
 * 
 *      // Media features can be specified in camel case
 *          ({minWidth: 100, maxWidth: 200})
 *          --> '(min-width: 100px) and (max-width: 200px)'
 * 
 * 
 *      // px is added to numeric dimension values
 *          ({minWidth: 100, maxWidth: '20em'})
 *          --> '(min-width: 100px) and (max-width: 20em)'
 * 
 *      // Multiple media queries can be passed as an array
 *          ([{screen: true, minWidth: 100}, {handheld: true, orientation: 'landscape'}])
 *          --> 'screen and (min-width: 100px), handheld and (orientation: landscape)'
 */


function isDimension (feature) {
    const re = /[height|width]$/
    return re.test(feature)
}


function objToMediaQuery(obj) {
    let mq = ''
    let features = Object.keys(obj)
    features.forEach( (feature, index) => {
        let value = obj[feature]
        // feature = camel2hyphen(feature)
        feature = feature.replace(/[A-Z]/g, (match) => { return '-' + match.toLowerCase()}).toLowerCase()
        // Add px to dimension features
        if (isDimension(feature) && typeof value === 'number') {
            value = value + 'px'
        }
        if (value === true) {
            mq += feature
        } else if (value === false) {
            mq += 'not ' + feature
        } else {
            mq += '(' + feature + ': ' + value + ')'
        }
        if (index < features.length-1) {
            mq += ' and '
        }
    })
    return mq
}


export default function parseMediaQuery(query) {
    var mq = ''
    if (typeof query === 'string') {
        return query
    }
    // Handling array of media queries
    if (query instanceof Array) {
        query.forEach( (q, index) => {
            mq += objToMediaQuery(q)
            if (index < query.length-1) {
                mq += ', '
            }
        })
        return mq
    }
    // Handling single media query
    return objToMediaQuery(query)
}
