import {
    h,
    Component,
} from 'react'

// import registerCustomElement from 'preact-custom-element';
import registerCustomElement from 'Utils/react-custom-element'

// import style from './style.scss'
import DefaultComp from './comp'

const customTag    = 'vc-motion'
const extendTag    = false
const shadowDOM    = false




function register( tag = false ) {

    registerCustomElement(DefaultComp, customTag , [], { shadow: shadowDOM, 
        extends: extendTag
    });
        
}


export default register
