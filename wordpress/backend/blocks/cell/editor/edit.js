import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { BaseControl } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';

function Edit(props) {
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        templateLock: false,
        // template: [['core/paragraph'], ['core/paragraph']],
        allowedBlocks: ['core/paragraph'],
        renderAppender: InnerBlocks.ButtonBlockAppender,
    });

    return (
        <BaseControl label={__("Cell")}>
            {/* <div {...innerBlocksProps}>
                <InnerBlocks />
            </div> */}

            <InnerBlocks
                templateLock={ false }
                templateInsertUpdatesSelection={ false }
                renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
            />
        </BaseControl>
    );
}

const applyWithDispatch = withDispatch((dispatch) => {
    const { updateBlockAttributes } = dispatch('core/block-editor');

    return {
        updateBlockAttributes,
    };
});

export default compose([
    applyWithDispatch,
])(Edit);




// import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
// import { BaseControl } from '@wordpress/components';

// const { __ } = wp.i18n;

// export default function Edit({
//     props,
//     attributes,
// }) {
// 	const blockProps = useBlockProps();
// 	const innerBlocksProps = useInnerBlocksProps(blockProps,{
//         // Optionally specify allowed blocks
//         allowedBlocks: ['core/paragraph', 'core/image'], // Example: Allow only paragraphs and images
//         // Ensure the default appender is used, this can be omitted to use default behavior
//         renderAppender: InnerBlocks.DefaultBlockAppender
//     },);
// 	return (
// 		<BaseControl label={__("Cell")}>
// 			<div {...innerBlocksProps} />
// 		</BaseControl>
// 	);
// }

// templateLock={ false }
// renderAppender={ (

//     props.hasChildBlocks
//         ? undefined
//         : () => <InnerBlocks.ButtonBlockAppender />

//     // isSelected ? 
//     // () => <InnerBlocks.ButtonBlockAppender /> 
//     // : undefined

//     // hasChildBlocks && !isSelected ?
//     //     undefined :
//     //     () => <InnerBlocks.ButtonBlockAppender />
// ) }



// /**
//  * WordPress dependencies
//  */
//  const { __ } = wp.i18n;
//  const { Component, Fragment } = wp.element;
//  const { 
//      compose,
//     //  withState
//  } = wp.compose;



//  const {
// 	InspectorControls,
// 	ResponsiveBlockControl,
//  } = wp.editor

//  const {
// 	DimensionControl,
//  } = wp.components


// //  import {
// // 	InspectorControls,
// // 	ResponsiveBlockControl,
// // } from '@wordpress/block-editor';

// // import {
// // 	DimensionControl,
// // } from '@wordpress/components';


// // import VanillaGrid from '../../../../../web-components/backend' 

// /**
//  * Block edit function
//  */
//  class Edit extends Component {

// 	constructor( props ) {
// 		super( ...arguments );

// 		this.state = {
// 			isResponsive: false,
// 			paddingSize: 10,
// 		}
// 	}



// 	render() {

// 		// const {
// 		// 	// clientId,
// 		// 	// attributes,
// 		// 	// className,
// 		// 	// setAttributes,

// 		// } = this.props

// 		// const {
			

// 		// } = attributes;

// 		const {
// 			isResponsive,
// 			paddingSize,
// 		} = this.state

// 		// const { paddingSize } = this.props.attributes;


// 		const sizeOptions = [
// 			{
// 				label: 'Small',
// 				value: 'small',
// 			},
// 			{
// 				label: 'Medium',
// 				value: 'medium',
// 			},
// 			{
// 				label: 'Large',
// 				value: 'large',
// 			},
// 		];

// 		// Your custom control can be anything you'd like to use.
// 		// You are not restricted to `DimensionControl`s, but this
// 		// makes life easier if dealing with standard CSS values.
// 		// see `packages/components/src/dimension-control/README.md`
// 		// const paddingControl = ( labelComponent, viewport ) => {
// 		// 	// return (
// 		// 	// 	<DimensionControl label="DimensionControl"></DimensionControl>
// 		// 	// )
// 		// 		<DimensionControl
// 		// 			label={ "viewport.label" }
// 		// 			// onChange={
// 		// 			// 	// handle update to padding value here
// 		// 			// }
// 		// 			value={ this.state.paddingSize }
// 		// 		/>

// 		// }

	



// 		return (
// 			<Fragment>

// 				<InspectorControls>
// 					{/* <ResponsiveBlockControl
// 						title='Block Padding'
// 						property='padding'
// 						// renderDefaultControl={paddingControl}
// 						// isResponsive={ isResponsive }
// 						// onIsResponsiveChange={ () => {
// 						// 	setIsResponsive( ! isResponsive );
// 						// } }
// 					/> */}
// 					<h2>Inspector</h2>
// 				</InspectorControls>


// 				 {/* <InspectorControls>
// 					<ResponsiveBlockControl
// 						title='Block Padding'
// 						property='padding'
// 						renderDefaultControl={paddingControl}
// 						isResponsive={ isResponsive }
// 						// onIsResponsiveChange={ () => {
// 						// 	setIsResponsive( ! isResponsive );
// 						// } }
// 					/>
// 				</InspectorControls> */}

// {/* <ResponsiveBlockControl
// 						title='Block Padding'
// 						property='padding'
// 						renderDefaultControl={paddingControl}
// 						isResponsive={ isResponsive }
// 						// onIsResponsiveChange={ () => {
// 						// 	setIsResponsive( ! isResponsive );
// 						// } }
// 					/>  */}



// 	       		<h1>Test Block</h1>
// 				   <vc-col size="12" order="3" order-m="3">Column 1</vc-col>
// 				   <vc-row>
// 			<vc-col
// 				size="12"
// 				xxl="10"
// 				xl="8"
// 				l="7"
// 				m="6"
// 				s="4"
// 				xs="2"
// 			>
// 				Column 1</vc-col>
// 		</vc-row>
// 				   <vc-row grid="10">
// 						<vc-col size="2" m="12" order="3" order-m="3">Column 1</vc-col>
// 						<vc-col size="4" m="12" order="2" order-m="1">Column 2</vc-col>
// 						<vc-col size="12" m="12" order="1" order-m="2">Column 3</vc-col>
// 					</vc-row>
// 	       	</Fragment>
// 		)

// 	}
// };


// export default compose()( Edit );
