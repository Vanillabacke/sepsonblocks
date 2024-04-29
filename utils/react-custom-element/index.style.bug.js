import { 
    render,
    hydrate,
} from 'react-dom';

import React,
{
    Fragment,
    cloneElement,
    createElement as h,
} from 'react';


import parseStyleToObject from 'style-to-object';

export default function register(Component, tagName, propNames, options) {

	// console.log('customElements', customElements.get(tagName))
	if( customElements.get(tagName) != undefined ) return

	// console.log(options.extends)
	let extensionElement = HTMLElement
	if( options.extends == 'img' ) extensionElement = HTMLImageElement
	if( options.extends == 'body' ) extensionElement = HTMLBodyElement

	function ReactElement() {
		
		// const inst = Reflect.construct(HTMLElement, [], ReactElement);
		const inst = Reflect.construct(extensionElement, [], ReactElement);
		inst._vdomComponent = Component;
		inst._shadowEnabled = options && options.shadow;
		inst._root = inst._shadowEnabled
			? inst.attachShadow({ mode: 'open' })
			: inst;
		return inst;
	}

	// ReactElement.prototype = Object.create(HTMLElement.prototype);
	ReactElement.prototype = Object.create(extensionElement.prototype);
	ReactElement.prototype.constructor = ReactElement;
	ReactElement.prototype.connectedCallback = connectedCallback;
	ReactElement.prototype.attributeChangedCallback = attributeChangedCallback;
	ReactElement.prototype.disconnectedCallback = disconnectedCallback;

	propNames =
		propNames ||
		Component.observedAttributes ||
		Object.keys(Component.propTypes || {});
	ReactElement.observedAttributes = propNames;

	// Keep DOM properties and Preact props in sync
	propNames.forEach((name) => {
		Object.defineProperty(ReactElement.prototype, name, {
			get() {
				if (this._vdom) {
					return this._vdom.props[name];
				}

				if (!this._props) this._props = {};

				return this._props[name];
			},
			set(v) {
				if (this._vdom) {
					this.attributeChangedCallback(name, null, v);
				} else {
					if (!this._props) this._props = {};
					this._props[name] = v;
					this._props[toCamelCase(name)] = v;
				}

				// Reflect property changes to attributes if the value is a primitive
				const type = typeof v;
				if (
					v == null ||
					type === 'string' ||
					type === 'boolean' ||
					type === 'number'
				) {
					this.setAttribute(name, v);
				}
			},
		});
	});

	if( options && options.extends ) {
		return customElements.define(
			tagName || Component.tagName || Component.displayName || Component.name,
			ReactElement,
			{extends: options.extends.toString() }
		)
	}

	return customElements.define(
		tagName || Component.tagName || Component.displayName || Component.name,
		ReactElement
	);
}


function ContextProvider(props) {
	// this.getChildContext = () => props.context;
	// eslint-disable-next-line no-unused-vars
	// const { context, children, ...rest } = props;
	const { children, ...rest } = props;

    // console.log( context)
    // console.log( '------------------------------------------------------------props', props)
    // console.log( '-----------------------------------------------------------children', children)

    // console.log( '--> props', props )
    // console.log( 'this', this )
    // console.log( 'this', this )
// 
    // return recursiveCloneChildren(children)
	// return cloneElement(childs, rest);
	return cloneElement(children, rest);
	return cloneElement(children, {
        customDom: props.customDom || false
		// customDom: this.__P || false
	}, rest)
}



function recursiveStyleStorage( children ) {
    let styles = []
    // console.log( children )

    // children.map( (child,index) => {
    //     console.log( child)
    // })
    for (var i = 0; i < children.length; i++) {
        var tableChild = children[i];
        // console.log( tableChild )
        styles.push( parseStyleToObject(tableChild.style.cssText) )
        // console.log( tableChild.style.cssText )

        if( tableChild.children ) styles = [
            ... styles,
            ... recursiveStyleStorage(tableChild.children),
        ]
        // Do stuff
    }

    return styles
}

