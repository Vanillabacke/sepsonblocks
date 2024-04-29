/**
 * External dependencies
 */
//  import classnames from 'classnames';

 /**
  * WordPress dependencies
  */
 
//  import config from '../../../config';
 
 
 
const {
    RichText,
} = wp.blockEditor


 
 export default function save( { 
     attributes,
     // className 
 } ) {
 
     const {
         content,
     } = attributes;
 

    return <RichText.Content
        tagName='p'
        className='font-hero'
        value={content}
    />
        // return attributes.content
    return false

     
 
 }