
import {
    h,
    Component,
} from 'react'

import React,
{
    useRef,
    useEffect,
    useState,
    useCallback,
    // useContext,
} from 'react'
import{
     useContext,
} from 'react'

import useOverflow from 'Hooks/useOverflow'
import useResizeObserver from 'Hooks/useResizeObserver'
import useNavigationOverflow from 'Hooks/useNavigationOverflow'
import useMobileMenuToggle from 'Hooks/useMobileMenuToggle'


// import { createContext } from 'react';
// const Context = createContext('Default Value');

import { useSharedState } from 'Hooks/useSharedState'
// import { Context } from './'

// import { useBetween } from 'Hooks/useBetween'
// import { useStore } from 'Hooks/useStore'
// import { createStore  } from 'Hooks/useStore'

import {
    NavigationContentContext,
    OverflowContext,
    MobileOverflowContext,
    DesktopOverflowContext,

    // useSharedCounter,
} from './'

// import { useUserStore } from './context';



import useGlobalState from 'Hooks/useGlobalState'
import './style.scss'






// export default (props) => {
//     return <div>
//         Navigation
//         <div>
//             {props.children}
//         </div>
//     </div>
// }


function recursiveCloneChildren(children) {
    return React.Children.map(children, (child) => {

    // if( !child.type ) return
    // console.log("child", child.type)
    // console.log(`typeof ${typeof child}`, child )
    
    
    // return 
    // return React.createElement(child.type, {}, 'My First React Code');
    
    if (!React.isValidElement(child)) return child;
      const props = { ...{ className: '' }, ...child.props };
    // const props = {}
      let childProps = {};
    //   if (React.isValidElement(child) && !props.className.includes('exclude-node')) {
    //     childProps = {
    //       show: this.state.show,
    //       toggle: this.toggle,
    //     };
    //   }
      childProps.children = recursiveCloneChildren(child.props.children);
      return React.createElement(child.type, childProps);
    //   return React.cloneElement(child, childProps);
    });
}

export default (props) => {
    // console.log( props )

    

    const {
        children
    } = props


    const componentRef = useRef(props.customDom)
    const ref = useRef(null)

    const [mobileMenu, setMobileMenu] = useMobileMenuToggle()
    const [navigationOverflow, setNavigationOverflow] = useNavigationOverflow()

    const { overflow, overflowX, overflowY } = useOverflow(componentRef, ref)


    /*********************************************************/
    /*********************************************************/
    /*********************************************************/
    /*********************************************************/
    /*********************************************************/
    /*** FEHLER ENTSTEHT HIER ***/
    // console.log( NavigationContentContext )
    // const sharedState = useContext(NavigationContentContext)
    // const [navigationContent, setNavigationContent] = useSharedState(sharedState)
    // const [navigationContent, setNavigationContent] = useSharedState(useContext(NavigationContentContext))
    const [navigationContent, setNavigationContent] = useSharedState(useContext(NavigationContentContext))
    
    
    // const [navigationContent, setNavigationContent] = useGlobalState('clickedTimes', 0)
    // const [navigationContent, setNavigationContent] = useState( 0)



    // const [user, setUser] = useUserStore();

    // function login() {
    //     setUser({ username: 'Foo' })
    // }

    // function logout() {
    //     setUser(null)
    //   }

    

    useEffect(() => {
    //     // console.log(' - - - ')
    //     // console.log('children',  children )
    //     // console.log('sharedState',  sharedState )
    //     // // console.log('navigationContent',  navigationContent )
    //     // console.log(' - - - ')
    //     // // if(children !== navigationContent ) setNavigationContent(children)
        setNavigationContent(children)
    //     // setNavigationContent(false)
    //     // setNavigationContent(recursiveCloneChildren(children) )
    },[children])
    /*********************************************************/
    /*********************************************************/
    /*********************************************************/
    /*********************************************************/
    /*********************************************************/


    useEffect(() => {
        // if( !overflow && !overflowX && !overflowY )  return
        if( overflow == undefined && overflowX == undefined && overflowY == undefined )  return
        console.log( "overflow", {overflow, overflowX, overflowY})

        setMobileMenu(overflow)
    },[overflow, overflowX, overflowY])

    const value = 'My Context Value';

    return <div className="navigation-wrapper" ref={ref} style={{
        outline: overflow ? '1px solid hsl(192, 100%, 50%)' : '1px solid hsl(92, 100%, 50%)' 
        }}>
            <button onClick={() =>  {
                setNavigationOverflow(!navigationOverflow)
            }}>toggle menu</button>
            {/* {props.children} */}
            {navigationContent}



            {/* <div onClick={() => setNavigationContent(navigationContent + 1)}>
                I am ComponentA: {navigationContent}
            </div> */}

            {/* <button onClick={logout}>Log out</button><br />
            <div>
                {!user && <strong>You're logged out<button onClick={login}>Login</button></strong>}
                {user && <strong>Logged as <strong>{user.username}</strong></strong>}
            </div> */}

            {/* <h3>{count}</h3> */}
            {/* <button onClick={inc}>+</button>
            <button onClick={dec}>-</button> */}
    </div> 
    
    // // const comp = useRef()

    // // const size = useComponentRef(props);

    // // const [componentRef, setComponentRef] = useComponentRef()
    // // const sharedState = useContext(Context);
    // // const [navigationState, setNavigationState] = useSharedState(sharedState);

    // // const [navigationState, setNavigationState] = useSharedState(useContext(Context));
    // // const [navigationState, setNavigationState] = useSharedState(useContext(OverflowContext));
    // const [navigationContent, setNavigationContent] = useSharedState( useContext(NavigationContentContext) );


    // const [mobileMenu, setMobileMenu] = useMobileMenuToggle()
    // const [navigationOverflow, setNavigationOverflow] = useNavigationOverflow()
    
    // const componentRef = useRef(props.customDom);
    // const ref = useRef(null);

    // const { overflow, overflowX, overflowY } = useOverflow(componentRef, ref)
    // // const { overflow, overflowX, overflowY } = useOverflow(componentRef, ref, {overflowX: true, overflowY: false})
    // // const { overflow, overflowX, overflowY } = useOverflow(componentRef, ref, {overflowX: false, overflowY: true})
    // // const { overflow, overflowX, overflowY } = useOverflow(componentRef, ref, {overflowX: true, overflowY: true})
    // // const { overflow, overflowX, overflowY } = useOverflow(componentRef, ref, {overflowX: false, overflowY: false})
    

    // // console.log( useOverflow(componentRef, ref) )
    

   

    
    
    // useEffect(() => {
    //     console.log('children',  children )
    //     if(children) setNavigationContent(children)
    // },[children])
   
   
    // // useEffect(() => {
    // //     // if( !overflow && !overflowX && !overflowY )  return
    // //     if( overflow == undefined && overflowX == undefined && overflowY == undefined )  return
    // //     // console.log( "overflow", {overflow, overflowX, overflowY})

    // //     setMobileMenu(overflow)
    // // },[overflow, overflowX, overflowY])
    

                    
    // return <div className="navigation-wrapper" ref={ref} style={{
    //     outline: overflow ? '1px solid hsl(192, 100%, 50%)' : '1px solid hsl(92, 100%, 50%)' 
    // }}>
    //         <button onClick={() =>  {
    //             setNavigationOverflow(!navigationOverflow)
    //         }}>toggle menu</button>
    //         {navigationContent}
    //         {/* {props.children} */}
    // </div>
}