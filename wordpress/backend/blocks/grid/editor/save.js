/**
 * External dependencies
 */
 import classnames from 'classnames';

 /**
  * WordPress dependencies
  */
//  import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

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
 
 export default function save( { attributes } ) {

   
   // const blockProps = useBlockProps.save();
   // const innerBlocksProps = useInnerBlocksProps.save()

   // return <div {...blockProps}>{ attributes.content }</div>

    return <InnerBlocks.Content />
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
 