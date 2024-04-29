import {
    h,
    Component,
} from 'react'

// import registerCustomElement from 'preact-custom-element';
import registerCustomElement from 'Utils/react-custom-element'

// import style from './style.scss'
import DefaultComp from './comp'

const customTag    = 'vc-dragger'
const shadowDOM    = false
const observedProps = ['data-key']



function register( tag = false ) {

    // registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM })
    if( tag !== customTag ) return


    // function TestBody(props, compRef) {
    //     console.log("scrraaaa")
    //     // return props.children
    //     return [
    //         <h2>Hallo Body</h2>,
    //         props.children,
    //     ]
    //     return <body>Hallo<br />{props.children}</body>
    // }

    // registerCustomElement(TestBody, 'vc-body' , [], { shadow: shadowDOM, 
    //     extends: 'body'
    // });

    import(/* webpackChunkName: "hook-tester" */ './comp').then( ({default: DefaultComp}) => {
        // registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM })
        registerCustomElement(DefaultComp, customTag , observedProps, { shadow: shadowDOM, 
            // extends: module.block.extends
        });

    })
}


// function register() {
//     registerCustomElement(comp, customTag, [], {
//         shadow: shadowDOM,
//         // connectedCallback: (a) =>{
//         //     console.log("connectedCallback")
//         // }
//     });
// }


export default {
    register: register,
    customTag: customTag,
}

// export default register
// export {
//     // comp,
//     // register,
//     // load,
//     customTag,
//     // shadowDOM,
// }
