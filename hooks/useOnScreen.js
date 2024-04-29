import {useState, useEffect} from 'react';

import rangeMap from 'Utils/rangeMap'

const DEFAULT_OPTIONS = {
    root: null,
    rootMargin: "0px",
    // entries: false,
    // firstEntry: false,
    // threshold: Array.from({length: 101}, (_, i) => (i) / 100 ), // generates an array 0.0, 0.01, 0.02, ... 0.98, 0.99, 1.00
    steps: 10,
    entry: false,
}

function useOnScreen(ref, options) {

    options = {
        ... DEFAULT_OPTIONS,
        ... options,
    }

    const {
        root,
        rootMargin,
        // threshold,
        steps,
        // entries,
        // firstEntry,
        entry: returnEntry,
    } = options

    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false);
     
    const [entry, setEntry] = useState(false);
    // const [visibleX, setVisibleX] = useState(0)
    // const [visibleY, setVisibleY] = useState(0)
    const [visibleSum, setVisibleSum] = useState(0)
    const [visible, setVisible] = useState(0)


    const [delta, setDelta] = useState(0)

    // const [visible, setVisible] = useState({
    //     x: 0,
    //     y: 0,
    // });

    useEffect( () => {
        // const mapVal = rangeMap(delta * 2, -1, 1, 0, 100) || 0
        // setVisible( (delta > 0 ? mapVal : -mapVal) / 100 )
        // const mapVal = rangeMap(delta * 2, -1, 1, 0, 1) || 0
        const mapVal = rangeMap(delta, -.5, .5, 0, 1) || 0
        setVisible( mapVal )
        setVisibleSum( delta > 0 ? mapVal : -mapVal )
    }, [delta])
    
    useEffect(() => {
        const thresholdSteps = Array.from({length: (steps + 1)}, (_, i) => (i) / steps )
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                setIntersecting(entry.isIntersecting);
            //   if(returnEntry) {
                    setEntry(entry)

                    if (entry.boundingClientRect.top > 0) {
                        // below
                        setDelta(entry.intersectionRatio)
                    }
                    if (entry.boundingClientRect.top < 0) {
                        // above
                        setDelta(-entry.intersectionRatio)
                    }

            //   }
            },
            {
                root: root,
                rootMargin: rootMargin,
                threshold: thresholdSteps,
            }
        )
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        }

    }, []) // Empty array ensures that effect is only run on mount and unmount

    // if( returnEntry )
    return {
        isIntersecting,
        intersection: entry,
        intersectionDelta: delta,
        visibleDelta: visible,
        visibleDeltaSum: visibleSum,
    }
    return isIntersecting;
}

export default useOnScreen