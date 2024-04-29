console.log("editor")
import './style.scss'

// import config from '../../config'
// import config from '../../../wConfig.js';
import config from '../../../src/config.js';




import '../defaults'
import '../font'

/**
 * WordPress dependencies
 */
 const { registerBlockType, unregisterBlockType  } = wp.blocks;
//  const { registerPlugin } = wp.plugins;











 
 // Category slug and title
const category = {
	slug:   config.namespace,
	title:  config.packageName,
};


// Register block category
import icons from './utils/block-category'


// // Register Sidebar
// import FormDocumentSettings from './document/sidebar';
// registerPlugin( 'project-preview-doc-settings',  {
// 	render: FormDocumentSettings,
// 	// icon: 'palmtree',
// } );


// Register Blocks
// import * as test from './blocks/test';
// import * as responsiveText from './blocks/responsiveText';
// import * as grid from './blocks/grid';
// import * as repeater from './blocks/repeater';

import * as responsiveSize from './blocks/responsiveSize';

// import * as cell from './blocks/repeater';

// import * as animate from './blocks/animate';



// import * as hero from './blocks/hero';
// import * as hydrate from './blocks/hydrate';

// import registerResponsiveBreak from 'Components/responsive-break'

// console.log( registerResponsiveBreak )
// registerResponsiveBreak()


// console.log( 'registerResponsiveBreak' )



export function registerBlocks () {

	[

        // hero,
        // hydrate,

        // test,
        // responsiveText,

        // animate,
        // cell,
		// grid,
		// repeater,

        responsiveSize,
    ].forEach( ( block ) => {

		if ( ! block ) {
			return;
		}

		const { name, icon, settings } = block;

		// console.log(`registered: ${ config.namespace }/${ name }`);
		
		registerBlockType( 
			`${ config.namespace }/${ name }`, 
			{ 
				category: category.slug, 
				icon,
				...settings 
			} 
		);
	} );
};
registerBlocks();


/*
// Hot Module Replacement
if (module.hot) {
    module.hot.accept([
        // './blocks/cell',
        // './blocks/grid',
        // './blocks/repeater',
        './blocks/responsivesize',
        './utils/block-category'
    ], () => {
        // Unregister all blocks to refresh with new changes
        [
            responsiveSize,
            // grid,
            // repeater,
        ].forEach((block) => {
            if (block) {
                unregisterBlockType(`${config.namespace}/${block.name}`);
            }
        });

        // Re-register blocks after update
        registerBlocks();
        console.log('Blocks reloaded after update!');
    });

    // module.hot.decline('./src/wordpress/backend/blocks/grid/editor/edit.js')
    // module.hot.block('./src/wordpress/backend/blocks/grid/editor/edit.js')
}

*/





// class MyElement extends HTMLElement {
//     constructor() {
//       super();
//       // element created


//       this.current = 0
//       this.parent = false
//       this.parentWidth = false
//     //   this.parentHeight = false

//        // Setup a click listener on <app-drawer> itself.
//         this.addEventListener('click', e => {
//             console.log( "click custom sheesh", e)

//             // this.parentWidth = e.contentRect.width
//             // this.parentHeight = e.contentRect.height

//             // this.update()
//             // Don't toggle the drawer if it's disabled.
//             // if (this.disabled) {
//             //     return;
//             // }
//             // this.toggleDrawer();
//         })



//         this.containerSizeObserver = new ResizeObserver( ([entry])=> {
//             console.log( 'containerSizeObserver', entry )

//             this.parentWidth = entry.contentRect.width
//             // this.parentHeight = entry.contentRect.height

//             // this.update()
//         })

//         this.update = this.update.bind(this)
//     }

//     update() {
//         // this.innerText = `hallo component: ${this.parentWidth || 0} x ${this.parentHeight || 0}`
//         // this.innerText = `hallo component: ${this.parentWidth || 0}`
//         // this.current += 1
//         // this.innerText = `hallo component: ${this.current}`
//         // if(this.current <  1 ) requestAnimationFrame(this.update)
//         // if(this.current <  20 ) requestAnimationFrame(this.update)
//     }
  
//     connectedCallback() {
//         console.log('connectedCallback', this)
        
//         this.contentEditable = false
        
//         this.parent = this.parentNode
//         this.containerSizeObserver.observe( this.parent )

//         // this.update()
//         requestAnimationFrame(this.update)
//       // browser calls this method when the element is added to the document
//       // (can be called many times if an element is repeatedly added/removed)
//     }
  
//     disconnectedCallback() {
//         console.log('disconnectedCallback')
//       // browser calls this method when the element is removed from the document
//       // (can be called many times if an element is repeatedly added/removed)
//     }
  
