import React, {
    useLayoutEffect,
    useRef,
    useState,
} from 'react'

import { useEffect } from 'react'



import {
    motion,
    AnimatePresence ,
} from 'framer-motion'

import './style.scss'






export default function MotionComp( props ) {

    
    return <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                transition={{
                    duration: 2,
                    // repeat: Infinity
                    delay: (props?.delay || 0 ) * 1,
                }}
                // animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                animate={{
                    opacity: 1,
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
            >
                motioncomp
            </motion.div>
        </AnimatePresence>
}

