import { InnerBlocks } from '@wordpress/block-editor';


 export default function save( { 
     // attributes,
     // className 
    props,
    attributes
 } ) {
    return <div>
            <h4>Repeater Saved</h4>
            <InnerBlocks.Content />
        </div>
 }




// /**
//  * External dependencies
//  */
// //  import classnames from 'classnames';

//  /**
//   * WordPress dependencies
//   */



// /**
//  * External dependencies
//  */
// import classnames from 'classnames';

// /**
//  * WordPress dependencies
//  */
// const { Component } = wp.element;
// // import config from '../../../config';

// const {
//     applyFilters,
// } = wp.hooks;

// const {
//     InnerBlocks,
// } = wp.blockEditor;

 
 
 
 
 
//  export default function save( { 
//      // attributes,
//      // className 
//     props,
//     attributes
//  } ) {

//     const {
//         padding,
//         margin,

//         screen,

//     } = attributes;
 
//     return (
//         <div>
//             <InnerBlocks.Content />
//         </div>
//     );
     
 
//  }