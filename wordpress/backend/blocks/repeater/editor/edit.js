import config from '../../../../../config'


/**
 * External dependencies
 */
 import classnames from 'classnames';

/**
 * WordPress dependencies
 */

    const {
        Component,
        Fragment,
    
        useState,
        useEffect,
        useCallback,
    } = wp.element;
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
        __experimentalUseCustomUnits: useCustomUnits,
        __experimentalUnitControl: UnitControl,

        __experimentalNumberControl: NumberControl,

        BaseControl,
        Button,
        ButtonGroup,
        PanelBody,
        RangeControl,
        Placeholder,
        Toolbar,
        Tooltip,

        ToolbarGroup,
        ToolbarButton,
        
    } = wp.components;


    const {
        useSelect,
        useDispatch,
        withSelect,
    } = wp.data;

    const { __, sprintf } = wp.i18n;


    import { getIcon } from '../../../utils';
    import { alignLeft, alignCenter, alignRight, chevronLeft, chevronRight } from '@wordpress/icons';

    import ResponsiveTextControl from '../../../components/responsive-text-control' 
    import ResponsiveRangeControl from '../../../components/responsive-range-control' 
    import ResponsiveButtonGroup from '../../../components/responsive-button-group' 


    import ResponsiveInspectorControls from '../../../components/responsive-inspector-controls' 
    
    import parsePropsToAttributes  from '../../../utils/parse-props-to-attributes'
    import getBreakpointValue  from '../../../utils/get-breakpoint-value'


    import DebugHelper from '../../../components/debug-helper'



    // function createDataAttributes(responsiveData) {
    //     if (!responsiveData || !responsiveData.order || !responsiveData.order.sizes) {
    //         return '';
    //     }
    
    //     const sizes = responsiveData.order.sizes;
    //     let dataAttributes = `data-order="${sizes.default || ''}" `; // Set the default data-order if available
    
    //     Object.keys(sizes).forEach(key => {
    //         if (key !== 'default') { // Avoid duplicating the default key
    //             dataAttributes += `data-order-${key}="${sizes[key]}" `;
    //         }
    //     });
    
    //     return dataAttributes.trim(); // Trim the trailing space
    // }


    function createDataAttributes(responsiveData) {
        const attributes = {};
        if (responsiveData && responsiveData.order && responsiveData.order.sizes) {
            const sizes = responsiveData.order.sizes;
            attributes['data-order'] = sizes.default || '';
    
            Object.keys(sizes).forEach(key => {
                if (key !== 'default') { // Avoid duplicating the default key
                    attributes[`data-order-${key}`] = sizes[key];
                }
            });
        }
    
        return attributes;
    }





    const Edit = ( props ) => {

        const {
            attributes,
            clientId,
            setAttributes,
            hasChildBlocks,
        } = props

        const dataAttributes = createDataAttributes(attributes.responsive);



        const [size, setSize]= useState(parseInt(attributes.size));
        useEffect(() => {
            // logic here
            setAttributes({size: parseInt(size) })
        },[size])

        // const [newOrder, setNewOrder]= useState(parseInt(attributes.size));

        console.log(attributes)
        const breakpointValue = getBreakpointValue( attributes?.responsive, 'size' ,'xl' )
        console.table(breakpointValue)
        
        return  [

            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton icon={ chevronLeft }
                        onClick={()=>{ 
                            // setBreakpointPreview(!breakpointPreview)
                        }}
                    ></ToolbarButton>
                    <ToolbarButton icon={ chevronRight }
                        onClick={()=>{ 
                            // setBreakpointPreview(!breakpointPreview)
                        }}
                    ></ToolbarButton>
                </ToolbarGroup>
            </BlockControls>,
           

            <ResponsiveInspectorControls
                selectedBreakpoint={ attributes?.breakpointPreview ? attributes?.selectedBreakpoint : false  }
                // isSmall
                size
                order
                margin
                padding

                verticalAlign="stretch"
                horizontalAlign
                textAlign
                {...props}
            />,
            

            <h4>Size: {size}</h4>,


            <InnerBlocks
                __experimentalCaptureToolbars={ true }
                templateLock={ false }
                templateInsertUpdatesSelection={ false }
                renderAppender={ (

                    hasChildBlocks
                        ? undefined
                        : () => <InnerBlocks.ButtonBlockAppender />
                ) }
            />,


            // // <div 
            // //     // dangerouslySetInnerHTML={{__html: `<div ${dataAttributes}>`}}
            // //     // other div attributes if necessary
            // //     {...dataAttributes}
            // // >
            //     {/* {dataAttributes.toString()} */}
            //     <InnerBlocks
            //         templateLock={ false }
            //         templateInsertUpdatesSelection={ false }
            //         renderAppender={ (

            //             hasChildBlocks
            //                 ? undefined
            //                 : () => <InnerBlocks.ButtonBlockAppender />
            //         ) }
            //     />
            // // </div>
            // ,


            // <DebugHelper data={props.attributes?.responsive} {...props}/>
            <DebugHelper data={props.attributes} {...props}/>
        ]



        return  <Fragment>
                <h4>Repeater</h4>
                    <InnerBlocks
                        templateLock={ false }
                        renderAppender={ (

                            props.hasChildBlocks
                                ? undefined
                                : () => <InnerBlocks.ButtonBlockAppender />

                            // isSelected ? 
                            // () => <InnerBlocks.ButtonBlockAppender /> 
                            // : undefined

                            // hasChildBlocks && !isSelected ?
                            //     undefined :
                            //     () => <InnerBlocks.ButtonBlockAppender />
                        ) }
                    />
               
        </Fragment>

    }


export default Edit
