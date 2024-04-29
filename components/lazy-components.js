// console.log( "lazy components ")

// import HooksTester, { customTag as HooksTesterTag } from 'Components/hook-tester'
// import HooksTester from 'Components/hook-tester'
// import Dragger from 'Components/dragger'
// import Dropper from 'Components/dropper'


import TestComp from 'Components/test-comp'

const namespace = 'vc'


const tags = [

    TestComp
    
    // HooksTester,
    // Dragger,
    // Dropper,
]

const lazyWebComponents = async () => {
    

    // check for initial custom elements
    const regEx = new RegExp(`<${namespace}-(.*? *)( |\/|>)`,"gm")
    const initialCustomElements = []
    const matches = document.body.innerHTML.matchAll(regEx)
    for( const match of matches) {
        if( !initialCustomElements.includes(match[1]) )  initialCustomElements.push( match[1] )
    }

    initialCustomElements.forEach( (tag) => {
        tags.forEach( ( CustomComponent ) =>  {
            const tagExists = customElements.get(`${namespace}-${tag}`)
            if(!tagExists) CustomComponent.register(`${namespace}-${tag}`)
        })
    })

    
    window.insertedNodes = [];
    var observer = new MutationObserver(async function(mutations) {
        mutations.forEach(async function(mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                if( (mutation.addedNodes[i] instanceof HTMLElement) === false ) return
                // console.log( mutation.addedNodes[i],   mutation.addedNodes[i] instanceof HTMLElement)
                var tag = mutation.addedNodes[i].tagName.toLowerCase()


                tags.forEach( ( CustomComponent ) =>  {
                    const tagExists = customElements.get(tag)

                    if(!tagExists) CustomComponent.register(tag)
                })

            }
        })
        // console.log(window.insertedNodes);
    });
    observer.observe(document.getElementById('main'), { childList: true });
    // observer.observe(document.body, { childList: true });
    
    // setTimeout(async() => {
    // let {default: Scurr} = await import('./scurr')
    // // let {default: Scurr} = await import('./scurr')
    //     register(Scurr, 'vc-scurr' , [], { shadow: true });
    // },2000)
}


export default lazyWebComponents

// export {
//     lazyWebComponents,
// }
