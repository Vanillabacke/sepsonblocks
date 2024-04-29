import {
    h,
    Component,
} from 'react'

// import registerCustomElement from 'preact-custom-element';
import registerCustomElement from 'Utils/react-custom-element'

// import style from './style.scss'
// import DefaultComp from './comp'

// const customTag    = 'vc-hook-tester'
// const shadowDOM    = false


const customTag    = 'vc-test-comp'
const extendTag    = false
const shadowDOM    = false




function register( tag = false ) {

    if( tag !== customTag ) return

    console.log( "lazy", customTag)
    import(/* webpackChunkName: "test-comp" */ './comp').then( ({default: DefaultComp}) => {
        registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM, 
            extends: extendTag
        });
    })
}


// export default register

export default {
    register: register,
    customTag: customTag,
}