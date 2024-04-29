import React, {
    h,
    Component,
} from 'react'

import {
    useRef,
    useEffect,
    useState,
    // useCallback,
    // useContext,
} from 'react'


import {
    motion,
    AnimatePresence,

    Reorder,
} from "framer-motion";



import './style.scss'




import { shuffle } from 'lodash'
import FlexWrapper from './wrapper';








// export function FlexChild( props ) {


//     return <FlexWrapper />

//     const {
//         item,
//         onClick,
//         onRemove,
//         isSelected,
//         key,
//     } = props


//     return (
//         <Reorder.Item
//             value={item}
//             //   id={item.label}
//             id={key}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{
//                 opacity: 1,
//                 backgroundColor: isSelected ? "#f3f3f3" : "#fff",
//                 y: 0,
//                 transition: { duration: 0.15 }
//             }}
//             exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
//             whileDrag={{ backgroundColor: "#e3e3e3" }}
//             className={isSelected ? "selected" : ""}
//             onPointerDown={onClick}
//         >
//             <h4>
//                 FlexChild
//             </h4>
//             <div>{props.children}</div>
//         </Reorder.Item>
//     )

//   return (
//     <AnimatePresence>
//         <motion.div
//             leyout
//             className="flex-child"
//             initial={{ 
//                 opacity: 0,
//                 // width: 0,
//                 position: 'absolute',
//             }}
//             animate={{ 
//                 opacity: 1,
//                 // width: 'initial',
//                 position: 'relative',
//             }}
//             exit={{ 
//                 opacity: 0,
//                 // width: 0,
//                 position: 'absolute',
//             }}
//         >
//             <h4>
//                 FlexChild
//             </h4>
//             <div>{props.children}</div>
//         </motion.div>
//     </AnimatePresence>
//   )
// }


// const initialLayout = [
//     <FlexChild key="First">First Flex</FlexChild>,
//     <FlexChild key="Second">Second Flex</FlexChild>,
// ]

export default (props, compRef) => {

    // const {
    //     dataKey
    // } = props

    const ref = useRef(null);




    // return <FlexWrapper />
    return <FlexWrapper>
        {props.children}
    </FlexWrapper>



    const [colors, setColors] = useState(["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"]);


    const [columns, setColumns] = useState(initialLayout)


    // const [tabs, setTabs] = useState(initialTabs);
    const [selectedTab, setSelectedTab] = useState(columns[0]);

    const addChild = () => {
        setColumns( [
            ...columns,
            <FlexChild key="Third">Third Flex</FlexChild>
        ])
    } 

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("shuffle")
    //         setColors(shuffle(colors))
    //       }, 3000);
    //   }, [colors]);

    // useEffect(() => {
    //     // ref
    // }, [ref])


    // return (<div>

    //     <button onClick={addChild}>
    //         Add
    //     </button>


    //     <Reorder.Group
    //       as="div"
    //       axis="x,y"
    //     //   onReorder={setTabs}
    //       onReorder={setColumns}
    //       className="tabs flex-wrapper"
    //       values={columns}
    //     >
    //         <AnimatePresence initial={false}>
    //             {/* {columns}*/}

    //             {columns.map((col) => (
    //                 <FlexChild
    //                     key={col.label}
    //                     item={col}
    //                     isSelected={selectedTab === col}
    //                     onClick={() => setSelectedTab(col)}
    //                     onRemove={() => remove(col)}
    //                 >
    //                     {col.children}
    //                 </FlexChild>
    //             ))}
                
    //         </AnimatePresence>
    //     </Reorder.Group>

    // </div>)
    // return (<div>

    //     <button onClick={addChild}>
    //         Add
    //     </button>

    //     <motion.div layout className="flex-wrapper">
        
    //         {columns}

    //     </motion.div>

    // </div>)
    


     return (
        <div>
            <button onClick={()=>{
                // setColors([
                //     ... colors,
                // ])

                const newColors = [...colors]
                newColors.push( "#" + ((1<<24)*Math.random() | 0).toString(16) )

                setColors( newColors )

                console.table(newColors)
            }}>Add Random Flex Color</button>
                {/* <AnimatePresence> */}
            <motion.ul layout>
            {colors.map((background) => (
                    <motion.li
                        key={background}
                        layout
                        transition={spring}
                        style={{ background }}
                        />
                        ))}
            </motion.ul>
                        {/* </AnimatePresence> */}
        </div>
    );

    //  return <div className="flex" ref={ref}>
    //      <h4>Flex</h4>
    //     {props.children}
    // </div>

}