import Config from '../../../../config'


const GlobalAttributes = {

	debug: {
	    type: "boolean",
	    default: false
	},
	breakpointPreview: {
	    type: "boolean",
	    default: false
	},
	selectedBreakpoint: {
	    type: "string",
	    default: 'default'
	},
	
	/*
	// Content
		content: {
			type: "html",
			default: ""
		},
	*/

	// Custom Style
		// customStyle: {
		// 	type: "string",
		// 	default: "default"
		// },
		
		// colorClass: {
		// 	type: "string",
		// 	default: "default"
		// },
		
		// classes: {
		// 	type: "array",
		// 	default: [ ]
		// },


    
	// Settings for different sizes of the screen
        responsive: {
            type: "object",
            default: {
				margin: {
					// selected: 'xxl'
					sizes: {
						xl: 20,
					}
				}
			}
        }
		// screen: {
		// 	type: "object",
		// 	default: {
		// 		xs: {
		// 			// padding: false,
		// 			// margin: false,
		// 			// ratio: false,
		// 			// dimension: false,
		// 		},
		// 		sm: {
		// 			// padding: false,
		// 			// margin: false,
		// 			// ratio: false,
		// 			// dimension: false,
		// 		},
		// 		md: {
		// 			// padding: false,
		// 			// margin: false,
		// 			// ratio: false,
		// 			// dimension: false,
		// 		},
		// 		lg: {
		// 			// padding: false,
		// 			// margin: false,
		// 			// ratio: false,
		// 			// dimension: false,
		// 		},
		// 		xl: {
		// 			// padding: false,
		// 			// margin: false,
		// 			// ratio: false,
		// 			// dimension: false,
		// 		},
		// 		all: {
		// 			// padding: false,
		// 			// margin: false,
		// 			// ratio: false,
		// 			// dimension: false,
		// 		},
		// 	}
		// },


    // Gallery
	// - -  - -  - -  - -  - -  - -  - -  - -  not tested yet
		// images: {
		// 	type: "array",
		// 	default: [  ]
		// },
		// imageCollection: {
		// 	type: "array",
		// 	default: [  ]
		// },		
		// linkTo: {
		// 	type: 'string',
		// 	default: 'none',
		// },


    // Background Image
		// mediaId: {
		// 	type: "number"
		// },
		// mediaAlt: {
		// 	attribute: "alt"
		// },
		// mediaUrl: {
		// 	attribute: "src"
		// },		
		// mediaSizes: {
		// 	attribute: "sizes"
		// },



    // Link
		// url: {
		// 	type: "string"
		// },
		// urlText: {
		// 	type: "string"
		// },
		// targetBlank: {
	    //     type: "boolean",
	    //     default: false
	    // },


};


export default GlobalAttributes;