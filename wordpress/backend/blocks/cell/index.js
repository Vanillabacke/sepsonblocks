

console.log("changed")

// import icon from './icon';
import MetaData from './meta';


import Edit from './editor/edit';
import Save from './editor/save';

/**
 * WordPress dependencies
 */
 const { __ } = wp.i18n;


import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { BaseControl } from '@wordpress/components';

import { useSelect } from '@wordpress/data';


import { GlobalAttributes } from '../../global';

 /**
  * Block constants
  */
 const { name, title, description, attributes } = MetaData;
 const keywords = [
     __( 'test' ),
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
		... GlobalAttributes
	},
	supports: {
		align: ["wide","full"]
	},


    edit() {
		const blockProps = useBlockProps();

		return (
            <BaseControl label={__("Cell")}>
                <div { ...blockProps }>
                    <InnerBlocks />
                </div>
            </BaseControl>
		);
	},

    // edit: (props) => {
    //     const { attributes } = useSelect((select) => {
    //       const { getBlockAttributes } = select('core/block-editor');
    //       return {
    //         attributes: getBlockAttributes(props.clientId),
    //       };
    //     }, [props.clientId]);
      
    //     // Use the attributes object here
    //     // console.log(attributes.align);
      
    //     return (
    //       <div>
    //         cell<br />
    //         {/* Your block content */}
    //       </div>
    //     );
    //   },

    // edit: ( { attributes, isSelected } ) => {
    //     const blockProps = useBlockProps();
    
    //     return (
    //         <div { ...blockProps }>
    //             Your block.
    //             { isSelected && (
    //                 <span>Shows only when the block is selected.</span>
    //             ) }
    //         </div>
    //     );
    // },

	save() {

        const { className, ...blockProps } = useBlockProps.save();
        return (
            <div {...blockProps}>
            {/* Block content */}
            </div>
        );
        
		// const blockProps = useBlockProps.save();

		// return (
		// 	<div>
		// 		<InnerBlocks.Content />
		// 	</div>
		// );
		
        // const blockProps = useBlockProps.save();

		// return (
		// 	<div { ...blockProps }>
		// 		<InnerBlocks.Content />
		// 	</div>
		// );
	},

	// edit: Edit,
	// save: Save,

};

export { name, title, settings };