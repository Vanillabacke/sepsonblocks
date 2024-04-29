/**
 * External dependencies
 */
 import classnames from 'classnames';

 /**
  * WordPress dependencies
  */
//  import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

//  import { InnerBlocks } from '@wordpress/block-editor';

const { InnerBlocks, useBlockProps } = wp.blockEditor;
 
 export default function save( { props, attributes } ) {

    // const blockProps = useBlockProps.save();  // Get props for saving

    // const align = props.attributes.align || 'default-alignment';


    // console.log("...useBlockProps")
    // console.log(useBlockProps)

    return (
        <div {...useBlockProps.save()}>
            <InnerBlocks.Content />
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
 