//     static get observedAttributes(){
//       return ['rules'];
//       return [/* array of attribute names to monitor for changes */];
//     }
  
//     attributeChangedCallback(name, oldValue, newValue) {
//         console.log('attributeChangedCallback')
//       // called when one of attributes listed above is modified
//     }
  
//     adoptedCallback() {
//         console.log('adoptedCallback')
//       // called when the element is moved to a new document
//       // (happens in document.adoptNode, very rarely used)
//     }
  
//     // there can be other element methods and properties
//   }



//   customElements.define("vc-break", MyElement)





// // (function() {

  
// //     class MyCounter extends HTMLElement {
// //       constructor() {
// //         super();
  
// //         this.increment = this.increment.bind(this);
// //         this.decrement = this.decrement.bind(this);
  
// //         this.attachShadow({ mode: 'open' });
// //         this.shadowRoot.appendChild(template.content.cloneNode(true));
  
// //         this.incrementBtn = this.shadowRoot.querySelector('[increment]');
// //         this.decrementBtn = this.shadowRoot.querySelector('[decrement]');
// //         this.displayVal = this.shadowRoot.querySelector('span');
// //       }
  
// //       connectedCallback() {
// //         this.incrementBtn.addEventListener('click', this.increment);
// //         this.decrementBtn.addEventListener('click', this.decrement);
  
// //         if (!this.hasAttribute('value')) {
// //           this.setAttribute('value', 1);
// //         }
// //       }
  
// //       increment() {
// //         // using +myVariable coerces myVariable into a number,
// //         // we do this because the attribute's value is received as a string
// //         const step = +this.step || 1;
// //         const newValue = +this.value + step;
  
// //         if (this.max) {
// //           this.value = newValue > +this.max ? +this.max : +newValue;
// //         } else {
// //           this.value = +newValue;
// //         }
// //       }
  
// //       decrement() {
// //         const step = +this.step || 1;
// //         const newValue = +this.value - step;
  
// //         if (this.min) {
// //           this.value = newValue <= +this.min ? +this.min : +newValue;
// //         } else {
// //           this.value = +newValue;
// //         }
// //       }
  
// //       static get observedAttributes() {
// //         return ['value'];
// //       }
  
// //       attributeChangedCallback(name, oldValue, newValue) {
// //         this.displayVal.innerText = this.value;
// //       }
  
// //       get value() {
// //         return this.getAttribute('value');
// //       }
  
// //       get step() {
// //         return this.getAttribute('step');
// //       }
  
// //       get min() {
// //         return this.getAttribute('min');
// //       }
  
// //       get max() {
// //         return this.getAttribute('max');
// //       }
  
// //       set value(newValue) {
// //         this.setAttribute('value', newValue);
// //       }
  
// //       set step(newValue) {
// //         this.setAttribute('step', newValue);
// //       }
  
// //       set min(newValue) {
// //         this.setAttribute('min', newValue);
// //       }
  
// //       set max(newValue) {
// //         this.setAttribute('max', newValue);
// //       }
  
// //       disconnectedCallback() {
// //         this.incrementBtn.removeEventListener('click', this.increment);
// //         this.decrementBtn.removeEventListener('click', this.decrement);
// //       }
// //     }
  
// //     window.customElements.define('vc-break', MyCounter);
// //   })();




// //     const template = document.createElement('template');
  
// //     template.innerHTML = `
// //       <style>
// //         button,
// //         span {
// //           font-size: 3rem;
// //           font-family: monospace;
// //           padding: 0 .5rem;
// //         }
  
// //         button {
// //           background: pink;
// //           color: black;
// //           border: 0;
// //           border-radius: 6px;
// //           box-shadow: 0 0 5px rgba(173, 61, 85, .5);
// //         }
  
// //         button:active {
// //           background: #ad3d55;
// //           color: white;
// //         }
// //       </style>
// //       <div>
// //         <button type="button" increment>+</button>
// //         <span></span>
// //         <button type="button" decrement>-</button>
// //       </div>
// //     `;







// import React, { useState } from "react"
// import ReactDOM from "react-dom"
// import HydrateComp from './blocks/hydrate/editor/HydrateComp'

// setTimeout( () => {

//     const divsToUpdate = document.querySelectorAll(".hydrate-comp")
    
//     console.log("divsToUpdate", divsToUpdate)
//     divsToUpdate.forEach(div => {
//         const data = JSON.parse(div.querySelector("pre").innerText)
//         console.log( 'data', data )
//         ReactDOM.render(<HydrateComp {...data} />, div)
//         div.classList.remove("hydrate-comp")
//     })
// }, 1000)