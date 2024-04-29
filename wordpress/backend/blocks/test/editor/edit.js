/**
 * WordPress dependencies
 */
 const { __ } = wp.i18n;
 const { Component, Fragment } = wp.element;
 const { 
     compose,
    //  withState
 } = wp.compose;



 const {
	InspectorControls,
	ResponsiveBlockControl,
 } = wp.editor

 const {
	DimensionControl,
 } = wp.components


//  import {
// 	InspectorControls,
// 	ResponsiveBlockControl,
// } from '@wordpress/block-editor';

// import {
// 	DimensionControl,
// } from '@wordpress/components';


// import VanillaGrid from '../../../../../web-components/backend' 

/**
 * Block edit function
 */
 class Edit extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
			isResponsive: false,
			paddingSize: 10,
		}
	}



	render() {

		// const {
		// 	// clientId,
		// 	// attributes,
		// 	// className,
		// 	// setAttributes,

		// } = this.props

		// const {
			

		// } = attributes;

		const {
			isResponsive,
			paddingSize,
		} = this.state

		// const { paddingSize } = this.props.attributes;


		const sizeOptions = [
			{
				label: 'Small',
				value: 'small',
			},
			{
				label: 'Medium',
				value: 'medium',
			},
			{
				label: 'Large',
				value: 'large',
			},
		];

		// Your custom control can be anything you'd like to use.
		// You are not restricted to `DimensionControl`s, but this
		// makes life easier if dealing with standard CSS values.
		// see `packages/components/src/dimension-control/README.md`
		// const paddingControl = ( labelComponent, viewport ) => {
		// 	// return (
		// 	// 	<DimensionControl label="DimensionControl"></DimensionControl>
		// 	// )
		// 		<DimensionControl
		// 			label={ "viewport.label" }
		// 			// onChange={
		// 			// 	// handle update to padding value here
		// 			// }
		// 			value={ this.state.paddingSize }
		// 		/>

		// }

	



		return (
			<Fragment>

				<InspectorControls>
					{/* <ResponsiveBlockControl
						title='Block Padding'
						property='padding'
						// renderDefaultControl={paddingControl}
						// isResponsive={ isResponsive }
						// onIsResponsiveChange={ () => {
						// 	setIsResponsive( ! isResponsive );
						// } }
					/> */}
					<h2>Inspector</h2>
				</InspectorControls>


				 {/* <InspectorControls>
					<ResponsiveBlockControl
						title='Block Padding'
						property='padding'
						renderDefaultControl={paddingControl}
						isResponsive={ isResponsive }
						// onIsResponsiveChange={ () => {
						// 	setIsResponsive( ! isResponsive );
						// } }
					/>
				</InspectorControls> */}

{/* <ResponsiveBlockControl
						title='Block Padding'
						property='padding'
						renderDefaultControl={paddingControl}
						isResponsive={ isResponsive }
						// onIsResponsiveChange={ () => {
						// 	setIsResponsive( ! isResponsive );
						// } }
					/>  */}



	       		<h1>Test Block</h1>
				   <vc-col size="12" order="3" order-m="3">Column 1</vc-col>
				   <vc-row>
			<vc-col
				size="12"
				xxl="10"
				xl="8"
				l="7"
				m="6"
				s="4"
				xs="2"
			>
				Column 1</vc-col>
		</vc-row>
				   <vc-row grid="10">
						<vc-col size="2" m="12" order="3" order-m="3">Column 1</vc-col>
						<vc-col size="4" m="12" order="2" order-m="1">Column 2</vc-col>
						<vc-col size="12" m="12" order="1" order-m="2">Column 3</vc-col>
					</vc-row>
	       	</Fragment>
		)

	}
};


export default compose()( Edit );
