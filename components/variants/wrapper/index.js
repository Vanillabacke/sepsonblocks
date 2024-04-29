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


import VariantsChild from '../child'




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





  


function recursiveCloneChildren(children) {
    return React.Children.map(children, (child) => {

    // if( !child.type ) return
    // console.log("child", child.type)
    // console.log(`typeof ${typeof child}`, child )
    
    
    // return 
    // return React.createElement(child.type, {}, 'My First React Code');
    
    if (!React.isValidElement(child)) return child;
      const props = { ...{ className: '' }, ...child.props };
    // const props = {}
      let childProps = {};
    //   if (React.isValidElement(child) && !props.className.includes('exclude-node')) {
    //     childProps = {
    //       show: this.state.show,
    //       toggle: this.toggle,
    //     };
    //   }
      childProps.children = recursiveCloneChildren(child.props.children);
      return React.createElement(child.type, childProps);
    //   return React.cloneElement(child, childProps);
    });
}



// const [content, setContent] = useState(recursiveCloneChildren(props.children))
// // console.log(React.Children.toArray(props.children))
// console.log(content, content.length)



export default function FlexWrapper(props) {


    const [children, setChildren] = useState(React.Children.toArray(props.children) )

    
    const [content, setContent] = useState(recursiveCloneChildren(props.children.props.children))
    // const [content, setContent] = useState(recursiveCloneChildren(props.children))
    // console.log(React.Children.toArray(props.children))
    // console.log(content, content.length)


    // useEffect( () => {
    //     console.log("children", children)
    // }, [children])
    useEffect( () => {
        console.log("content", content)
    }, [content])
    
    // console.log( props.children.props.children )

    return <motion.ul
        initial="hidden"
        animate="visible"
        style={{
            background: "#e9007e",
            width: 200,
            padding: "25px",
            color: "#fff",
            borderRadius: 10
        }}
        variants={list}
    >

        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
            test
            </motion.li>
        <VariantsChild variants={item} whileHover={{ scale: 1.1, opacity: 0.1 }} />

        {/* {content.map( (child, index) => {
            console.log( typeof child, child)
            if( typeof child == 'string') return child
            return <motion.li key={index} variants={item} whileHover={{ scale: 1.1 }}>
            {child}
            </motion.li>
        })} */}
       
       
        {/* {content.map( (child, index) => {
            console.log( typeof child, child)
            if( typeof child == 'string') return child

            return child
            // return <motion.li key={index} variants={item} whileHover={{ scale: 1.1 }}>
            // {child}
            // </motion.li>
        })} */}



        {/* <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          First
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Second
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Third
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Fourth
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Fifth
        </motion.li> */}



        {/* <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          First
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Second
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Third
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Fourth
        </motion.li> 
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
        Fifth
        </motion.li> */}

        {/* {props.children} */}
        {/* {content} */}
{/* 
        {React.Children.toArray(props.children).map( (child, index) => {
            console.log( "child", index)
        })} */}
        {/* {children.map( (child, index) => {
            console.log( "child", index)
        })} */}

        {/* {React.Children.map(props.children, (child, index) => {

            console.log( 'child', index )
            return <motion.li variants={item} whileHover={{ scale: 1.1 }}>
            {child}
            </motion.li>
        }) } */}
{/* 
        { Object. props.children).map( (child, index) => {
            return <motion.li variants={item} whileHover={{ scale: 1.1 }}>
                {child}
            </motion.li>
        }) } */}
        {/* {props.children.length ? props.children : <>
            <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          First
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Second
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Third
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Fourth
        </motion.li>
        </>} */}
    </motion.ul>


    return <motion.ul
        initial="hidden"
        animate="visible"
        style={{
            background: "#e9007e",
            width: 200,
            padding: "25px",
            color: "#fff",
            borderRadius: 10
        }}
        variants={list}
    >
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          First
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Second
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Third
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Fourth
        </motion.li>
        <motion.li variants={item} whileHover={{ scale: 1.1 }}>
          Fifth
        </motion.li>
    </motion.ul>

}
