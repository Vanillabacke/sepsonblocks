// import { h, Fragment, cloneElement, render, hydrate } from 'react';





// import {
//     RecoilRoot,
//     atom,
//     selector,
//     useRecoilState,
//     useRecoilValue,
//   } from 'recoil';



import React from 'react'
import ReactDOM from 'react-dom'
// import ReactWebComponent from 'react-web-component'
import reactToWebComponent from "react-to-webcomponent"



export default function register(Component, tagName, propNames, options) {
    options = {
        shadow: false,
        ... options,
    }
    customElements.define(tagName,  reactToWebComponent(Component, React, ReactDOM, options));
}



// export default function register(Component, tagName, propNames, options) {

// 	// console.log('customElements', customElements.get(tagName))
// 	if( customElements.get(tagName) != undefined ) return

// 	// console.log(options.extends)
// 	let extensionElement = HTMLElement
// 	if( options.extends == 'img' ) extensionElement = HTMLImageElement
// 	if( options.extends == 'body' ) extensionElement = HTMLBodyElement

// 	function ReactElement() {
		
// 		// const inst = Reflect.construct(HTMLElement, [], ReactElement);
// 		const inst = Reflect.construct(extensionElement, [], ReactElement);
// 		inst._vdomComponent = Component;
// 		inst._shadowEnabled = options && options.shadow;
// 		inst._root = inst._shadowEnabled
// 			? inst.attachShadow({ mode: 'open' })
// 			: inst;
// 		return inst;
// 	}

// 	// ReactElement.prototype = Object.create(HTMLElement.prototype);
// 	ReactElement.prototype = Object.create(extensionElement.prototype);
// 	ReactElement.prototype.constructor = ReactElement;
// 	ReactElement.prototype.connectedCallback = connectedCallback;
// 	ReactElement.prototype.attributeChangedCallback = attributeChangedCallback;
// 	ReactElement.prototype.disconnectedCallback = disconnectedCallback;

// 	propNames =
// 		propNames ||
// 		Component.observedAttributes ||
// 		Object.keys(Component.propTypes || {});
// 	ReactElement.observedAttributes = propNames;

// 	// Keep DOM properties and React props in sync
// 	propNames.forEach((name) => {
// 		Object.defineProperty(ReactElement.prototype, name, {
// 			get() {
// 				if (this._vdom) {
// 					return this._vdom.props[name];
// 				}

// 				if (!this._props) this._props = {};

// 				return this._props[name];
// 			},
// 			set(v) {
// 				if (this._vdom) {
// 					this.attributeChangedCallback(name, null, v);
// 				} else {
// 					if (!this._props) this._props = {};
// 					this._props[name] = v;
// 					this._props[toCamelCase(name)] = v;
// 				}

// 				// Reflect property changes to attributes if the value is a primitive
// 				const type = typeof v;
// 				if (
// 					v == null ||
// 					type === 'string' ||
// 					type === 'boolean' ||
// 					type === 'number'
// 				) {
// 					this.setAttribute(name, v);
// 				}
// 			},
// 		});
// 	});

// 	if( options && options.extends ) {
// 		return customElements.define(
// 			tagName || Component.tagName || Component.displayName || Component.name,
// 			ReactElement,
// 			{extends: options.extends.toString() }
// 		)
// 	}

// 	return customElements.define(
// 		tagName || Component.tagName || Component.displayName || Component.name,
// 		ReactElement
// 	);
// }

// function ContextProvider(props) {
// 	this.getChildContext = () => props.context;
// 	// eslint-disable-next-line no-unused-vars
// 	const { context, children, ...rest } = props;

// 	return cloneElement(children, rest);
// 	return cloneElement(children, {
// 		// customDom: this.__P || false
// 	}, rest)
// }

// function connectedCallback() {
// 	// Obtain a reference to the previous context by pinging the nearest
// 	// higher up node that was rendered with React. If one React component
// 	// higher up receives our ping, it will set the `detail` property of
// 	// our custom event. This works because events are dispatched
// 	// synchronously.
// 	const event = new CustomEvent('_react', {
// 		detail: {},
// 		bubbles: true,
// 		cancelable: true,
// 	});
// 	this.dispatchEvent(event);
// 	const context = event.detail.context;

