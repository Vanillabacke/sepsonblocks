/**
 * External dependencies
 */
 import classnames from 'classnames';
import parsePropsToAttributes from '../../../utils/parse-props-to-attributes';
import { createDataAttributes, createDataAttributesToObject, flattenResponsiveValues } from '../../../../utils/responsiveHelper';

 /**
  * WordPress dependencies
  */
//  import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

//  import { InnerBlocks } from '@wordpress/block-editor';

const { InnerBlocks, useBlockProps } = wp.blockEditor;
 
 export default function save( { props, attributes } ) {

    const blockProps = useBlockProps.save();  // Get props for saving

    // const align = props.attributes.align || 'default-alignment';


    // console.log("...useBlockProps")
    console.clear()
    // console.log('useBlockProps')
    // console.log(useBlockProps)
    console.log('attributes')
    console.log(attributes)
    console.log('props')
    console.log(props)
    // console.log('parsePropsToAttributes(attributes)')
    // console.log(parsePropsToAttributes(attributes))
    console.log("flattenResponsiveValues(attributes?.responsive)")
    const flattend = flattenResponsiveValues(attributes?.responsive)
    console.log(flattenResponsiveValues(attributes?.responsive))
    
    
    console.log("createDataAttributes(flattend)")
    // const dataAttr = createDataAttributes(flattend)
    const dataAttr = createDataAttributesToObject(flattend)
    console.log(dataAttr)

    

    

    return (
        <div {...blockProps} {...dataAttr}>
            {/* <InnerBlocks.Content /> */}
            <h4>Responsive Size</h4>
        </div>
    );

    return (
        <div {...useBlockProps.save()}>
            {/* <InnerBlocks.Content /> */}
            <h4>Responsive Size</h4>
        </div>
    );
    

    return (
        <div>
            <InnerBlocks.Content />
        </div>
    );

    // <div {...blockProps}>  // Spread the saved block props here
    return (
        <div>
            <h4>Repeater Content goes here...</h4>
            <InnerBlocks.Content />  // This outputs the inner blocks
        </div>
    )

    //  return (
    //      <div
    //          { ...useBlockProps.save( {
    //              className: wrapperClasses,
    //              style,
    //          } ) }
    //      >
    //          <InnerBlocks.Content />
    //      </div>
    //  );
 }
 



