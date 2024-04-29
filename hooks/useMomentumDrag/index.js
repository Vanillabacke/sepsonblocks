
import {
    useState,
    useRef,
    useCallback,
    useEffect,
    useLayoutEffect,
} from 'react';


import { Draggable } from '../../utils/momentum';

const OPTION_DEFAULTS = {
    container: false,
    containerBounds: true,
    resizeUpdate: true,
    autoAnchor: true,
    lockAxis: {
        x: false,
        y: false,
    },

    friction: 0.01, // 0.035
    maxVelocity: 400, // 70
    restitution: -0.6, // -0.6
}

export default function useMomentumDrag(element, container, options = {}) {
    
    const [ momentum, setMomentum ] = useState(false)

    // useLayoutEffect( ()=> {
    useEffect( ()=> {
        if( element?.current && !momentum) {
            options = {
                ... OPTION_DEFAULTS,
                ... options,
                // container: container.current
            }
            if( container?.current ) options.container = container.current
            setMomentum(new Draggable(element?.current, options ))
        }


        return () => {
            momentum.destroy()
            setMomentum(false)
        }
    }, [element, container])
    // }, [element, options])


    return [ momentum ]
}