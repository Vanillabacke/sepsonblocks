import {
    h,
    Component,
} from 'react'

// import registerCustomElement from 'preact-custom-element';
import registerCustomElement from 'Utils/react-custom-element'

// import style from './style.scss'
import DefaultComp from './comp'

// const customTag    = 'vc-hook-tester'
// const shadowDOM    = false


const customTag    = 'vc-hook-tester'
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

// function register( tag = false ) {

//     // registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM })
//     if( tag !== customTag ) return


//     registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM, 
//         extends: extendTag
//     })

//     // function TestBody(props, compRef) {
//     //     console.log("scrraaaa")
//     //     // return props.children
//     //     return [
//     //         <h2>Hallo Body</h2>,
//     //         props.children,
//     //     ]
//     //     return <body>Hallo<br />{props.children}</body>
//     // }

//     // registerCustomElement(TestBody, 'vc-body' , [], { shadow: shadowDOM, 
//     //     extends: 'body'
//     // });

//     // import(/* webpackChunkName: "hook-tester" */ './comp').then( ({default: DefaultComp}) => {
//     //     // registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM })
//     //     registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM, 
//     //         // extends: module.block.extends
//     //     });

//     // })
// }


// // function register() {
// //     registerCustomElement(comp, customTag, [], {
// //         shadow: shadowDOM,
// //         // connectedCallback: (a) =>{
// //         //     console.log("connectedCallback")
// //         // }
// //     });
// // }


// export default {
//     register: register,
//     customTag: customTag,
// }

// // export default register
// // export {
// //     // comp,
// //     // register,
// //     // load,
// //     customTag,
// //     // shadowDOM,
// // }
