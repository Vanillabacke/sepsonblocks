/**
 * External dependencies
 */
//  import classnames from 'classnames';

import HydrateComp from "./HydrateComp";

 /**
  * WordPress dependencies
  */
 
//  import config from '../../../config';
 
 
 
// import ReactDOMServer from 'react-dom/server';
 
import { renderToStaticMarkup } from "react-dom/server";


 export default function save( { 
     attributes,
     // className 
 } ) {
 
     // const {
     // } = attributes;
 

    //  return <vanilla-grid></vanilla-grid>
 
 
//      return (<react-grid name="sheesh">
//      <h2>React Grid</h2>
//      <react-col>
//          column
//      </react-col>
//  </react-grid>
//     )

    // return false

    // console.log("ReactDOMServer")
    // console.log("ReactDOMServer", ReactDOMServer.renderToStaticMarkup(<HydrateComp text={attributes.content}/>))




    // try {
    //     // console.log( ReactDOMServer.renderToStaticMarkup(<HydrateComp content={attributes.content}/>) )
    //     console.log( ReactDOMServer.renderToString(<HydrateComp content={attributes.content}/>) )
    // } catch (e) {
    //     console.log( "dafuq", e)
    // }

    // const renderedComp = ReactDOMServer.renderToStaticMarkup(<HydrateComp content={attributes.content}/>)
    const renderedComp = renderToStaticMarkup(<HydrateComp content={attributes.content}/>)
    console.log( renderedComp )


    // return <div className="hydrate-block" hydratedata={JSON.stringify(attributes)}></div>
    return <div className="hydrate-block" hydratedata={JSON.stringify(attributes)}  dangerouslySetInnerHTML={{__html: renderedComp}}></div>
    return <div className="hydrate-block" hydratedata={JSON.stringify(attributes)}>{renderedComp}</div>
    // const renderedComp = ReactDOMServer.renderToStaticMarkup(<HydrateComp text={attributes.content}/>)

    // return <vc-motion></vc-motion>
    // return <vc-motion delay="2"></vc-motion>
    return <div className="hydrate-comp">{renderedComp}</div>

    return <div className="hydrate-comp"><pre>{JSON.stringify(attributes)}</pre></div>
    return <div className="hydrate-comp">
        <h1>Test Hydrate Frontend</h1>
         {/* {ReactDOMServer.renderToString(<HydrateComp text={attributes.content}/>)} */}
         {ReactDOMServer.renderToStaticMarkup(<HydrateComp text={attributes.content}/>)}
        </div>
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