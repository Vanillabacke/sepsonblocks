import config, { breakpoints } from '../../../../config'

import './style.scss'

const { __ } = wp.i18n;
const {
    Component,
    Fragment,

    useState,
    useEffect,
    useCallback,
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

import JSONTree from 'react-json-tree'
import { getIcon } from '../../utils';



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
        'selected-breakpoint': selectedBreakpoint,
    } = props


	const id = `inspector-responsive-text-control-${ instanceId }`;
	// const onChangeValue = (
	// 	/** @type {import('react').ChangeEvent<HTMLInputElement>} */
	// 	event
	// ) => onChange( event.target.value );

    // const currentBreakpoint = useState()
    const [currentBreakpoint, toggleBreakpoint]= useState('default');
    // const [currentBreakpoint, toggleBreakpoint]= useState('default');

    const onChangeValue = ( event ) => {
        onChange( event.target.value );
    }

    // const currentBreakpoint = this.currentBreakpoint
    // const currentBreakpoint = 'default'
    label = `Current: ${currentBreakpoint}`

    // console.log(props)

    // console.log('inside', selectedBreakpoint)

	return (
		<BaseControl
			label={ label }
			hideLabelFromVision={ hideLabelFromVision }
			id={ id }
			help={ help }
			className={ className }
		>
            <ResponsiveWrapper onChangeBreakpoint={toggleBreakpoint} {...props}>
                <input
                    className="components-text-control__input"
                    type={ type }
                    id={ id }
                    value={ value }
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