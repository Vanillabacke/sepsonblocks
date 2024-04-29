import React from 'react'
import {
    useState,
    useEffect,
} from 'react'


import {useGlobalState} from 'Hooks/useGlobalState'

export default function TestComponent(props) {

    const {
        children
    } = props
    // const [counter, setCounter] = useState(0)
    const [counter, setCounter] = useGlobalState('counterStore', 0)
    const [childs, setChilds] = useState(false)



    useEffect( ()=>{
        setChilds(children)
        // console.log(children)
    }, [children])

    return props.children

    

    // return <div className="slider__slide test-wrapper">
    //     {props.children}
    // </div>

    // return <div className="test-wrapper">
    //     {props.children}
    // </div>
    
    return (
        <div>
            Test Component SHÜÜÜSH<br />
            { `${new Date()}`}
            <div>
                <h4>{counter}</h4>
                <button onClick={() => setCounter(counter+1)}>Click</button>
                {childs}
            </div>
        </div>
    )
}
