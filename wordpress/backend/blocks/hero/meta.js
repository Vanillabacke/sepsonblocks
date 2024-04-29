const MetaData = {
	"name": "hero",
	"title": "Hero",
	"description": "Hero Block.",

	"attributes": {
        content: {
            type: 'string',
            // default: "default text goes here",
        },


        headlineContent: {
            type: 'string',
            // default: "default text goes here",
        },



        headline: {
            type: 'string',
            default: "Default Headline",
        },
        subline: {
            type: 'string',
            default: "Default Subline",
        }, 

        ctaLabel: {
            type: 'string',
            default: "Default Label",
        }, 




        heroImageId: {
            type: 'number',
            default: 0
        },
        heroImageUrl: {
            type: 'string',
            default: ''
        },


        // mediaId: {
        //     type: 'number',
        //     default: 0
        // },
        // mediaUrl: {
        //     type: 'string',
        //     default: ''
        // },



        url: {
			type: 'string',
		},
		text: {
			type: 'string',
		},
	}
}

export default MetaData;