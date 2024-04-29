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



import { shuffle } from 'lodash';


// import Flex from '../../../../../components/flex/comp';
// import Variants from '../../../../../components/variants/child';
import MotionComp from '../../../../../components/motion/comp';
// import Variants from '../../../../../components/variants/comp';


// import Variants from '../../../../../components/variants/comp';

// import SlottedComponent from '../../../../frontend/slotted/comp';
// import PreactComponent from '../../../../frontend/preact/comp';


const initialColors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"];



// const list = {
//     visible: { opacity: 1 },
//     hidden: { opacity: 0 },
//   }
  
//   const item = {
//     visible: { opacity: 1, x: 0 },
//     hidden: { opacity: 0, x: -100 },
//   }


// const spring = {
//     type: "spring",
//     damping: 20,
//     stiffness: 300
//   };
  


// function shuffle(array) {
//     var currentIndex = array.length,
//       temporaryValue,
//       randomIndex;
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
//     return array;
//   }




function Edit(props) {

    // const {
    //     attributes,
    //     setAttributes,
    // } = props

    // const {
    //     content
    // } = attributes


    // const [colors, setColors] = useState(initialColors);
    const [colors, setColors] = useState(["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"]);



    return <div className="motion-wrapper">
        hallo
        </div>

        
    return <div className="motion-wrapper">
        <MotionComp 
            animate={{
                x: 0,
                backgroundColor: "#0f0",
                boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
                // position: "fixed",
                // transitionEnd: {
                // // display: "none",
                // },
            }}

            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.8 }}
            style={{ x: 100 }}
        />


        <SlottedComponent><p>backend content</p></SlottedComponent>


        <MotionComp 
        delay={2}
            animate={{
                x: 0,
                backgroundColor: "#0f0",
                boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
                // position: "fixed",
                // transitionEnd: {
                // // display: "none",
                // },
            }}

            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.8 }}
            style={{ x: 100 }}
        />
    </div>


    // return <p>hallo</p>
    // return <Variants
    //     animate={{
    //         x: 0,
    //         backgroundColor: "#0f0",
    //         boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
    //         // position: "fixed",
    //         // transitionEnd: {
    //         // // display: "none",
    //         // },
    //     }}

    //     whileHover={{ scale: 1.02 }}
    //     whileTap={{ scale: 0.8 }}
    //     style={{ x: 100 }}
    // />

    // return <Flex />

    // useEffect(() => {
    //   setTimeout(() => {
    //       console.log("shuffle")
    //       setColors(shuffle(colors))
    //     }, 1000);
    // }, [colors]);


    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("shuffle")
    //         setColors(shuffle(colors))
    //       }, 3000);
    //   }, [colors]);


    // return (
    //     <div>
    //         <button onClick={()=>{
    //             // setColors([
    //             //     ... colors,
    //             // ])

    //             const newColors = [...colors]
    //             newColors.push( "#" + ((1<<24)*Math.random() | 0).toString(16) )

    //             setColors( newColors )

    //             console.table(newColors)
    //         }}>Add Random Color</button>
    //             {/* <AnimatePresence> */}
    //         <motion.ul layout>
    //         {colors.map((background) => (
    //                 <motion.li
    //                     key={background}
    //                     layout
    //                     transition={spring}
    //                     style={{ background }}
    //                     />
    //                     ))}
    //         </motion.ul>
    //                     {/* </AnimatePresence> */}
    //     </div>
    // );


    return (
        <div>
            {/* <p>Animate</p> */}
            
        </div>
    )
}


export default compose()( Edit );
