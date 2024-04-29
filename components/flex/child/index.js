import React,  {
    useRef,
    useEffect,
    useState,
    // useCallback,
    // useContext,
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




import './style.scss'




export default function ({ children, item, content, draggingCallback, isSelected, onClick }) {
    // const y = useMotionValue(0);
    // const boxShadow = useRaisedShadow(y);

    const controls = useDragControls()


    return <Reorder.Item
        as="div"
        value={item}
    >
        {children || 'hallo dragger'}
    </Reorder.Item>

    return <div>
        {children || 'hallo dragger'}
        </div>
        
    return (
        <Reorder.Item
            as="div"
            value={item}
            id={item}

            dragListener={false}
            dragControls={controls}

            whileDrag={{ backgroundColor: "#e3e3e3", zIndex:99, opacity:0.5, userSelect: 'none' }}


            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: 1,
                backgroundColor: isSelected ? "#f3f3f3" : "#fff",
                y: 0,
                transition: { duration: 0.15 }
            }}


            onPointerDown={onClick}
        >

            <div
                className="reorder-handle"
                onPointerDown={(e) => {
                    draggingCallback(true)
                    controls.start(e)
                }}
                onPointerUp={(e) => {
                    draggingCallback(false)
                }}
            />
            {/* <span>{item}</span> */}
            {/* { content } */}
            {/* { item } */}

            hallo dragger
            {/* { childrenContent[item] } */}

        </Reorder.Item>
    )
}




// export default function FlexChild(props) {
//     const {
//         value,
//         onClick,
//         onRemove,
//         isSelected,
//         key,

//         item,
//     } = props



//     // return (
//     //     <Reorder.Item value={item} id={item} >
//     //       <span>{item}</span>
//     //     </Reorder.Item>
//     //   );
//     return (
//         <Reorder.Item value={value} id={value} >
//           <span>{value.content}</span>
//         </Reorder.Item>
//       );



//     // return (
//     //     <Reorder.Item
//     //         as="div"
//     //         value={value}
//     //         //   id={item.label}
//     //         // id={key}
//     //         initial={{ opacity: 0, y: 30 }}
//     //         animate={{
//     //             opacity: 1,
//     //             backgroundColor: isSelected ? "#f3f3f3" : "#fff",
//     //             y: 0,
//     //             transition: { duration: 0.15 }
//     //         }}
//     //         exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
//     //         whileDrag={{ backgroundColor: "#e3e3e3", zIndex:99, opacity:0.5 }}
//     //         className={isSelected ? "selected" : ""}
//     //         onPointerDown={onClick}
//     //     >
//     //         <motion.div layout>
//     //             <h4>
//     //                 FlexChild
//     //             </h4>
//     //             <div>{props.children}</div>
//     //         </motion.div>
//     //     </Reorder.Item>
//     // )
// }