// 	this._vdom = h(
// 		ContextProvider,
// 		// { ...this._props, context },
// 		{ ...{...this._props, customDom: this}, context }, // add customDom as property
// 		toVdom(this, this._vdomComponent, this._shadowEnabled)
// 	);

    
    


// 	(this.hasAttribute('hydrate') ? hydrate : render)(this._vdom, this._root);
// 	// (this.hasAttribute('hydrate') ? hydrate : render)(this._vdom, this._root);
// }

// function toCamelCase(str) {
// 	return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
// }

// function attributeChangedCallback(name, oldValue, newValue) {
// 	if (!this._vdom) return;
// 	// Attributes use `null` as an empty value whereas `undefined` is more
// 	// common in pure JS components, especially with default parameters.
// 	// When calling `node.removeAttribute()` we'll receive `null` as the new
// 	// value. See issue #50.
// 	newValue = newValue == null ? undefined : newValue;
// 	const props = {};
// 	props[name] = newValue;
// 	props[toCamelCase(name)] = newValue;
// 	this._vdom = cloneElement(this._vdom, props);
// 	render(this._vdom, this._root);
// }

// function disconnectedCallback() {
// 	render((this._vdom = null), this._root);
// }

// /**
//  * Pass an event listener to each `<slot>` that "forwards" the current
//  * context value to the rendered child. The child will trigger a custom
//  * event, where will add the context value to. Because events work
//  * synchronously, the child can immediately pull of the value right
//  * after having fired the event.
//  */
// function Slot(props, context) {
// 	const { shadow, addContextListener, removeContextListener, ...rest } = props;
	
// 	const ref = (r) => {
// 		if (!r) {
// 			removeContextListener(this._listener, this.ref);
// 		} else {
// 			this.ref = r;
// 			if (!this._listener) {
// 				this._listener = (event) => {
// 					event.stopPropagation();
// 					event.detail.context = context;
// 				};
// 				addContextListener(this._listener, this.ref);
// 			}
// 		}
// 	};

// 	if (!shadow && !this._listener) {
// 		this._listener = (event) => {
// 			event.stopPropagation();
// 			event.detail.context = context;
// 		};
// 		addContextListener(this._listener);
// 	}

// 	return h(shadow ? 'slot' : Fragment, { ...rest, ref });
// }

// function toVdom(element, nodeName, shadow) {
// 	if (element.nodeType === 3) return element.data;
// 	if (element.nodeType !== 1) return null;
// 	let children = [],
// 		props = {},
// 		i = 0,
// 		a = element.attributes,
// 		cn = element.childNodes;
// 	for (i = a.length; i--; ) {
// 		if (a[i].name !== 'slot') {
// 			props[a[i].name] = a[i].value;
// 			props[toCamelCase(a[i].name)] = a[i].value;
// 		}
// 	}

// 	for (i = cn.length; i--; ) {
// 		const vnode = toVdom(cn[i], null, shadow);
// 		// Move slots correctly
// 		const name = cn[i].slot;
// 		if (name) {
// 			props[name] = h(
// 				Slot,
// 				{
// 					name,
// 					shadow,
// 					addContextListener(listener, element = cn[i]) {
// 						element.addEventListener('_react', listener);
// 					},
// 					removeContextListener(listener, element = cn[i]) {
// 						element.removeEventListener('_react', listener);
// 					},
// 				},
// 				vnode
// 			);
// 		} else {
// 			children[i] = vnode;
// 		}
// 	}

// 	// Only wrap the topmost node with a slot
// 	const wrappedProps = {
// 		shadow,
// 		addContextListener(listener, e = element) {
// 			e.addEventListener('_react', listener);
// 		},
// 		removeContextListener(listener, e = element) {
// 			e.removeEventListener('_react', listener);
// 		},
// 	};

// 	const wrappedChildren = nodeName ? h(Slot, wrappedProps, children) : children;

// 	// Remove all children from the topmost node in non-shadow mode
// 	if (!shadow && nodeName) {
// 		element.innerHTML = '';
// 	}

// 	return h(nodeName || element.nodeName.toLowerCase(), props, wrappedChildren);
// }