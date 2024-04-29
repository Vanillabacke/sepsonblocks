import React,  {
    useRef,
    useEffect,
    useState,
    // useCallback,
    // useContext,
    Component,
} from 'react'


// import {
//     motion,
//     AnimatePresence,

//     Reorder,
// } from "framer-motion";


import {
    motion,
    AnimatePresence,

    Reorder,
    useDragControls,
} from "framer-motion";



import PropTypes from 'prop-types'


import './style.scss'



const list = {
    visible: {
      opacity: 1,
      width: "300px",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.4
      }
    },
    hidden: {
      opacity: 0,
      width: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.4,
        duration: 0.5
      }
    }
  };



const item = {
    visible: {
      opacity: 1,
      x: 0
    },
    hidden: {
      opacity: 0,
      x: -100
    }
  };



  
// class MotionChild extends motion.div {
class MotionChild extends Component {

    constructor() {
        super()
    }
    
    render() {
        return (
            <motion.div  variants={item} whileHover={{ scale: 1.1 }}> textInComponent </motion.div>
        )
    }
}
        
export default MotionChild

// const Component = React.forwardRef((props, ref) => {
//     // console.log("test")
//     // return 'sheesh'
//     // <div ref={ref}>sheesh</div>
//     return <div ref={ref}
    
//     // animate={{
//     //     x: 0,
//     //     backgroundColor: "#0f0",
//     //     boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
//     //     // position: "fixed",
//     //     // transitionEnd: {
//     //     // // display: "none",
//     //     // },
//     // }}
    
//     >sheesh</div>


//     // <Variants
//     //     animate={{
//     //         x: 0,
//     //         backgroundColor: "#0f0",
//     //         boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
//     //         // position: "fixed",
//     //         // transitionEnd: {
//     //         // // display: "none",
//     //         // },
//     //     }}

//     //     whileHover={{ scale: 1.02 }}
//     //     whileTap={{ scale: 0.8 }}
//     //     style={{ x: 100 }}
//     // />
// })



// // Component.propTypes = {


// //     // animate={{
// //     //     x: 0,
// //     //     backgroundColor: "#0f0",
// //     //     boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
// //     //     // position: "fixed",
// //     //     // transitionEnd: {
// //     //     // // display: "none",
// //     //     // },
// //     // }}

// //     // whileHover={{ scale: 1.02 }}
// //     whileHover:{ scale: 1.02 }
// //     // whileTap={{ scale: 0.8 }}
// //     // style={{ x: 100 }}
    
// // }

// const MotionComponent = motion(Component,{
//     whileHover:{ scale: 1.02 }
//     //     animate={{
//     //     x: 0,
//     //     backgroundColor: "#0f0",
//     //     boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
//     //     // position: "fixed",
//     //     // transitionEnd: {
//     //     // // display: "none",
//     //     // },
//     // }}

//     // whileHover={{ scale: 1.02 }}
//     // whileTap={{ scale: 0.8 }}
//     // style={{ x: 100 }}
// })


// // MotionComponent.propTypes = {


//     // animate={{
//     //     x: 0,
//     //     backgroundColor: "#0f0",
//     //     boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
//     //     // position: "fixed",
//     //     // transitionEnd: {
//     //     // // display: "none",
//     //     // },
//     // }}

// //     // whileHover={{ scale: 1.02 }}
// //     whileHover:{ scale: 1.02 }
// //     // whileTap={{ scale: 0.8 }}
// //     // style={{ x: 100 }}
// //     // style:{ opacity: 0.4 }
// // }

// export default MotionComponent



// const Child = ( props, ref) => {
//     return <div ref={ref}>Sheesh Motion</div>
// }

// const MotionChild = motion(Child)
// export default MotionChild 
// export default React.forwardRef( MotionChild )
// export default React.forwardRef(Child)





// // export default function 
// const VariantsChild = (props, ref) => {
//     // const y = useMotionValue(0);
//     // const boxShadow = useRaisedShadow(y);

//     console.log( '-', props )
//     console.log( '-', ref )

//     const {
//         children,
//         item,
//         content,
//         draggingCallback,
//         isSelected,
//         onClick,
//     } = props

//     const controls = useDragControls()

//     // const ref = useRef()


//     // return <Reorder.Item
//     //     as="div"
//     //     value={item}
//     // >
//     //     {children || 'hallo dragger'}
//     // </Reorder.Item>

//     // return <motion.li variants={item} whileHover={{ scale: 1.1 }}>
//     //     {children || 'hallo dragger'}
//     //     </motion.li>
        
//     // return (children)
//     // return ({children || 'hallo dragger'})
//     // return <motion.div  variants={item} whileHover={{ scale: 1.1 }}>
//     //     {children || 'hallo dragger'}
//     //     </motion.div>
//     return <div ref={ref}>
//         {children || 'hallo dragger'}
//         </div>
        
//     return (
//         <Reorder.Item
//             as="div"
//             value={item}
//             id={item}

//             dragListener={false}
//             dragControls={controls}

//             whileDrag={{ backgroundColor: "#e3e3e3", zIndex:99, opacity:0.5, userSelect: 'none' }}


//             exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{
//                 opacity: 1,
//                 backgroundColor: isSelected ? "#f3f3f3" : "#fff",
//                 y: 0,
//                 transition: { duration: 0.15 }
//             }}


//             onPointerDown={onClick}
//         >

//             <div
//                 className="reorder-handle"
//                 onPointerDown={(e) => {
//                     draggingCallback(true)
//                     controls.start(e)
//                 }}
//                 onPointerUp={(e) => {
//                     draggingCallback(false)
//                 }}
//             />
//             {/* <span>{item}</span> */}
//             {/* { content } */}
//             {/* { item } */}

//             hallo dragger
//             {/* { childrenContent[item] } */}

//         </Reorder.Item>
//     )
// }

// const Component = React.forwardRef((props, ref) => {
//     console.log( props )
//     console.log( ref )
//     // return <div>hallo</div>
//     // return <VariantsChild {...props} style={{opacity: 0.2}}/>
//     // return <VariantsChild variants={item} whileHover={{ scale: 1.1 }} {...props} />
//     // return <VariantsChild variants={item} whileHover={{ scale: 1.1, opacity: 0.1 }}/>


//     return <div ref={ref} >
//     {'hallo dragger'}
//     </div>
//     // return <VariantsChild ref={ref} variants={item} whileHover={{ scale: 1.1 }} {...props} />
// })

// // const MotionComponent = motion(Component, { forwardMotionProps: true })
// const MotionComponent = motion(Component)
// // export default MotionComponent
// export default MotionComponent
// // export default VariantsChild

// // export default motion(React.forwardRef(VariantsChild))
// // export default motion(VariantsChild)
// // export default VariantsChild
// // export default motion(VariantsChild, {forwardMotionProps: true})