function connectedCallback() {
	// Obtain a reference to the previous context by pinging the nearest
	// higher up node that was rendered with Preact. If one React component
	// higher up receives our ping, it will set the `detail` property of
	// our custom event. This works because events are dispatched
	// synchronously.
	const event = new CustomEvent('_react', {
		detail: {},
		bubbles: true,
		cancelable: true,
	});
	this.dispatchEvent(event);
	const context = event.detail.context;

    // console.log( 'event', event )


    console.log( recursiveStyleStorage( this.children ) )

    // console.log( 'this._props', this._props)

	this._vdom = h(
		ContextProvider,
		// { ...this._props, context },
		// { ...{...this._props, customDom: this}, context }, // add customDom as property
		{
            ...{
                ...this._props,
                customDom: this,
                recursiveStyleStorage: recursiveStyleStorage(this.children),
                // customDomInnerHTML: this.innerHTML,
                // customDomInnerHTML: this.innerHTML,
            },
            // className: "sheesh",
            // class: "sheesh",
            context,
        }, // add customDom as property
		toVdom(this, this._vdomComponent, this._shadowEnabled)
	);

    
    


	(this.hasAttribute('hydrate') ? hydrate : render)(this._vdom, this._root);
	// (this.hasAttribute('hydrate') ? hydrate : render)(this._vdom, this._root);
}

