import config from '../../../../../config'
// console.log(config)
const templates = {
	// 'a': {
	// 	responsive: {}, 
	// 	template: [
	// 		[`${ config.namespace }/repeater`],
	// 	],
	// },
	// 'a-a': {
	// 	responsive: {}, 
	// 	template: [
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 	],
	// },
	// 'a-a-a': {
	// 	responsive: {}, 
	// 	template: [
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 	],
	// },
	// 'a-a-a-a': {
	// 	responsive: {}, 
	// 	template: [
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 	],
	// },
	// 'a-a-a-a-a': {
	// 	responsive: {}, 
	// 	template: [
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 	],
	// },
	// 'a-a-a-a-a-a': {
	// 	responsive: {}, 
	// 	template: [
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 		[`${ config.namespace }/repeater`],
	// 	],
	// },
	
	
	
	
	'r': {
		responsive: {
			size: {
				sizes: {
					// default: 	10,
					default: 	2,
					xs: 		4,
					s: 			6,
					m: 			8,
					l: 			10,
					xl: 		11,
					xxl: 		12,
					// xs: 		10,
					// s: 			10,
					// m: 			10,
					// l: 			10,
					// xl: 		10,
					// xxl: 		10,
				}
			}
		},
		template: [
			[`${ config.namespace }/repeater`],
		],
	},
	'r-r': {
		responsive: {
			size: {
				sizes: {
					default: 	12,
					// xs: 		12,
					// s: 			12,
					m: 			6,
					// l: 			6,
					// xl: 		6,
					// xxl: 		6,
				}
			}
		},
		template: [
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
		],
	},
	'r-r-r': {
		responsive: {
			size: {
				sizes: {
					default: 	12,
					// xs: 		12,
					// s: 			12,
					// m: 			12,
					l: 			4,
					// xl: 		4,
					// xxl: 		4,
				}
			}
		}, 
		template: [
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
		],
	},
	'r-r-r-r': {
		responsive: {
			size: {
				sizes: {
					default: 	12,
					// xs: 		12,
					// s: 			12,
					m: 			6,
					// l: 			6,
					xl: 		3,
					// xxl: 		3,
				}
			}
		}, 
		template: [
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
		],
	},
	'r-r-r-r-r-r': {
		responsive: {
			size: {
				sizes: {
					default: 	12,
					// xs: 		12,
					s: 			6,
					// m: 			6,
					l: 			2,
					// xl: 		2,
					// xxl: 		2,
				}
			}
		},
		template: [
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
			[`${ config.namespace }/repeater`],
		],
	},
}

const GridTemplates = {
	// console.log(config)

	create: ( options ) => {
		console.log(options)
	},

	// Load from saved presets
	loadPresets: () => { },

	getTemplates: () => {
		return templates
	},

	get: ( templateName ) => {
		const template = templates?.[templateName]?.template || false
		if( !template ) return false

		const responsivePresets = templates?.[templateName]?.responsive || false


		const templatesWithPreset = []
		// console.log(templates?.[templateName]?.responsive)

		template.map( (part, index) => {
			// console.log(index, part)

			// if( responsivePresets ) part.push( responsivePresets)

			if( responsivePresets ) templatesWithPreset.push( [...part, { responsive: responsivePresets } ])


			// template[index].push( {... { ... templates?.[templateName]?.responsive} } )

			// console.log(templates[part])

			// templatesWithPreset.push(
			// 	[
			// 		(templates[index][0]),
			// 		// (templates[index]),
			// 		{
			// 			... {
			// 				responsive: templates?.[templateName]?.responsive
			// 			}
			// 		}
			// 	]
			// )

		})

		// console.log( templatesWithPreset )
		return templatesWithPreset
		// console.log(template)
	},
};

export default GridTemplates;