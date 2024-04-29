import config from '../../../../config'

const MetaData = {
	name: "grid",
	title: "Grid",
	description: "A Grid.",

	attributes: {
		grid: {
			type: "number",
			default: config.columns,
			// default: 12
		},
		columns: {
			type: "integer",
			// default: 0
			default: 0
		},
		// cols: {
		// 	type: "string",
		// 	// default: 0
		// 	default: "0"
		// },
		// text: {
		// 	type: "string",
		// 	// default: 0
		// 	default: "test"
		// },
	}
}

export default MetaData;