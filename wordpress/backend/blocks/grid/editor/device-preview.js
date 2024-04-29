/**
 * External dependencies
 */
 import classnames from 'classnames';

 /**
  * WordPress dependencies
  */
 const { __ } = wp.i18n;
 
 const {
     Button,
     Path,
     Rect,
     SVG,
     Tooltip
 } = wp.components;
 
 const {
    useSelect,
    useDispatch
} = wp.data;
 
 const { Fragment } = wp.element;

 const DevicePreview = ({
	label,
	onClick,
	layout,
	layoutTablet,
	layoutMobile,
    updateColumnsWidth,
	columns
}) => {
    const {
		__experimentalSetPreviewDeviceType: setPreviewDevice,
	} = useDispatch( 'core/edit-post' );


	const getView = useSelect( ( select ) => {
		const { getView } = select( 'themeisle-gutenberg/data' );
		const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

		return __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : getView();
	}, []);

    // console.log( 'getView', getView )
    let value;

	if ( 'Desktop' === getView ) {
		value = layout;
	} else if ( 'Tablet' === getView ) {
		value = layoutTablet;
	} else if ( 'Mobile' === getView ) {
		value = layoutMobile;
	}

    return(
        <div>
            <h1>Value: {value}</h1>
            <Button onClick={ () => setPreviewDevice('Mobile')}>Mobile</Button>
            <Button onClick={ () => setPreviewDevice('Tablet')}>Tablet</Button>
            <Button onClick={ () => setPreviewDevice('Desktop')}>Desktop</Button>
        </div>
    )
};

export default DevicePreview;