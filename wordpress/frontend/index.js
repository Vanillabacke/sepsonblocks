console.log("template")

import './style.scss'

import '../defaults'
import '../font'

// import responsiveLayoutHandler from '../../utils/grid';

// responsiveLayoutHandler();

import '../../utils/grid';
import '../backend/blocks/responsiveSize/frontend';


// import domReady from '@wordpress/dom-ready';
// import { render } from '@wordpress/element';
// import HydrateComp from '../backend/blocks/hydrate/editor/HydrateComp';

// import {hydrate } from "react-dom"
// // import { hydrateRoot } from "react-dom/client"
// import React from 'react'

// window.React = React

// // const {
// //     Component,
// //     Fragment,

// //     useRef,
// //     useState,
// //     useEffect,
// // } = wp.element;


// // import HydrateComp from './blocks/hydrate/editor/HydrateComp'

// function Chart() {
//   return (
//     <div>index</div>
//   )
// }


// domReady( () => {
// 	const blocks = document.querySelectorAll(
// 		'.hydrate-block'
// 		// '.wp-block-jsadvancers-data-visualisation'
// 	);

//     blocks.forEach( ( block ) => {
//         const data = JSON.parse(block.getAttribute('hydratedata') )

//         console.log( 'data', data )
        
//         hydrate(
//             <HydrateComp {...data}/>,
// 			block,
//             () => {
//                 console.log('hydrated', block)
//             }
// 		);
        
//         // hydrateRoot(
// 		// 	block,
// 		// 	<HydrateComp {...data}/>,
//         //     () => {
//         //         console.log('hydrated', block)
//         //     }
// 		// );
//     })
// });


// // // import React, { useState } from "react"
// // // import ReactDOM from "react-dom"
// // import HydrateComp from '../backend/blocks/hydrate/editor/HydrateComp'
// // // import HydrateComp from './blocks/hydrate/editor/HydrateComp'


// // import * as React from 'react';
// // import * as ReactDOM from 'react-dom';
// // import * as retargetEvents from 'react-shadow-dom-retarget-events';


// // import {unescape} from 'lodash'
// // import { render } from '@wordpress/element';



// // // function htmlDecode(input){
// // //     var e = document.createElement('div');
// // //     e.innerHTML = input;
// // //     return e.childNodes[0].nodeValue;
// // //   }


// // function htmlDecode(input) {
// //     var doc = new DOMParser().parseFromString(input, "text/html");
// //     return doc.documentElement.textContent;
// // }


// // function escapeHtml(unsafe)
// // {
// //     return unsafe
// //          .replace(/&/g, "&amp;")
// //          .replace(/</g, "&lt;")
// //          .replace(/>/g, "&gt;")
// //          .replace(/"/g, "&quot;")
// //          .replace(/'/g, "&#039;");
// //  }



// //  function htmlspecialchars(str) {
// //     var map = {
// //         "&": "&amp;",
// //         "<": "&lt;",
// //         ">": "&gt;",
// //         "\"": "&quot;",
// //         "'": "&#39;" // ' -> &apos; for XML only
// //     };
// //     return str.replace(/[&<>"']/g, function(m) { return map[m]; });
// // }
// // function htmlspecialchars_decode(str) {
// //     var map = {
// //         "&amp;": "&",
// //         "&lt;": "<",
// //         "&gt;": ">",
// //         "&quot;": "\"",
// //         "&#39;": "'"
// //     };
// //     return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, function(m) { return map[m]; });
// // }
// // function htmlentities(str) {
// //     var textarea = document.createElement("textarea");
// //     textarea.innerHTML = str;
// //     return textarea.innerHTML;
// // }
// // function htmlentities_decode(str) {
// //     var textarea = document.createElement("textarea");
// //     textarea.innerHTML = str;
// //     return textarea.value;
// // }


// // function unwrap(wrapper) {
// //     // place childNodes in document fragment
// //     var docFrag = document.createDocumentFragment();
// //     while (wrapper.firstChild) {
// //         var child = wrapper.removeChild(wrapper.firstChild);
// //         docFrag.appendChild(child);
// //     }

// //     // replace wrapper with document fragment
// //     wrapper.parentNode.replaceChild(docFrag, wrapper);
// // }

// // window.addEventListener("DOMContentLoaded", () => {



// //     const newEle = document.createElement("div")
// //     // newEle.innerHTML = 'HydrateComp'
// //     // newEle.innerHTML = '<div><h1>HydrateComp</h1></div>'
// //     newEle.innerHTML = '<h1>HydrateComp</h1>'
// //     // newEle.innerHTML = '<h1 data-reactroot="">HydrateComp</h1>'

// //     console.log( newEle)
// //     document.body.appendChild(newEle)

