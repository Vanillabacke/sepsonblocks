

console.log("changed")

// import icon from './icon';
import MetaData from './meta';


import Edit from './editor/edit';
import Save from './editor/save';

/**
 * WordPress dependencies
 */
 const { __ } = wp.i18n;
 /**
  * Block constants
  */
 const { name, title, description, attributes } = MetaData;
 const keywords = [
     __( 'animate' ),
 ];
 

 const settings = {

	title: __( title ),
	description: __( description ),
	keywords: keywords,
	icon: {
		// src: icon,
		src: "admin-comments",
		// src: "format-image",
		// foreground: config.iconColor,
		// background: config.iconBackgroundColor,
	},
	attributes: {
		... attributes,
		// ... GlobalAttributes
	},
	supports: {
		align: ["wide","full"]
	},

	edit: Edit,
	save: Save,

    deprecated: [
        {
            save( props ) {
                return false
            },
        },
    ],

};

export { name, title, settings };