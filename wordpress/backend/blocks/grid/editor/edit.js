import config from '../../../../../config'


/**
 * External dependencies
 */
 import classnames from 'classnames';
//  import debounce from 'lodash.debounce';
 import {debounce} from 'lodash';
 import JSONTree from 'react-json-tree'
 import ReactJson from 'react-json-view'

/**
 * WordPress dependencies
 */

 const {
     Component,
     Fragment,

     useState,
     useEffect,
     useCallback,
     useRef,
} = wp.element;

 const { 
	compose,
} = wp.compose;

// import { compose } from '@wordpress/compose';

//  import {
// 	InnerBlocks,
// 	BlockControls,
// 	BlockVerticalAlignmentToolbar,
// 	InspectorControls,
// 	useBlockProps,
// 	useSetting,
// 	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
// 	store as blockEditorStore,
// } from '@wordpress/block-editor';
    const {
        InnerBlocks,
        BlockControls,
        BlockVerticalAlignmentToolbar,
        InspectorControls,
        useBlockProps,
        // useEditorFeature : useSetting,
        // useSetting,
        // __experimentalUseInnerBlocksProps: useInnerBlocksProps,
        useInnerBlocksProps,
        store: blockEditorStore,
    } = wp.blockEditor;



    const {
        // __experimentalUseCustomUnits: useCustomUnits,
        // __experimentalUnitControl: UnitControl,
        // __experimentalNumberControl: NumberControl,

        __experimentalUseCustomUnits: useCustomUnits,
        __experimentalUnitControl: UnitControl,
        __experimentalNumberControl: NumberControl,

        BaseControl,
        Button,
        IconButton,
        ButtonGroup,
        PanelBody,
        PanelRow,
        RangeControl,
        Placeholder,
        Toolbar,
        Tooltip,
        TextControl,
        SelectControl,
        CustomSelectControl,

        ToolbarGroup,
        ToolbarButton,
    } = wp.components;

    const {
        select,
        dispatch,

        useSelect,
        useDispatch,
    } = wp.data;








    const { __, sprintf } = wp.i18n;

    import parsePropsToAttributes from '../../../utils/parse-props-to-attributes'


    import ResponsiveTextControl from '../../../components/responsive-text-control' 
    import ResponsiveWrapper from '../../../components/responsive-wrapper' 
    import ResponsiveControl from '../../../components/responsive-control' 
    import ResponsiveNumberControl from '../../../components/responsive-number-control' 
    import ResponsiveRangeControl from '../../../components/responsive-range-control' 
    import ResponsiveToggleControl from '../../../components/responsive-toggle-control' 
    import ResponsiveSelectControl from '../../../components/responsive-select-control' 
    import ResponsiveCustomSelectControl from '../../../components/responsive-custom-select-control' 
    import ResponsiveButtonGroup from '../../../components/responsive-button-group' 


    import ResponsiveInspectorControls from '../../../components/responsive-inspector-controls' 

import { getIcon } from '../../../utils';



import DebugHelper from '../../../components/debug-helper'
import DevicePreview from './device-preview'

import GridTemplates from './grid-templates'
// import { PanelRow } from '@wordpress/components';


// console.log( GridTemplates.getTemplates() )

// GridTemplates.create('Test')
/**
 * Block edit function
 */


// const templates = {
//     'a' : [
//         [`${ config.namespace }/repeater`],
//     ],
    
//     'a-a' : [
//         [`${ config.namespace }/repeater`],
//         [`${ config.namespace }/repeater`],
//     ],
//     'a-a-a' : [
//         [`${ config.namespace }/repeater`],
//         [`${ config.namespace }/repeater`],
//         [`${ config.namespace }/repeater`],
//     ],
//     'a-a-a-a' : [
//         [`${ config.namespace }/repeater`],
//         [`${ config.namespace }/repeater`],
//         [`${ config.namespace }/repeater`],
//     ],
// }



