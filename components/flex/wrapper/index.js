import React, {
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
    useDragControls,
} from "framer-motion";


import './style.scss'


import FlexChild from '../child'


const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300
}



function removeItem([...arr] , item ) {
    const index = arr.indexOf(item);
    index > -1 && arr.splice(index, 1);
    return arr;
}


function closestItem(arr, item) {
    const index = arr.indexOf(item);
    
    if (index === -1) {
        return arr[0];
    } else if (index === arr.length - 1) {
        return arr[arr.length - 2];
    } else {
        return arr[index + 1];
    }
}



// const initialChildren = [
//     {
//         content: (<><h4>First Flex</h4></>)
//     },
//     {
//         content: (<><h4>Second Flex</h4></>)
//     },
//     {
//         content: (<><h4>Third Flex</h4></>)
//     },
// ]

// const initialChildren = [
//     (<><h4>First Flex</h4></>),
//     (<><h4>Second Flex</h4></>),
//     (<><h4>Third Flex</h4></>),
// ]


// const initialChildren = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"]

export function TestComp(props) {
  return (
    <div>TestComp {props.data}</div>
  )
}



const initialChildren = [
    0, 1, 2,
//     <TestComp data="1"/>,
//     <TestComp data="2"/>,
//     <TestComp data="3"/>,
]
// const initialChildren = [
const childrenContent = [
    // <div>Sheesh 1</div>,
    // <div>Sheesh 2</div>,
    // <div>Sheesh 3</div>,

    <TestComp data="1"/>,
    <TestComp data="2"/>,
    <TestComp data="3"/>,
]


// const Item = ({ item, content, draggingCallback, isSelected, onClick }) => {
//     // const y = useMotionValue(0);
//     // const boxShadow = useRaisedShadow(y);

//     const controls = useDragControls()
  
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
//             { childrenContent[item] }

//         </Reorder.Item>
//     )
// }


export default function FlexWrapper(props) {

    const [children, setChildren] = useState(initialChildren)

    const [selectedChild, setSelectedChild] = useState(children[0]);


    const [isDragging, setIsDragging] = useState(false)

    useEffect( () => {
        console.log("is Dragging", isDragging)
    }, [isDragging])



    // return <div className="flex-wrapper">
    //     {props.children}
    // </div>

    return (<>
            <Reorder.Group
                axis="x"
                as="div"
                className="flex-wrapper"
                onReorder={setChildren}
                style={{
                    userSelect: isDragging ? 'none' : 'initial'
                }}
                values={children}
            >

                {children.map((item, index) => (
                        <FlexChild
                            key={item}
                            item={item}
                            index={index}
                            content={childrenContent[index]}
                            draggingCallback={setIsDragging}

                            isSelected={selectedChild === item}
                            onClick={() => setSelectedChild(item)}
                        />
                ))}



                {/* {props.children} */}
            {/* {children.map(( item, index) => (
                <FlexChild
                    key={item}
                    item={item}
                    index={index}
                    content={childrenContent[index]}
                    draggingCallback={setIsDragging}

                    isSelected={selectedChild === item}
                    onClick={() => setSelectedChild(item)}
                />
            ))} */}
            {/* {children.map((item, index) => (
                <Item
                    key={item}
                    item={item}
                    index={index}
                    content={childrenContent[index]}
                    draggingCallback={setIsDragging}

                    isSelected={selectedChild === item}
                    onClick={() => setSelectedChild(item)}
                />
            ))} */}
            </Reorder.Group>
        </>
    )


    // return (
    //     <Reorder.Group
    //         as="div"
    //         axis="x"
    //         //   onReorder={setTabs}
    //         //   onReorder={setColumns}
    //         onReorder={setChildren}
    //         className="flex-wrapper"
    //         values={children}
    //     >
    //         <AnimatePresence initial={false}>
    //             {children.map( (child, index) =>{
    //                 return <FlexChild
    //                     key={child}
    //                     value={child}

    //                     // isSelected={selectedChild === child}
    //                     // onClick={() => setSelectedChild(child)}
    //                     // onRemove={() => remove(item)}
    //                 >
    //                     {child.content}
    //                 </FlexChild>
    //             })}
    //         </AnimatePresence>
    //     </Reorder.Group>
    // )
}
