/**
 * WordPress dependencies
 */
 const { __ } = wp.i18n;
 const {
     Component,
     Fragment,

     useRef,
     useState,
     useEffect,
} = wp.element;

const { 
    compose,
    //  withState 
} = wp.compose;



const {
    InspectorControls,
    ResponsiveBlockControl,
} = wp.editor


const {
    __unstableMotion: motion,
    __unstableAnimatePresence: AnimatePresence,
} = wp.components

// import {
//     // Popover, 
//     __unstableMotion as motion
// } from '@wordpress/components';



// import {motion} from "framer-motion";


import './editor.scss'
import HydrateComp from './HydrateComp';


const {
    RichText,
} = wp.blockEditor



// import MotionComp from '../../../../../components/motion/comp';



function Edit(props) {

    const {
        attributes,
        setAttributes,
    } = props

    const {
        content
    } = attributes



    return <div className="motion-wrapper">
        hallo
        {/* <RichText
            tagName="p"
            value={props.attributes.content}
            onChange={ (value) => { setAttributes({'content': content}) } }
            placeholder={'Add text…'}
        />*/}


        <RichText
          tagName='h5'
          value={props.attributes.content}
          onChange={(newVal) => {
            console.log({content: newVal})
            setAttributes({content: newVal})
          }} 
          placeholder="Heading Goes Here"
        />
        {/* <HydrateComp {... props}/> */}
        {/* <HydrateComp text={props.attributes.content}/> */}
        <div className="hydrate-wrapper"><HydrateComp content={attributes.content}/></div>
        {/* <div className="hydrate-wrapper"><HydrateComp text={props.attributes.content}/></div> */}
    </div>

    
}


export default compose()( Edit );
