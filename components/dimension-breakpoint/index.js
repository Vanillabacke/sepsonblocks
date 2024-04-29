import {
    h,
    Component,
} from 'react'

// import registerCustomElement from 'preact-custom-element';
// import registerCustomElement from 'Utils/preact-custom-element'
import registerCustomElement from 'Utils/react-custom-element'



// import React from 'react'
// import ReactDOM from 'react-dom'
// // import ReactWebComponent from 'react-web-component'
// import reactToWebComponent from "react-to-webcomponent"


// import style from './style.scss'
import DefaultComp from './comp'

const customTag    = 'vc-dimension'
// const extendTag    = 'nav' //false
const extendTag    = false
const shadowDOM    = false




function register( tag = false ) {
    
    console.log( 'register' )

    // if( tag !== customTag ) return

    // import(/* webpackChunkName: "vc-modal" */ './comp').then( ({default: DefaultComp}) => {
        // registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM })
        registerCustomElement(DefaultComp, customTag , [], {
            shadow: shadowDOM, 
            extends: extendTag
        });
    // })
}


export default register
// export {
//     NavigationContentContext,
//     OverflowContext,
//     MobileOverflowContext,
//     DesktopOverflowContext,
// }