// //     // ReactDOM.render(<HydrateComp />, newEle);

// //     // render(<HydrateComp />, newEle);
// //     // render(<div>was geht</div>, newEle);
// //     ReactDOM.hydrate(<HydrateComp suppressHydrationWarning={false}/>, newEle);



// //     // const customReact = document.querySelectorAll(".hydrate-comp");
// //     const customReact = document.querySelectorAll(".hydrate-test");
// //     if (customReact) {
// //       Array.from(customReact).forEach((ele) => {
// //           console.log( ele )
// //         //   ele.style.border = '1px solid red'
// //         //   ele.innerHTML = 'test
// //         // const attributes = JSON.parse(ele.dataset.mtAttributes);
// //         // ReactDOM.hydrate(<CollapsibleReact attributes={attributes} />, ele);


// //         // const data = JSON.parse(ele.querySelector("pre").innerText)
// //         // const data = JSON.parse(ele.dataset.datahydrate)
// //         // console.log(data)

// //         // const data = JSON.parse(ele.getAttribute('datahydrate'))
// //         // const html = escapeHtml()

// //         // console.log( data )
// //         // const text = `<div>${htmlspecialchars_decode(ele.innerHTML)}</div>`
// //         const text = htmlspecialchars_decode(ele.innerHTML)

// //         ele.innerHTML = text

// //         // ele.classList.remove("wp-block-vc-hydrate")
// //         // ele.classList.remove("hydrate-comp")
// //         // ele.removeAttribute('datahydrate')
// //         // ele.removeAttribute('class')


// //         // var temp = document.createElement('div');
// //         // temp.innerHTML = text

// //         // console.log(temp)
// //         // console.log(temp.firstChild.innerHTML)

// //         // // ele.innerHTML = htmlspecialchars_decode(temp.firstChild.innerHTML)
// //         // ele.innerHTML = htmlspecialchars_decode(temp.innerHTML)

// //         // console.log( 'ele.innerHTML', ele.innerHTML)
// //         // console.log( 'text', text)



// //         // ele.innerHTML = text
        
// //         // unwrap(ele)
// //         // ele.innerHTML('text')

// //         // return

// //         // const innerHTML = unescape(ele.innerHTML).replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;|&amp;quot;/gi, '"')
// //         // ele.innerHTML = htmlDecode(innerHTML.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;|&amp;quot;/gi, '"'))

// //         // ele.innerHTML = ''
        
// //         // console.log( ele.attributes )
// //         // // console.log( 'title', ele.getAttribute("title") )
// //         // const title =  ele.getAttribute("title");
// //         // const hidden =  ele.getAttribute("data-hidden");
// //         // // ele.children
// //         // const attributes = {
// //         //     // title: "custom",
// //         //     title: title,
// //         //     hidden: hidden,
// //         //     // hidden: false,
// //         //     // children: "Sheesh ma maaan",
// //         //     // children: convert(ele.childNodes),
// //         //     // children: <div>Hallo</div>
// //         // }


// //         // ReactDOM.render(<HydrateComp attributes={data} />, ele);
// //         // ReactDOM.hydrate(<HydrateComp warnForDeletedHydratableElement attributes={data} />, ele);

// //         const newEle = document.createElement("div")
// //         newEle.innerHTML = 'HydrateComp'
// //         // newEle.innerHTML = '<div><h1>HydrateComp</h1></div>'

// //         console.log( newEle)
// //         document.body.appendChild(newEle)
// //         // ReactDOM.hydrate(<HydrateComp/>, newEle);
// //         // ReactDOM.hydrate(<HydrateComp/>, ele.firstChild);
// //         // ReactDOM.hydrate(<HydrateComp attributes={data} />, ele);
// //       });
// //     }
// //   })


















// // setTimeout( () => {

// //     const divsToUpdate = document.querySelectorAll(".hydrate-comp")
    
// //     console.log("divsToUpdate", divsToUpdate)
// //     divsToUpdate.forEach(div => {
// //         const data = JSON.parse(div.querySelector("pre").innerText)
// //         console.log( 'data', data )
// //         ReactDOM.render(<HydrateComp {...data} />, div)
// //         div.classList.remove("hydrate-comp")
// //     })
// // }, 1000)



// // import './customElementTest'


// // // import registerFlex from 'Components/flex'
// // // import registerVariants from 'Components/variants'
// // import registerMotion from 'Components/motion'

// // // registerFlex()
// // // registerVariants()
// // registerMotion()


// // import registerSlideshow from 'Components/slideshow'
// // registerSlideshow()


// // import registerSlotted from './slotted'
// // registerSlotted()



// // import registerPreact from './preact'
// // registerPreact()