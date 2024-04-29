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




// import { shuffle } from 'lodash'
import VariantsWrapper from './wrapper';




export default (props, compRef) => {
// 
    // let children = React.Children.toArray(props.children);

    // const [content, setContent] = useState(recursiveCloneChildren(props.children))
    // // console.log(React.Children.toArray(props.children))
    // console.log(content, content.length)

    // return (<div>Variants</div>)
    // return <VariantsWrapper />
    return <VariantsWrapper>
        {props.children}
        {/* {content} */}
    </VariantsWrapper>
}