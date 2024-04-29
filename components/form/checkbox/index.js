import {
    h,
    Component,
} from 'react'

// import registerCustomElement from 'preact-custom-element';
import registerCustomElement from 'Utils/react-custom-element'

// import style from './style.scss'
import DefaultComp from './comp'
// import Context from './context'
// import NavigationContentContext,
// {
//     OverflowContext,
//     MobileOverflowContext,
//     DesktopOverflowContext,
// } from './context'

const customTag    = 'vc-checkbox'
const extendTag    = 'input'
const shadowDOM    = false




function register( tag = false ) {

    // if( tag !== customTag ) return

    // import(/* webpackChunkName: "hook-tester" */ './comp').then( ({default: DefaultComp}) => {
        // registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM })
        registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM, 
            extends: extendTag
        });

        // registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM, 
        //     // extends: extendTag
        // });
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
