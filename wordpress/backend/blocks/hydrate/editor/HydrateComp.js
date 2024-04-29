
// import React, {
//     useEffect,
//     useState,
// } from 'react'


// const {
//     Component,
//     Fragment,

//     useRef,
//     useState,
//     useEffect,
// } = wp.element;

import {
    useState,
} from 'react'

// import {
//     AnimatePresence,
//     motion
// } from "framer-motion";

import { isEqual } from 'lodash';

import {
    __unstableMotion as motion,
    __unstableAnimatePresence as AnimatePresence,
} from '@wordpress/components';

import { Animate } from '@wordpress/components';

export default function HydrateComp( props ) {

    const [counter, setCounter] = useState(0)

    console.log( props )
    // const {
    //     attributes
    // } = props

    
    
    
    // <AnimatePresence></AnimatePresence>
    // <AnimatePresence>
  return (
        <motion.div
            // initial={{ opacity: 0 }}
            transition={{
                duration: 0.5,
                // repeat: Infinity
                // delay: (props?.delay || 0 ) * 1,
            }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            // animate={{
            //     opacity: 1,
            //     x: 0,
            //     backgroundColor: "#0f0",
            //     boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
            //     // position: "fixed",
            //     // transitionEnd: {
            //     // // display: "none",
            //     // },
            // }}

            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.8 }}
            // style={{ x: 100 }}
         >
            <h1>HydrateComp was geht Animation Production Fancy</h1>
            {props.content || 'no props set'}
            <button onClick={() => setCounter(counter + 1)}>add</button> {counter}
        </motion.div>
  )
//   {/* </AnimatePresence> */}

//   return (  <Animate type="slide-in" options={ { origin: 'top' } }>
//         { ( { className } ) => (<div>
//                 <h1>HydrateComp was geht</h1>
//                 {props.content || 'no props set'}
//                 <button onClick={() => setCounter(counter + 1)}>add</button> {counter}
//             </div>) }
// 	</Animate>)
  
  
  return (  <div>
        <h1>HydrateComp was geht</h1>
        {props.content || 'no props set'}
        <button onClick={() => setCounter(counter + 1)}>add</button> {counter}
    </div>)
}


// export default function HydrateComp(props) {

//     const [textState, setTextState] = useState(props.text || 'undefined text state')

//     useEffect(() => {
//         if (!isEqual(props.text, textState)) {
//             setTextState(props.text)
//         }
//       }, [props.text])
    
//       // <div>
//     return (
//         <h1>HydrateComp</h1>
//         )
//         // {/* </div> */}
//   // <pre>{textState}</pre>
// }
