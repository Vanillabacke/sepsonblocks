import React, {
    useLayoutEffect,
    useRef,
    useState,
} from 'react'

import { useEffect } from 'react'



import {
    motion,
    AnimatePresence,
} from 'framer-motion'




import useOnScreen from 'Hooks/useOnScreen'

import remap from 'Utils/remap'


// function recursiveCloneChildren(children) {
//     return React.Children.map(children, (child) => {

//     // if( !child.type ) return
//     // console.log("child", child.type)
//     // console.log(`typeof ${typeof child}`, child )
    
    
//     // return 
//     // return React.createElement(child.type, {}, 'My First React Code');
    
//     if (!React.isValidElement(child)) return child;
//       const props = { ...{ className: '' }, ...child.props };
//     // const props = {}
//       let childProps = {};
//     //   if (React.isValidElement(child) && !props.className.includes('exclude-node')) {
//     //     childProps = {
//     //       show: this.state.show,
//     //       toggle: this.toggle,
//     //     };
//     //   }
//       childProps.children = recursiveCloneChildren(child.props.children);
//       if( child.type === 'img') {
//         //   console.log( child.props )
//         //   return <img {... child.props} />
//         return React.createElement( 'img', {
//             src: child.props.src
//         })
//        return false
//       }
//       return React.createElement(child.type, childProps);
//     //   return React.cloneElement(child, childProps);
//     });
// }


export default function Slideshow( props ) {

    const {
        children
    } = props

    // console.log(props);


    const [childs, setChilds] = useState([])

    // const domRef = useRef( props.customDom )

    // const onScreen = useOnScreen(domRef, {
    //     steps: 100,
    // })

    // const {
    //     intersectionDelta,
    // } = onScreen

    // useEffect( () => {
    //    if( props.dataObserve) console.log(onScreen)
    // }, [onScreen])
    


    // useEffect( () => {
    //    console.log( children )
    //    setChilds( recursiveCloneChildren( children) )
    // }, [children])


    // return props.children

    // return <motion.div
    //             animate={{
    //                 x: 0,
    //                 backgroundColor: "#0f0",
    //                 boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
    //                 // position: "fixed",
    //                 // transitionEnd: {
    //                 // // display: "none",
    //                 // },
    //             }}

    //             whileHover={{ scale: 1.02 }}
    //             whileTap={{ scale: 0.8 }}
    //             style={{ x: 100 }}
    //     >
    //     {props.children}
    // </motion.div>
        

    return <AnimatePresence>
            <motion.div

                // style={{
                //     opacity: remap(intersectionDelta, [0.4, 1], [0,1]),
                // }}

                // whileInView={{ 
                //     backgroundColor: "#2b0687",
                //     opacity: 1,
                //     // scale: 1,
                //     y: 0,
                    
                // }}
                // initial={{
                //     backgroundColor: "#dadada",
                //     opacity: 0,
                //     // scale: 0.8,
                //     y: 100,
                // }}
                // transition={{
                //     duration: 0.25,
                //     // delay: 0.5
                // }}
                // exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                // initial={{ opacity: 0, y: 30 }}
                // animate={{
                //     opacity: 1,
                //     // backgroundColor: isSelected ? "#f3f3f3" : "#fff",
                //     y: 0,
                //     transition: {
                //         duration: 0.15,
                //         delay: 2
                //     }
                // }}
                // transition={{delay: 1}}
                >
            {props.children}
        </motion.div>
    </AnimatePresence>

// console.log( )
    // return <img src="https://vanillablocks/dummy/img/wildwakepark-schwandorf-bistro-cafe-kaffee-kuchen-1.jpg"/>
    // return props.children
    // return <div class="inner-slide">{props.children}</div>
    // return <div class="inner-slide">{props.children}</div>

}
