import {
    h,
} from 'react'

import {
    useRef,
    useEffect,
    useState,
    // useLayoutEffect,
} from 'react'

import useStateRef  from 'Hooks/useStateRef'

import classname from 'classname';






const defaultProps = {
    children: null,
    targetKey: 'ddc',
    onDragEnter: () => {},
    onDragLeave: () => {},
    onHit: () => () => {},
    onDrop: () => () => {},
    
    onMove: () => () => {},
    
    dropData: {},
    highlightClassName: 'highlighted',
    render: null,

    // onDragOver: () => {},
};





function useDragger(ref, options = {} ) {

    options = {
        ... defaultProps,
        ... options,
    }



    const that = this

    const {
        children,
        targetKey,
        onDragEnter,
        onDragLeave,
        onHit,
        onMove,
        onDrop,
        dropData,
        highlightClassName,
        render,
        // onDragOver,
    } = options


    const [dragContainer, setDragContainer] = useState()
    const [isMounted, setMounted]       = useState(false)

  

    const [containerHeight, setContainerHeight] = useState(false)
    const [containerWidth, setContainerWidth] = useState(false)
    const [initHeight, setInitHeight] = useState(false)
    const [initWidth, setInitWidth] = useState(false)


    const [highlighted, setHighlighted]  = useStateRef(false)
    const [highlight, setHighlight]  = useState(false)
    // const highlightClassName = useRef('')


    const [targetKeys, setTargetKeys] = useState([])



    useEffect( () => {

        if( typeof targetKey != 'string' ) return
        // console.log(" ")
        // // console.log("hook: dataKey ", options.targetKey)
        // console.log("hook: dataKey ",targetKey.split(','))
        // // console.log("hook: highlightClassName ", highlightClassName)
        // console.log(" ")

        setTargetKeys( targetKey.split(',') )
    },[targetKey])


    useEffect( () => {
        targetKeys.forEach( (k) => {
            // console.log(k)
            if (dragContainer) {
                dragContainer.addEventListener(`${k}DragEnter`, handleDragEnter, false);
                dragContainer.addEventListener(`${k}DragLeave`, handleDragLeave, false);
                dragContainer.addEventListener(`${k}Drop`, handleDrop, false);
            }
        })
    },[targetKeys])



    
    
    // useEffect( () => {
    //     console.log(" ")
    //     console.log("hook: highlighted ", highlighted)
    //     console.log("hook: highlightClassName ", highlightClassName)
    //     console.log(" ")
    // },[highlighted])






    useEffect(() => {
        if (ref.current) {
            // if (!(ref.current.parentNode instanceof HTMLElement) && !!ref.current.parentNode ?.host) { // shadowDom
            if (!(ref.current.parentNode instanceof HTMLElement) && !!ref.current.parentNode?.host) { // shadowDom
                setDragContainer(ref.current.parentNode.host)
            } else {
                setDragContainer((options.parent ? ref.current.parentNode : ref.current))
            }
        }

        return (dragContainer) => {
            // onUnmount
            console.log("removed", dragContainer)
        }
    }, [ref])



    useEffect(() => {
        // console.log("dragg will removed", dragContainer)

        if (dragContainer) {
            // dragContainer.current
            setMounted(true)



            dragContainer.addEventListener(`${targetKey}DragEnter`, handleDragEnter, false);
            dragContainer.addEventListener(`${targetKey}DragLeave`, handleDragLeave, false);
            dragContainer.addEventListener(`${targetKey}Drop`, handleDrop, false);
            
            
            dragContainer.addEventListener('mousemove', handleMove, {passive: false});
            dragContainer.addEventListener('touchmove', handleMove, {passive: false});
    
    
            if( dragContainer.offsetHeight) {

                if( isMounted ) {
                    setContainerHeight(dragContainer.offsetHeight)
                    setContainerWidth(dragContainer.offsetWidth)
                    setInitHeight(dragContainer.offsetHeight)
                    setInitWidth(dragContainer.offsetWidth)
                }
                // isMounted && this.setState({
                //     containerHeight: this.elem.offsetHeight,
                //     containerWidth: this.elem.offsetWidth,
                //     initHeight: this.elem.offsetHeight,
                //     initWidth: this.elem.offsetWidth,
                // })
            }



        } else  {
            setMounted(false)
        }
    }, [dragContainer])




    const createEvent = (eventName, eventData) =>{
        // utility to create an event
        let e;
        if (typeof window.CustomEvent !== 'function') {
            // we are in IE 11 and must use old-style method of creating event
            e = document.createEvent('CustomEvent');
            e.initCustomEvent(eventName, true, true, {});
        } else {
            e = new CustomEvent(eventName, { bubbles: true, cancelable: true });
        }
        Object.assign(e, eventData);
        return e;
    }




    const handleDrop = (e) => {

        
        // tell the drop source about the drop, then do the callback
        const evt = createEvent(
            `${targetKey}Dropped`,
            {
                dragData: e.dragData,
                dropElem: dragContainer,
                dropData: dropData,
            },
        );
        // e.containerElem.dispatchEvent(evt);
        e.dragContainer.dispatchEvent(evt);
        // console.log("drop", e)
        console.log("drop", evt)
        // onHit(e);
        onDrop(e);
        // isMounted && this.setState({highlighted: false})
        // if( isMounted ) highlighted.current = false 
        // if( isMounted ) setHighlighted(false) 
        // if( isMounted ) 
        setHighlight(false) 
    }

    const handleDragEnter = (e) => {
        const _e = e;
        console.log("hit")

        const evt = createEvent(
            `${targetKey}Hit`,
            {
                dragData: e.dragData,
                dropElem: dragContainer,
                dropData: dropData,
            },
        );
        e.dragContainer.dispatchEvent(evt);
        
        onHit(e);

        // isMounted && highlightClassName && this.setState({highlighted: true})
        // if(isMounted && highlightClassName) highlighted.current = true
        // if(isMounted && highlightClassName) setHighlighted(true)
        // if(isMounted && highlightClassName) setHighlighted(true)
        // if(isMounted && highlightClassName)
        setHighlight(true)
        onDragEnter(_e);
    }

    const handleDragLeave = (e) => {
        const _e = e;
        // this._isMounted && this.props.highlightClassName && this.setState({highlighted: false})
        // if(isMounted && highlightClassName) highlighted.current = false
        // if(isMounted && highlightClassName) setHighlighted(false)
        // if(isMounted && highlightClassName)
        setHighlight(false)
        onDragLeave(_e);
    }


    const handleMove = (e) => {
        onMove && onMove(e)
    }

  


    return {
        // test,
        // highlighted: highlighted.current,
        highlight: highlight,
        highlightClassName: highlighted.current ? highlightClassName : '',
        // displayMode,
        // ghostContent,
        // ghostStyles,
        // ghost,
        targetKeys: targetKeys,
    }


}

export default useDragger


