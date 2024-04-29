import {
    h,
    Component,
} from 'react'

// import registerCustomElement from 'preact-custom-element';
import registerCustomElement from 'Utils/react-custom-element'

import DefaultComp from './comp'


const customTag    = 'vc-modal'
const extendTag    = false
const shadowDOM    = false




function register( tag = false ) {

    // if( tag !== customTag ) return

    // import(/* webpackChunkName: "vc-modal" */ './comp').then( ({default: DefaultComp}) => {
        // registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM })
        registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM, 
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

// export default {
//     register: register,
//     customTag: customTag,
// }
