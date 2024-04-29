import {
    h,
    Component,
} from 'react'


import {
    useContext,
} from 'react'

// import registerCustomElement from 'preact-custom-element';
import registerCustomElement from 'Utils/react-custom-element'




import { useSharedState } from 'Hooks/useSharedState';
import CounterContext from './body-context'

const customTag    = 'vc-body'
const shadowDOM    = false


// const {
//     BodyContext
// } = require('./body-context')

function registerBody() {
    function TestBody(props, compRef) {

        const sharedState = useContext(CounterContext);
        const [state, setState] = useSharedState(sharedState);


        console.log("scrraaaa")
        // return props.children
        // return [
        //     <h2>Hallo Body</h2>,
        //     props.children,
        //     // <button onClick={ () => console.log('hallo')}>
		//     // 	Add
        //     // </button>,
        // ]

        return (<div>
            body<br />
            <div>state: {state}</div>
              <button onClick={() => setState(state + 1)}>increase</button>
            {props.children}</div>)

        
        // return <BodyContext.Provider value={{theme: 'dark'}}>Hallo<br />{props.children}</BodyContext.Provider>
    }

    registerCustomElement(TestBody, customTag , [], { shadow: shadowDOM, 
        // extends: 'body'
    });
}

export default registerBody
// function ExtendedBody(props) {

//     // console.log(props.children)
//     console.log(props)


//     // return <div>{children}</div>
//     // return props.children
//     // return <body>Hallo<br />{props.children}</body>
// }

// registerCustomElement(ExtendedBody, 'vc-body' , [], {
//     shadow: false, 
//     extends: 'body'
// });


// function TestBody(props, compRef) {

//     // return props.children
//     return [
//         <h2>Hallo Body</h2>,
//         props.children,
//     ]
//     // return <body>Hallo<br />{props.children}</body>
// }

// registerCustomElement(TestBody, 'vc-body' , [], {
//     shadow: true, 
//     shadow: false, 
//     extends: 'body'
// });


// register(ExtendedBody, 'vc-body', [], {
//     shadow: true,
//     // connectedCallback: (a) =>{
//     //     console.log("connectedCallback")
//     // }
// });

