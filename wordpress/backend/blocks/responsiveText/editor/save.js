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
 

    //  return <vanilla-grid></vanilla-grid>
 
 
//      return (<react-grid name="sheesh">
//      <h2>React Grid</h2>
//      <react-col>
//          column
//      </react-col>
//  </react-grid>
//     )


    return <RichText.Content
        tagName='p'
        // className='card-subheading'
        value={content}
    />
        // return attributes.content
    return false
    //  return (
    //      <div>
    //         <h1>Test Block</h1>
	// 			   <vc-col size="12" order="3" order-m="3">Column 1</vc-col>
	// 			   <vc-row>
	// 		<vc-col
	// 			size="12"
	// 			xxl="10"
	// 			xl="8"
	// 			l="7"
	// 			m="6"
	// 			s="4"
	// 			xs="2"
	// 		>
	// 			Column 1</vc-col>
	// 	</vc-row>
	// 			   <vc-row grid="10">
	// 					<vc-col size="2" m="12" order="3" order-m="3">Column 1</vc-col>
	// 					<vc-col size="4" m="12" order="2" order-m="1">Column 2</vc-col>
	// 					<vc-col size="12" m="12" order="1" order-m="2">Column 3</vc-col>
	// 				</vc-row>
    //      </div>
    //  );
     
 
 }