function toCamelCase(str) {
	return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

function attributeChangedCallback(name, oldValue, newValue) {
	if (!this._vdom) return;
	// Attributes use `null` as an empty value whereas `undefined` is more
	// common in pure JS components, especially with default parameters.
	// When calling `node.removeAttribute()` we'll receive `null` as the new
	// value. See issue #50.
	newValue = newValue == null ? undefined : newValue;
	const props = {};
	props[name] = newValue;
	props[toCamelCase(name)] = newValue;
	this._vdom = cloneElement(this._vdom, props);
	render(this._vdom, this._root);
}

function disconnectedCallback() {
	render((this._vdom = null), this._root);
}

/**
 * Pass an event listener to each `<slot>` that "forwards" the current
 * context value to the rendered child. The child will trigger a custom
 * event, where will add the context value to. Because events work
 * synchronously, the child can immediately pull of the value right
 * after having fired the event.
 */
function Slot(props, context) {

    // console.log( 'context ', context )
	const { shadow, addContextListener, removeContextListener, ...rest } = props;
    // console.log( 'context ', context )

    // console.log()
	
	const ref = (r) => {
        // console.log( "this", this)
        // console.log( "r", r)
		// if (!r) {
		// 	removeContextListener(this._listener, this.ref);
		// } else {
		// 	this.ref = r;
		// 	if (!this._listener) {
		// 		this._listener = (event) => {
		// 			event.stopPropagation();
		// 			event.detail.context = context;
		// 		};
		// 		addContextListener(this._listener, this.ref);
		// 	}
		// }
	};

	// if (!shadow && !this._listener) {
	// 	this._listener = (event) => {
	// 		event.stopPropagation();
	// 		event.detail.context = context;
	// 	};
	// 	addContextListener(this._listener);
	// } 

	return h(shadow ? 'slot' : Fragment, { ...rest });
	// return h(shadow ? 'slot' : Fragment, { ...rest, ref });
	// return h(shadow ? 'slot' : Fragment, { ...rest });
}


// https://stackoverflow.com/questions/9518956/javascript-convert-css-style-string-into-js-object
function css2obj(css){
    const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g, o = {};
    // try {
        css.replace(r, (m,p,v) => o[p] = v)
    // } catch( err ) {}
    return o;     
}
// if( child.props?.style ) childProps.style = css2obj(child.props?.style)

function recursiveCloneChildren(children, depth = 0) {
    return React.Children.map(children, (child) => {


        
        
        // if( !child.type ) return
        // console.log("child", child.type)
        // console.log(`typeof ${typeof child}`, child )
        
        
        // return 
        // return React.createElement(child.type, {}, 'My First React Code');
        
        // if( child === undefined ) return
        if (!React.isValidElement(child)) return child;
        // console.log( '#######', child.props.style)
        // console.log( '#######', child)
    //   const props = { ...{ className: '' }, ...child.props };
    // const props = {}

    // console.log( child.props )
    // let childProps = {
    //     //   ... child.props
    //     // class: child.props.class
    // };

    let childProps = Object.keys(child.props).
        filter((key) => {

            // console.log(key)
            let allow = [
                'class',
                'className',
                // 'style',
                'aria-current',
                'ariaCurrent',
                // 'children',
                'href'
            ].includes(key)
            if( key.includes('-') ) allow = true



            // console.log( key, !!key)
            return allow
            // return true
            // return ['class', 'aria-current', 'children', 'href'].includes(key)
            //console.log('---> key', key)
            // if( key === 'children') return false
            // if( key === 'aria-current') return false
            // return true
            // console.log('--------------------------------------------------------------------> key', key)
            // return key.includes('class')
        }).
        // filter((key) => key != 'children').
        reduce((cur, key) => { return Object.assign(cur, { [key]: child.props[key] })}, {})




        // if( child.props?.style ) childProps.style = child.props?.style.style
        // childProps.style = {}
        // childProps.style.style = "width: 200px; height: 200px"

        // console.log('childProps.props?.style', childProps.props?.style)
        // console.log('childProps.props?.style', childProps.props?.style)
        // childProps.href = "https://sheeesh.com"

    
    //     console.log( childProps )
    //     console.log( ' ' )
    //     console.log( ' ' )
    //     console.log( ' ' )
    //     console.log( ' ' )
    // //   if (React.isValidElement(child) && !props.className.includes('exclude-node')) {
    // //     childProps = {
    // //       show: this.state.show,
    // //       toggle: this.toggle,
    // //     };
    // //   }

        // console.log( child.props?.style,  css2obj(child.props?.style) )

        childProps.children = recursiveCloneChildren(child.props.children, depth + 1);
        //   childProps.className = child.props.class
        //   childProps.className = child.props.className

        
        const theStyle =  parseStyleToObject(child.props.style)
        // if( !child.props.style ) return
        console.log( child.props.class, theStyle )
        // childProps.className = "asdfjasdfl"
        childProps.style = theStyle
        
        // console.log( ' ' )
        // console.log( depth, child.props.class )
        // console.log( depth, theStyle )
        // if( theStyle ) childProps.style  = theStyle
        childProps.style  = {width: '400px', height: '400px', background: 'rgb(255, 76, 76)'}
        
        
        // if( child.props && child.props.class === 'slide-inner has-style') {
        //     childProps.style = theStyle//{color: "red", backgroundColor: "blue"}
        //     console.log("----> ", child.props.style)
        // }
        // console.log( ' ' )
        // console.log( ' ' )
        // console.log( ' ' )
        // console.log( ' ' )
        // console.log( ' ' )
        // console.log( ' ' )

      return React.createElement(child.type, {
          // style: css2obj(child.props?.style),
          ... childProps,
          // style: {
              //     color: "red",
            //     width: '200px',
            //     height: '200px',
            // },
            // style: {width: '400px', height: '400px', background: 'rgb(255, 76, 76)'},
            // style: {width: '400px', height: '400px', background: 'rgb(255, 76, 76)'},
            // style: {color: "red", backgroundColor: "blue"},
            // className: child.props.class,
            
            // className: 'child.props.class',
            // className: `class-${3}`,
            // classes: child.props.className,
            // style: parseStyleToObject(child.props.style),

            // style: {color: "red", backgroundColor: "blue"},
        });
      return React.createElement(child.type, childProps);
    //   return React.cloneElement(child, childProps);
    });
}









function toVdom(element, nodeName, shadow) {
	if (element.nodeType === 3) return element.data;
	if (element.nodeType !== 1) return null;
	let children = [],
		props = {},
		i = 0,
		a = element.attributes,
		cn = element.childNodes;
	for (i = a.length; i--; ) {
		if (a[i].name !== 'slot') {
			props[a[i].name] = a[i].value;
			props[toCamelCase(a[i].name)] = a[i].value;
		}
	}

	for (i = cn.length; i--; ) {
		const vnode = toVdom(cn[i], null, shadow);
		// Move slots correctly
		const name = cn[i].slot;
		if (name) {
			props[name] = h(
				Slot,
				{
					name,
					shadow,
					addContextListener(listener, element = cn[i]) {
						element.addEventListener('_react', listener);
					},
					removeContextListener(listener, element = cn[i]) {
						element.removeEventListener('_react', listener);
					},
				},
				vnode
			);
		} else {
			children[i] = vnode;
		}
	}

	// Only wrap the topmost node with a slot
	const wrappedProps = {
		shadow,
		addContextListener(listener, e = element) {
			e.addEventListener('_react', listener);
		},
		removeContextListener(listener, e = element) {
			e.removeEventListener('_react', listener);
		},

	};

    
    // console.log(' element ', element )
    // console.log(' props ', props )
    // console.log(' wrappedProps ', wrappedProps )

    const updatedChildren = recursiveCloneChildren(children)
    // const updatedChildren = rcc(children)
    const wrappedChildren = nodeName ? h(Slot, wrappedProps, updatedChildren) : updatedChildren;
	// const wrappedChildren = nodeName ? h(Slot, wrappedProps, children) : children;

	// Remove all children from the topmost node in non-shadow mode
	if (!shadow && nodeName) {
		element.innerHTML = '';
	}

	return h(nodeName || element.nodeName.toLowerCase(), props, wrappedChildren);
}