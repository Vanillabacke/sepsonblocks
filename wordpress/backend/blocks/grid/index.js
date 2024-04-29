/**
 * Styles
 */

 import "./editor/style.scss";

 /**
 * External dependencies
 */
import classnames from 'classnames';


/**
 * Internal dependencies
 */
//  import config from '../../config';
import Config from '../../../../config'
import Edit from './editor/edit';
import Save from './editor/save';

import { getIcon } from '../../utils';
// import icon from './icon';
import MetaData from './meta';


import { GlobalAttributes } from '../../global';
// import getColClass from './get-col-class';


/**
 * WordPress dependencies
 */
 const { __ } = wp.i18n;
 const { createHigherOrderComponent } = wp.compose;
 const { addFilter } = wp.hooks;
 

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
		// src: getIcon('section'),
		src: getIcon('row'),
		// src: "admin-comments",
		// src: "format-image",
		// foreground: config.iconColor,
		// background: config.iconBackgroundColor,
	},
	attributes: {
		... attributes,
		... GlobalAttributes
	},
	// vanilla: {
	// 	customSelector( selector ) {
    //         // extend selector to add possibility to override default column spacings without !important
    //         selector = `.${config.namespace}-row-column ${ selector }`;

    //         return selector;
    //     },
    //    	// customStylesCallback( attributes ) {},
	// 	supports: {
	// 		// scrollReveal: true,
	// 	}
	// },
	supports: {
		align: ["wide","full"],
	},

	edit: Edit,
	save: Save,


};
export { name, title, settings };



/**
 * Override the default block element to add column classes on wrapper.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */

/*
 export const withClasses = createHigherOrderComponent( ( BlockListBlock ) => (
    ( props ) => {
        const { name: blockName } = props;
        let className = props.className;
        // console.log("createHigherOrderComponent",blockName)

        if ( `${ config.namespace }/row-column` === blockName ) {
            className = classnames( className, getColClass( props.attributes ) );
            // className = classnames( className, getColClass( props ) );
	

            // console.log("createHigherOrderComponent: attributes",props.attributes)
            // console.log(" - - - - createHigherOrderComponent: className",className)
            // console.log(" - - - - - - createHigherOrderComponent: props.attributes",props.attributes)

            // className = classnames('col-2')
        }

        return <BlockListBlock { ...props } className={ className } />;
    }
) );

addFilter( 'editor.BlockListBlock', 'core/editor/row-column/with-classes', withClasses );
*/