const getColumns = (columns, presets = {} ) => {
    const template = []
    for(let i = 0; i < columns; i++ ) {
        template.push([`${ config.namespace }/repeater`, {
            responsive: {
                order: {
                    sizes: {
                        default: i,
                    }
                }
            }
        }])
        // template.push([`${ config.namespace }/repeater`, {}])
    }
    // console.log('template', template)
    return template
}



const Edit = ( props ) => {

    const {
        attributes,
        setAttributes,
        updateAlignment,
        updateColumns,
        clientId,
    } = props




    const [breakpointPreview, setBreakpointPreview] = useState( attributes.breakpointPreview);
    useEffect(()=>{
        setAttributes({breakpointPreview: breakpointPreview})
    },[breakpointPreview])

    const [selectedBreakpoint, selectBreakpoint] = useState(attributes.selectedBreakpoint || 'default');
    useEffect(()=>{
        setAttributes({selectedBreakpoint: selectedBreakpoint})

        // Update selected breakpoint of children
        select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach( (block) => {
            // console.log(block)
            // dispatch('core/editor').updateBlockAttributes(block.clientId, { sectionTag: 'div' })
            dispatch('core/editor').updateBlockAttributes(block.clientId, {
                selectedBreakpoint: selectedBreakpoint,
                breakpointPreview: breakpointPreview,
            })
        })

    }, [selectedBreakpoint, breakpointPreview])




    const [columnGenerator, setColumnGenerator]= useState(1);
    // useEffect(() => {
    //     // logic here
    //     // setAttributes({grid: parseInt(grid)})
    //     console.log( 'columnGenerator', columnGenerator )
    // },[columnGenerator])



    const [grid, setGrid]= useState(attributes.grid || config.columns);
    useEffect(() => {
        // logic here
        setAttributes({grid: parseInt(grid)})
    },[grid])

    // highlight-starts
	const debouncedSetGrid = useCallback(
		debounce(nextValue => setGrid(parseInt(nextValue)), 500),
		[], // will be created only once initially
	);
	// highlight-ends



    const [columnsPreset, setColumnsPreset]= useState( false );
    const [columns, setColumns]= useState(parseInt( attributes.columns) );
    useEffect(() => {
        // logic here
        setAttributes({columns: parseInt(columns)})
    },[columns])

    const debouncedSetColumns = useCallback(
		debounce(nextValue => setColumns(parseInt(nextValue)), 500),
		[], // will be created only once initially
	);
    

   
    


    const { count } = useSelect(
		( select ) => {
			return {
				count: select( blockEditorStore ).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);



    


    // const blockProps = useBlockProps( {
	// 	// className: classes,
	// } )
    // const ref = useRef();
    // const blockProps = useBlockProps( clientId, ref )
    // const blockProps = useBlockProps( props )
    const blockProps = useBlockProps()

    const innerBlocksProps = useInnerBlocksProps( blockProps, {

		// allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',

        templateInsertUpdatesSelection: true,
        templateLock: "all",
        allowedBlocks: [ `${ config.namespace }/repeater` ],

        template: columnsPreset || getColumns(columns),

        // template:[
        //     [`${ config.namespace }/repeater`],
        //     [`${ config.namespace }/repeater`],
        // ] 
	} );




    const responsiveText = <ResponsiveTextControl 
        attribute="margin"
        // selected-breakpoint={'m'}
        onUpdate={ (event) => {
            console.log('onChange ResponsiveTC:', event)
        }}

        // onChange={ (e)=>{ console.log("changed responsive text control")}}
        responsive-data={ props.attributes.responsive.margin?.sizes }
        // responsive-data={{
        //     // default: {},
        //     m: 'value m',
        //     xl: 'value xl',
        //     xxl: 'value xxl',
        // }}

        { ...props }
    />



    const responsiveTexPadding = <ResponsiveTextControl 
        attribute="padding"
        // selected-breakpoint={'m'}
        onUpdate={ (event) => {
            console.log('onChange ResponsiveTC:', event)
        }}

        // onChange={ (e)=>{ console.log("changed responsive text control")}}
        responsive-data={ props.attributes.responsive.padding?.sizes }
        // responsive-data={{
        //     // default: {},
        //     m: 'value m',
        //     xl: 'value xl',
        //     xxl: 'value xxl',
        // }}

        { ...props }
    />




    // console.log( 'row', parsePropsToAttributes( attributes?.responsive ) )
    
    const gridTemplates = GridTemplates.getTemplates()


        // GridTemplates.getTemplates
    const GridPlaceholder = () => {
        return (
            <Placeholder
                icon={ getIcon('row') }
                label={ __( 'New Grid test', `${ config.namespace }` )}
                isColumnLayout
            >
                <BaseControl
                    // help={ 'Number of Columns'}
                    label={ 'Use grid from presets' }
                    style={{width: '100%'}}
                >
                    <PanelRow className={"create-columns-base"}>
                        {/* <IconButton className={"create-columns-button"} isPrimary>{__( 'Create Grid', `${ config.namespace }`) }</IconButton> */}
                        { Object.keys(gridTemplates).map( templateName => {
                            const template = gridTemplates[templateName]
                            const templateLayout = []
                            templateName.split('-').map( (part, index) => {
                                templateLayout.push(
                                    // <div class="grid-preset-col">r</div>
                                    <div class="grid-preset-col">{ (1+index)}</div>
                                )
                            })

                            return (
                                // <Button isSecondary>{templateName}</Button>
                                <Button isPrimary className={"grid-preset-button"}
                                    onClick={ () => {
                                        // console.log(GridTemplates.get(templateName))
                                        const preset = GridTemplates.get(templateName)
                                        setColumnsPreset( GridTemplates.get(templateName) )
                                        setColumns( preset.length )
                                        // console.log('preset', preset.length )
                                    }}
                                >{templateLayout}</Button>
                            )
                        } )}
                    </PanelRow>

                </BaseControl>


                <BaseControl
                    // help={ 'Number of Columns'}
                    label={ 'Or create a custom grid with n columns' }
                    className={"create-columns-base"}
                >
                    <PanelRow
                        style={{'max-width': '280px'}}
                    >
                        <NumberControl
                            value={columnGenerator}
                            onChange={setColumnGenerator}
                            step={1}
                            min={1}
                        />
                        <IconButton className={"create-columns-button"} isPrimary
                            onClick={ ()=> {
                                setColumns(columnGenerator)
                            }}
                        >{__( 'Create Grid', `${ config.namespace }`) }</IconButton>
                    </PanelRow>
                </BaseControl>
                {/* <IconButton isPrimary>{__( 'Create', `${ config.namespace }`) }</IconButton>
                <IconButton isPrimary>{__( 'Create', `${ config.namespace }`) }</IconButton> */}


                {/* <PanelRow>
                    <BaseControl>
                        <NumberControl
                            value={columnGenerator}
                            onChange={setColumnGenerator}
                            min={1}
                        />
                        <Button isPrimary>{__( 'Create', `${ config.namespace }`) }</Button>
                    </BaseControl>
                </PanelRow> */}
                {/* <ButtonGroup> */}
                    {/* { [...Array(config.columns).keys()].map( i => {
                        return <Button isSmall >i: {i}</Button>
                    } )} */}
                {/* </ButtonGroup> */}
                {/* <div>
                    <Button isPrimary>Create Grid</Button>
                </div>
                <div>
                    <Button isPrimary>Create Grid</Button>
                </div> */}

            </Placeholder>
        )
    }



    // const renderGrid = () => {

    //     const theRow = <vc-row grid={grid} {... parsePropsToAttributes( attributes?.responsive ) } { ...innerBlocksProps } ></vc-row>


    //     if( breakpointPreview ) {
    //         return (
    //             <div className="grid-breakpoint-preview">
    //                 <div className="grid-breakpoint-preview-inner" style={{
    //                     // backgroundColor: '#ff00cc',
    //                     // maxWidth: config.breakpoints[selectedBreakpoint] ? `${config.breakpoints[selectedBreakpoint]}px` :  '98%',
    //                     // marginLeft: 'auto',
    //                     // marginRight: 'auto',
    //                 }}>
    //                     {theRow}
    //                 </div>
    //             </div>
    //             )
    //     }

    //     return theRow

    //      {/* <div className="grid-breakpoint-preview">
    //             <div className="grid-breakpoint-preview-inner" style={{
    //                 // backgroundColor: '#ff00cc',
    //                 maxWidth: config.breakpoints[selectedBreakpoint] ? `${config.breakpoints[selectedBreakpoint]}px` :  '98%',
    //                 // marginLeft: 'auto',
    //                 // marginRight: 'auto',
    //             }}>

    //         { (columns > 0 || columnsPreset) && [

    //             <vc-row
    //             grid={grid} {... parsePropsToAttributes( attributes?.responsive ) } { ...innerBlocksProps } >
    //             </vc-row>,

    //             // !breakpointPreview && <vc-row
    //             //     grid={grid} {... parsePropsToAttributes( attributes?.responsive ) } { ...innerBlocksProps } >
    //             // </vc-row>,
               
    //             // breakpointPreview && <div className="grid-breakpoint-preview">
    //             //         <div className="grid-breakpoint-preview-inner" style={{
    //             //             // backgroundColor: '#ff00cc',
    //             //             maxWidth: config.breakpoints[selectedBreakpoint] ? `${config.breakpoints[selectedBreakpoint]}px` :  '98%',
    //             //             // marginLeft: 'auto',
    //             //             // marginRight: 'auto',
    //             //         }}>
    //             //             <vc-row
    //             //                 grid={grid} {... parsePropsToAttributes( attributes?.responsive ) } { ...innerBlocksProps } >
    //             //             </vc-row>
    //             //         </div>
    //             //     </div>
                
            
    //         ]}

    //         </div>
    //         </div> */}

    // }


    const innerPreviewStyle = {}
    let previewLabel = ''

    if( breakpointPreview ) {
        innerPreviewStyle.maxWidth = config.breakpoints[selectedBreakpoint] ? `${config.breakpoints[selectedBreakpoint]}px` :  '98%'
        previewLabel = `${__( 'Preview', `${ config.namespace }` )}: ${selectedBreakpoint.toUpperCase()}`
    }
    // style={{
    //     // backgroundColor: '#ff00cc',
    //     maxWidth: config.breakpoints[selectedBreakpoint] ? `${config.breakpoints[selectedBreakpoint]}px` :  '98%',
    //     // marginLeft: 'auto',
    //     // marginRight: 'auto',
    // }}



    


    return (
        <div { ...blockProps }>
            {/* <DevicePreview />*/}
            {/* <BlockControls>
                <ToolbarButton icon={ getIcon('window-width') } label="Preview"
                    isPressed={ breakpointPreview }
                    onClick={()=>{ 
                        setBreakpointPreview(!breakpointPreview)
                    }}
                ></ToolbarButton>
            </BlockControls> */}

                <BlockControls>
                    <ToolbarGroup>

                        <ToolbarButton icon={ getIcon('window-width') } label="Preview"
                            isPressed={ breakpointPreview }
                            onClick={()=>{ 
                                setBreakpointPreview(!breakpointPreview)
                            }}
                        ></ToolbarButton>
                        {breakpointPreview && (
                            ['default', ...Object.keys(config.breakpointsReverse)].map( breakpoint => { 
                                return <ToolbarButton
                                    isPressed={ selectedBreakpoint == breakpoint}
                                    onClick={ (e) => {
                                        //this.selectBreakpoint(breakpoint)
                                        if( selectedBreakpoint == breakpoint) selectBreakpoint('default')
                                        else selectBreakpoint(breakpoint)
                                    }} 
                                >{breakpoint.toUpperCase()}</ToolbarButton>
                            })
                        )}
                    </ToolbarGroup>
                </BlockControls>

                {/* <h2>Breakpoint: { selectedBreakpoint.toUpperCase() }</h2> */}



                <InspectorControls>
                    <PanelBody title={ __( 'Grid', `${ config.namespace }` ) }> 
                        <NumberControl
                            label="Columns"
                            isShiftStepEnabled={ true }
                            // onChange={ debouncedSetColumns }
                            onChange={ newCols => {
                                // console.log("columns", newCols)
                                setColumns( parseInt(newCols) )
                                setAttributes ({columns: parseInt(newCols)})
                            } }
                            // onChange={ setColumns }
                            shiftStep={ 1 }
                            value={ columns }
                        />
                    </PanelBody>
                </InspectorControls>

               
                    
                            
            {/* <ResponsiveInspectorControls
                // isSmall
                size
                margin
                padding

                verticalAlign
                horizontalAlign
                textAlign
                {...props}
            /> */}

            { (!columns && !columnsPreset) &&
                <GridPlaceholder />
            }



            {/* { renderGrid() } */}

            <div className={`grid-breakpoint-preview ${breakpointPreview ? 'active-preview': 'inactive-preview'}`}>
                <div className="grid-breakpoint-preview-inner"
                style={innerPreviewStyle}
                >
                    <div className={"grid-breakpoint-preview-label"}>{previewLabel}</div>

                    {/* {   columns &&  <h6>Test</h6>}
                    <vc-row grid={grid}
                        {... parsePropsToAttributes( attributes?.responsive, (attributes?.breakpointPreview) ? attributes?.selectedBreakpoint : false  ) }
                        { ...innerBlocksProps }
                    /> */}
                
                    <vc-row grid={grid}
                        {... parsePropsToAttributes( attributes?.responsive, (attributes?.breakpointPreview) ? attributes?.selectedBreakpoint : false  ) }
                        { ...innerBlocksProps }
                    />
                    



                    {/* { (columns > 0 || columnsPreset) && [

                        <vc-row
                        grid={grid} {... parsePropsToAttributes( attributes?.responsive, (attributes?.breakpointPreview) ? attributes?.selectedBreakpoint : false  ) } { ...innerBlocksProps } >
                        </vc-row>,

                        // !breakpointPreview && <vc-row
                        //     grid={grid} {... parsePropsToAttributes( attributes?.responsive ) } { ...innerBlocksProps } >
                        // </vc-row>,
                    
                        // breakpointPreview && <div className="grid-breakpoint-preview">
                        //         <div className="grid-breakpoint-preview-inner" style={{
                        //             // backgroundColor: '#ff00cc',
                        //             maxWidth: config.breakpoints[selectedBreakpoint] ? `${config.breakpoints[selectedBreakpoint]}px` :  '98%',
                        //             // marginLeft: 'auto',
                        //             // marginRight: 'auto',
                        //         }}>
                        //             <vc-row
                        //                 grid={grid} {... parsePropsToAttributes( attributes?.responsive ) } { ...innerBlocksProps } >
                        //             </vc-row>
                        //         </div>
                        //     </div>
                        
                    
                    ]} */}

                </div>
            </div>


            <DebugHelper data={ props }/>

        </div>
    )


}


// export default compose()( Edit );
export default Edit;


// export default  Edit;


/*
 class Edit extends Component {

	constructor( props ) {
		super( ...arguments );

        // this.blockProps = useBlockProps()

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

        return  (
            <vc-row grid="18" class="backend">
                <InnerBlocks
                    // templateInsertUpdatesSelection={ false }
                    templateLock="all"
                    allowedBlocks={ [ `${ config.namespace }/repeater` ] }

                    template={ [
                            [`${ config.namespace }/repeater`],
                            [`${ config.namespace }/repeater`],
                        ] }
                    // templateLock={ false }
                    // renderAppender={ (


                    //     // isSelected ? () => <InnerBlocks.ButtonBlockAppender /> : undefined

                    //     hasChildBlocks && !isSelected ?
                    //         undefined :
                    //         () => <InnerBlocks.ButtonBlockAppender />
                    // ) }
                />
        </vc-row>


        )
       
    }
}


export default compose()( Edit );
// export default  Edit;
*/

// export default withSelect( ( select, ownProps ) => {
//     const { clientId } = ownProps;
//     const blockEditor = select( 'core/block-editor' );

//     return {
//         hasChildBlocks: blockEditor ? blockEditor.getBlockOrder( clientId ).length > 0 : false,
//     };
// } )( Edit );