import config from '../../../../../config'


/**
 * External dependencies
 */
 import classnames from 'classnames';

/**
 * WordPress dependencies
 */

    const { Component, Fragment } = wp.element;
    const { 
        compose,
    } = wp.compose;

    const {
        InnerBlocks,
        BlockControls,
        BlockVerticalAlignmentToolbar,
        InspectorControls,
        useBlockProps,
        // useEditorFeature : useSetting,
        // useSetting,
        __experimentalUseInnerBlocksProps: useInnerBlocksProps,
        store: blockEditorStore,
    } = wp.blockEditor;


    const {
        useSelect,
        useDispatch,
        withSelect,
    } = wp.data;

    const { __, sprintf } = wp.i18n;


/*

    const Edit = ( {
        attributes: { verticalAlignment, width, templateLock = false },
        setAttributes,
        clientId,
    } ) => {

        const { columnsIds, hasChildBlocks, rootClientId } = useSelect(
            ( select ) => {
                const { getBlockOrder, getBlockRootClientId } = select(
                    blockEditorStore
                );
    
                const rootId = getBlockRootClientId( clientId );
    
                return {
                    hasChildBlocks: getBlockOrder( clientId ).length > 0,
                    rootClientId: rootId,
                    columnsIds: getBlockOrder( rootId ),
                };
            },
            [ clientId ]
        );

        return  <Fragment>
                <h4>Repeater</h4>
                <InnerBlocks
                templateLock={ false }
                renderAppender={ (

                    // hasChildBlocks
                    //     ? undefined
                    //     : () => <InnerBlocks.ButtonBlockAppender />

                    // isSelected ? 
                    () => <InnerBlocks.ButtonBlockAppender /> 
                    // : undefined

                    // hasChildBlocks && !isSelected ?
                    //     undefined :
                    //     () => <InnerBlocks.ButtonBlockAppender />
                ) }
            />
        </Fragment>


        



        // const blockProps = useBlockProps( {
        //     // className: classes,
        //     // style: widthWithUnit ? { flexBasis: widthWithUnit } : undefined,
        // } );

        // const innerBlocksProps = useInnerBlocksProps(
        //     { ...blockProps, 'aria-label': "label" },
        //     {
        //         templateLock,
        //         renderAppender: hasChildBlocks
        //             ? undefined
        //             : () => InnerBlocks.ButtonBlockAppender,
        //     }
        // );
    


        // return <div {...blockProps}>
        //     <h2>Repeater</h2>
        //     <div { ...innerBlocksProps } />
        // </div>

        // return <div { ...innerBlocksProps } />

        // return <h2>hallo</h2>
    
        // const blockProps = useBlockProps( {
        //     // className: classes,
    
        // } )
    
        // const innerBlocksProps = useInnerBlocksProps( blockProps, {
    
        //     // allowedBlocks: ALLOWED_BLOCKS,
        //     // orientation: 'horizontal',
        //     // renderAppender: false,
    
        //     templateLock: false,
    
        //     renderAppender:(
        //         props.hasChildBlocks
        //             ? undefined
        //             : () => <InnerBlocks.ButtonBlockAppender />
        //     ) 
        // } )
        


       


        // return (
        //     <vc-col {...innerBlocksProps}>
        //         <h4>Repeater</h4>
        //     </vc-col>
        // )


        // return (
        //     <vc-col {...blockProps}>
        //         <h4>Repeater</h4>
        //         <div {...innerBlocksProps}>

        //         </div>
        //     </vc-col>
        // )




        // return  <Fragment>
        //             <h4>Repeater</h4>
        //             <InnerBlocks
        //             templateLock={ false }
        //             renderAppender={ (

        //                 hasChildBlocks
        //                     ? undefined
        //                     : () => <InnerBlocks.ButtonBlockAppender />

        //                 // isSelected ? () => <InnerBlocks.ButtonBlockAppender /> : undefined

        //                 // hasChildBlocks && !isSelected ?
        //                 //     undefined :
        //                 //     () => <InnerBlocks.ButtonBlockAppender />
        //             ) }
        //         />
        // </Fragment>
    
    
        // return (
        //     <div { ...blockProps }>
        //         <vc-row
        //             grid="18" { ...innerBlocksProps } >
        //         </vc-row>
        //     </div>
        // )
    
    
    
    }
    
    
    // export default compose()( Edit );
    export default Edit

    */


/**
 * Block edit function
 */

 class Edit extends Component {

	constructor( props ) {
		super( ...arguments );

		// this.state = {
		// }
	}

    render() {

		const {
            attributes,
            setAttributes,
            isSelected,
            hasChildBlocks,
        } = this.props;

        const templateLock = false

        // const innerBlocksProps = useInnerBlocksProps(
        //     { 
        //         // ...blockProps, 'aria-label': label
        //     },
        //     {
        //         templateLock,
        //         renderAppender: hasChildBlocks
        //             ? undefined
        //             : InnerBlocks.ButtonBlockAppender,
        //     }
        // );

        // return  <vc-col size="6">
        //             <h4>Repeater</h4>
        //             <InnerBlocks
        //             templateLock={ false }
        //             renderAppender={ (

        //                 hasChildBlocks
        //                     ? undefined
        //                     : () => <InnerBlocks.ButtonBlockAppender />

        //                 // isSelected ? () => <InnerBlocks.ButtonBlockAppender /> : undefined

        //                 // hasChildBlocks && !isSelected ?
        //                 //     undefined :
        //                 //     () => <InnerBlocks.ButtonBlockAppender />
        //             ) }
        //         />
        // </vc-col>
        return  <Fragment>
                    <h4>Repeater</h4>
                    <InnerBlocks
                    templateLock={ false }
                    renderAppender={ (

                        hasChildBlocks
                            ? undefined
                            : () => <InnerBlocks.ButtonBlockAppender />

                        // isSelected ? () => <InnerBlocks.ButtonBlockAppender /> : undefined

                        // hasChildBlocks && !isSelected ?
                        //     undefined :
                        //     () => <InnerBlocks.ButtonBlockAppender />
                    ) }
                />
        </Fragment>
       
    }
}


// export default compose()( Edit );


export default withSelect( ( select, ownProps ) => {
    const { clientId } = ownProps;
    const blockEditor = select( 'core/block-editor' );

    return {
        hasChildBlocks: blockEditor ? blockEditor.getBlockOrder( clientId ).length > 0 : false,
    };
} )( Edit );