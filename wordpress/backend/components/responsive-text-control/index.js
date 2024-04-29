import config, { breakpoints } from '../../../../config'

import './style.scss'

const { __ } = wp.i18n;
const {
    Component,
    Fragment,

    useState,
    useEffect,
    useCallback,
    useContext,
} = wp.element;

const {
    BaseControl,

    Button,
    ButtonGroup,
    Dropdown,
    DropdownMenu,

    TextControl,
} = wp.components;


// import { useInstanceId } from '@wordpress/compose';
import { forwardRef } from '@wordpress/element';


const {
    // useSelect,
    // useDispatch,
    // withSelect,

    // useInstanceId,
    withInstanceId,
} = wp.compose;



import ResponsiveWrapper from '../responsive-wrapper'
import { ResponsiveContext } from '../responsive-wrapper/responsive-context'


import JSONTree from 'react-json-tree'
import { getIcon } from '../../utils';

// import { createContext, useContext } from '@wordpress/element';

/**
 * @typedef OwnProps
 * @property {string} label Label for the control.
 * @property {boolean} [hideLabelFromVision] Whether to accessibly hide the label.
 * @property {string} value Value of the input.
 * @property {string} [help] Optional help text for the control.
 * @property {string} [className] Classname passed to BaseControl wrapper
 * @property {(value: string) => void} onChange Handle changes.
 * @property {string} [type='text'] Type of the input.
 */

/** @typedef {OwnProps & import('react').ComponentProps<'input'>} Props */

/**
 *
 * @param {Props} props Props
 * @param {import('react').Ref<HTMLInputElement>} [ref]
 */
 function ResponsiveTextControl(
	{
		label,
		hideLabelFromVision,
		value,
		help,
		className,
		onChange,
		type = 'text',


        instanceId,
        key,

		...props
	},
	ref
) {

    const {
        attribute,
        attributes,
        // 'selected-breakpoint': selectedBreakpoint,
        'selected-breakpoint': selectedBreakpointDefault,
    } = props


	const id = `inspector-responsive-text-control-${ instanceId }`;
	// const onChangeValue = (
	// 	/** @type {import('react').ChangeEvent<HTMLInputElement>} */
	// 	event
	// ) => onChange( event.target.value );

    

    const [selectedBreakpoint, selectBreakpoint]= useState( selectedBreakpointDefault || 'default');
    const [breakpointValue, setBreakpointValue]= useState( attributes.responsive?.[attribute]?.sizes?.[selectedBreakpoint] );


    const onChangeBreakpoint = ( value ) => {
        setBreakpointValue(attributes.responsive?.[attribute]?.sizes?.[value] || '')
        selectBreakpoint( value ) 
    }
    
    const onChangeValue = ( event ) => {
        // console.log( 'value', event.target.value)
        const newValues = {
            ... attributes.responsive,
            // ... {
            //     ...attributes.responsive[attribute],
            //     // ...attributes.responsive[attribute][selectedBreakpoint]: value,
            // },
        }

        if( ! newValues.hasOwnProperty(attribute) )  newValues[attribute] = {}
        if( ! newValues[attribute].hasOwnProperty('sizes') )  newValues[attribute].sizes = {}

        newValues[attribute].sizes[selectedBreakpoint] = event.target.value
        setBreakpointValue(event.target.value)
        // console.log(newValues)

        // console.log(attributes.responsive)
        props.setAttributes({
            responsive: newValues
        })
        if( onChange ) onChange(event.target.value)
    }
    



    // console.log(selectedBreakpoint, attributes.responsive?.[attribute]?.sizes?.[selectedBreakpoint])

    label = `BP: ${selectedBreakpoint}`

	return (
		<BaseControl
			label={ label }
			hideLabelFromVision={ hideLabelFromVision }
			id={ id }
			help={ help }
			className={ className }
		>
            <ResponsiveWrapper
                onSelectBreakpoint={onChangeBreakpoint}
                selected-breakpoint={selectedBreakpoint}
                {...props}>
                <input
                    className="components-text-control__input"
                    type={ type }
                    id={ id }
                    // value={ value }
                    value={ breakpointValue }
				    onChange={ onChangeValue } 
                    aria-describedby={ !! help ? id + '__help' : undefined }
                    ref={ ref }
                    { ...props }
                />
            </ResponsiveWrapper>
		</BaseControl>
	);
}

export default withInstanceId( forwardRef(ResponsiveTextControl ) );
// export default forwardRef( ResponsiveTextControl );