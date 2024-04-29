import {
    h,
  } from 'react'
  
  import {
    useRef,
    useEffect,
    useState,
  } from 'react'
  
  
function useMutationObserver(ref, options = {
    parent: false,
    childList: true,
    attributes: true,

    // Omit (or set to false) to observe only changes to the parent node
    subtree: true
      
    }) {
  
    //   const [size, setSize] = useState()
    //   const [width, setWidth] = useState()
    //   const [height, setHeight] = useState()
      const [mutations, setMutations] = useState()
        const [mutationContainer, setMutationContainer] = useState()
  
        const mutationObserver = useRef(new MutationObserver((mutationList) => {

            setMutations(mutationList)
        //   const {width, height} = entries[0].contentRect
        //   setWidth(width)
        //   setHeight(height)
        }))
  
        useEffect(() => {
            if (ref.current) {
                if (!(ref.current.parentNode instanceof HTMLElement) && !!ref.current.parentNode?.host) { // shadowDom
                    setMutationContainer(ref.current.parentNode.host)
                } else {
                    setMutationContainer((options.parent ? ref.current.parentNode : ref.current))
                }
            }

            return () => {
                // console.log( 'mutationObserver', mutationObserver.current )
                // console.log( 'mutationObserver: mutationContainer', mutationContainer )
                if(mutationObserver.current && mutationContainer) mutationObserver.current.unobserve(mutationContainer)
            }
        }, [ref])
  
        useEffect(() => {
            if (mutationContainer) {
                // console.log( mutationContainer )
                // mutationObserver.current.observe(mutationContainer)
                // console.log( 'mutationContainer', mutationContainer )
                mutationObserver.current.observe(mutationContainer, {
                    childList: options.childList,
                    attributes: options.attributes,
                    subtree: options.subtree,
                })
            }
        }, [mutationContainer])
    

        return {mutations, mutationContainer, mutationObserver}
  }
  
  export default useMutationObserver
  
  
  
  
  
  