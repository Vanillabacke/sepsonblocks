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
import config from '../../../../config'
import Edit from './editor/edit';
import Save from './editor/save';

import { getIcon } from '../../utils';
// import icon from './icon';
import MetaData from './meta';


import { GlobalAttributes } from '../../global';
// import getColClass from './get-col-class';

import parsePropsToAttributes  from '../../utils/parse-props-to-attributes'


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
		src: getIcon('carousel'),
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
		align: [ 'wide', 'full' ],
		html: false,
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


 export const withClasses = createHigherOrderComponent( ( BlockListBlock ) => (
    ( props ) => {
        const { name: blockName } = props;
        // let className = props.className;
        // // console.log("createHigherOrderComponent",blockName)

        if ( `${ config.namespace }/repeater` === blockName ) {
            // return <vc-col size="6" padding="8px"><BlockListBlock { ...props } /></vc-col>
			// console.log(props)

			

			// if( props.attributes.size > 0) attr.size = props.attributes.size
			// if( props.attributes?.responsive?.size?.sizes?.default > 0) attr.size = props.attributes?.responsive?.size?.sizes?.default

			// const parsePropsToAttr = (attrMap = {}, defaults = {}) => {
			// const parsePropsToAttr = (responsiveProps) => {
			// 	const map = {
			// 		padding: 'padding',
			// 		margin: 'margin',
			// 		size: 'size',
			// 		order: 'order',

			// 		'horizontal-align': 'horizontal',
			// 		'vertical-align': 'vertical',

			// 	}
			// 	const propAttributes = {}

			// 	Object.keys(responsiveProps).map( attr => {
			// 		if( !map.hasOwnProperty(attr) ) return

			// 		// console.log( attr, props.attributes.responsive[attr]?.sizes)
			// 		const values = responsiveProps[attr]?.sizes
			// 		values && Object.keys( values ).map( breakpoint => {
			// 			// console.log(breakpoint)
			// 			if( breakpoint == 'default') propAttributes[attr] = values[breakpoint]
			// 			else {
			// 				propAttributes[`${attr}-${breakpoint}`] = values[breakpoint]
			// 			}
			// 		})
			// 	})

			// 	// console.log('propAttributes', propAttributes)

			// 	return propAttributes
			// }


			const attr = {
				padding: "14px 6px",
				... parsePropsToAttributes(props.attributes.responsive, (props.attributes?.breakpointPreview) ? props.attributes?.selectedBreakpoint : false ),
			}
			
			// parsePropsToAttr()
			// console.log(props.attributes.responsive)
			// console.log(attr)


			/*
			Object.keys( parseInt(props.attributes?.responsive?.size?.sizes) ).map( size => {
				console.log(size)
				if( size == 'default' ) attr.size = parseInt(props.attributes?.responsive?.size?.sizes.default)
				else {
					attr[size] = parseInt(props.attributes?.responsive?.size?.sizes?.[size])
				}
			})
			*/


			// if( props.attributes.size > 0) {
			// 	return <vc-col size={props.attributes.size} padding="14px 6px" ><BlockListBlock { ...props } /></vc-col>
			// }

            return <div { ...attr }><BlockListBlock { ...props } /></div>

            return <vc-col { ...attr }><BlockListBlock { ...props } /></vc-col>
            // return <vc-col padding="14px 6px" ><BlockListBlock { ...props } /></vc-col>
        }
        // if ( `${ config.namespace }/row-column` === blockName ) {
        //     className = classnames( className, getColClass( props.attributes ) );
        //     // className = classnames( className, getColClass( props ) );
	

        //     // console.log("createHigherOrderComponent: attributes",props.attributes)
        //     // console.log(" - - - - createHigherOrderComponent: className",className)
        //     // console.log(" - - - - - - createHigherOrderComponent: props.attributes",props.attributes)

        //     // className = classnames('col-2')
        // }

        // return <BlockListBlock { ...props } className={ className } />;
        // return <vc-col size="6"><BlockListBlock { ...props } /></vc-col>
        return <BlockListBlock { ...props } />
    }
) );

addFilter( 'editor.BlockListBlock', 'core/editor/row-column/with-classes', withClasses );

