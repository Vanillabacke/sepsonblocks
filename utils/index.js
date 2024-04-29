
import parseBool 	from './parseBool';
import parseRatio 	from './parseRatio';
// import parseBreakpoints 	from './parseBreakpoints';
// import parseResponsiveAttr 	from './parseResponsiveAttr';

import roundTo 		from './roundTo';
import isNumber 	from './isNumber';
import getHours 	from './getHours';
import getMinutes 	from './getMinutes';
import getSeconds 	from './getSeconds';
import formatTime 	from './formatTime';

import parseMediaQuery 		from './parseMediaQuery';
import css2obj 		from './css2obj';
import JSONStyle 		from './JSONStyle';


import wrapChars 		from './wrapChars';
import wrapWords 		from './wrapWords';
import wrapLines 		from './wrapLines';

import wrapWordsHTML from './wrapWordsHTML';
import rangeMap from './rangeMap';


export {
	parseBool,
	parseRatio,
	// parseBreakpoints,
	// parseResponsiveAttr,

	roundTo,
	isNumber,
	getHours,
	getMinutes,
	getSeconds,
	formatTime,
	
	parseMediaQuery,
	css2obj,
	JSONStyle,

	wrapChars,
	wrapWords,
	wrapLines,

	wrapWordsHTML,
    rangeMap,
}



// // https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript

// /*
//  * Converts a string to a bool.
//  *
//  * This conversion will:
//  *
//  *  - match 'true', 'on', or '1' as true.
//  *  - ignore all white-space padding
//  *  - ignore capitalization (case).
//  *
//  * '  tRue  ','ON', and '1   ' will all evaluate as true.
//  *
//  */
// export default function ParseBool(val)
// {
//     // will match one and only one of the string 'true','1', or 'on' rerardless
//     // of capitalization and regardless off surrounding white-space.
//     //
//     // var regex = /^\s*(true|1|on)\s*$/i
//     // return regex.test(s);

//     // var regex = /^(?:f(?:alse)?|no?|0+)$/i;
//     // return !regex.test(s) && !!s;
//     return !/^(?:f(?:alse)?|no?|0+)$/i.test(val) && !!val;
// }






// //round float to n.xxx
// export default function roundTo(n, digits) {
// 	if (digits === undefined) {
// 		digits = 0;
// 	}

// 	var multiplicator = Math.pow(10, digits);
// 	n = parseFloat((n * multiplicator).toFixed(11));
// 	var test =(Math.round(n) / multiplicator);
// 	return +(test.toFixed(digits));
// }



// export default function isNumber(value) {
//     if ((undefined === value) || (null === value)) {
//         return false;
//     }
//     if (typeof value == 'number') {
//         return true;
//     }
//     return !isNaN(value - 0);
// }
    
// // Time helpers
// export default function getHours 	(value) { Math.trunc((value / 60 / 60) % 60, 10); } 
// export default function getMinutes 	(value) { Math.trunc((value / 60) % 60, 10); } 
// export default function getSeconds 	(value) { Math.trunc(value % 60, 10); } 

// // Format time to UI friendly string
// export default function formatTime(time = 0, displayHours = false, inverted = false) {
//     // Bail if the value isn't a number
//     if (!isNumber(time)) {
//         return formatTime(undefined, displayHours, inverted);
//     }

//     // Format time component to add leading zero
//     const format = value => `0${value}`.slice(-2);
//     // Breakdown to hours, mins, secs
//     let hours = getHours(time);
//     const mins = getMinutes(time);
//     const secs = getSeconds(time);

//     // Do we need to display hours?
//     if (displayHours || hours > 0) {
//         hours = `${hours}:`;
//     } else {
//         hours = '';
//     }

//     // Render
//     return `${inverted && time > 0 ? '-' : ''}${hours}${format(mins)}:${format(secs)}`;
// }