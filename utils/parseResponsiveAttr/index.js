import {
	breakpoints,
} from "../../common"

import {
	css2obj,
} from "../"

export default function parseResponsiveAttr (dom, container = 'container') {

	let attributes = []
	let sizes = {}
	let style = {}
	let csx = {}
	
	const inlineStyle = css2obj(dom.getAttribute('style') || '') 
	style[container] =  inlineStyle
	csx = inlineStyle

	const attr = Array.from(dom.attributes) || []

	
	attr.map( (value, index) =>{
		const regexp = /[w]-(?<mediaSize>\d+(\.)\d+|\d+|\.\d+|.+)/g
		const matches  = [...value.name.matchAll(regexp)]
	
		if( matches.length ) {
			const mediaSize = matches[0].groups.mediaSize
			let screenSize = parseInt(mediaSize) || breakpoints[mediaSize] || false
			// console.log(value.name, typeof screenSize)
			attributes.push(value.name)

			// let attributes = []

			if( typeof screenSize == 'number') {
				const cssObj = css2obj(value.value)
				sizes[screenSize] = cssObj
				style[`@media (min-width: ${screenSize}px)`] = {
					[container]: css2obj(value.value)
				}

				csx[`@media (min-width: ${screenSize}px)`] = {
					... css2obj(value.value)
				}

				
			}
		}
	})

	
	return {
		attributes: attributes,
		sizes: sizes,
		style: style,
		// sizes: Object.entries(sizes)
		// 		.sort((a, b) => a[1] - b[1])
		// 		.reverse()
		// 		.reduce((a, [key, val]) => {
		// 		a[key] = val;
		// 		return a;
		// 		}, {}),
		// style: Object.entries(style)
		// 		.sort((a, b) => a[1] - b[1])
		// 		.reverse()
		// 		.reduce((a, [key, val]) => {
		// 		a[key] = val;
		// 		return a;
		// 		}, {}),
		csx: csx,
	}

}