// ResponsiveNumberControl

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
    RangeControl
} = wp.components;



import ReactJson from 'react-json-view'

import { getIcon } from '../../utils';
import ResponsiveControl from '../responsive-control'


class ResponsiveNumberControl extends ResponsiveControl {
    constructor() {
        super(...arguments)

        // this.state = {
        //     // ... {this.state},

        //     emptyValue:     this.props['empty-value'] || 0
        // }

        this.state.emptyValue = this.props['empty-value'] || 0

    }

    render() {

        // console.log('this.state.values', this.state.values)
        // console.log(this)
        
        // return this.createWrapper(this.props.children)

        // return this.responsiveWrapper(this.props.children)

        // console.log( this.getValue() )
        return this.responsiveWrapper(
            <RangeControl
                onChange={ this.updateValue }
                // value                   ={ this.state.value }
                value                   ={ this.getValue() }
                min                     ={ this.props.min || 0 }
                max                     ={ this.props.max || 10 }
                step                    ={ this.props.step  || 1 }
                
                beforeIcon              ={ this.props.beforeIcon || false }
                afterIcon               ={ this.props.afterIcon || false }
                allowReset              ={ this.props.allowReset || false }
                initialPosition         ={ this.props.initialPosition || false }
                isShiftStepEnabled      ={ this.props.isShiftStepEnabled || false }
                marks                   ={ this.props.marks || false }
                railColor               ={ this.props.railColor || false }
                trackColor              ={ this.props.trackColor || false }
                renderTooltipContent    ={ this.props.renderTooltipContent || false }
                resetFallbackValue      ={ this.props.resetFallbackValue || false }
                showTooltip             ={ this.props.showTooltiptype || false }
                withInputField          ={ this.props.withInputField || true }
                icon                    ={ this.props.icon || true }
                separatorType           ={ this.props.separatorType || true }
                type                    ={ this.props.type || true }
                // shiftStep={ 1 }
                // isShiftStepEnabled={ true }
            />
        )

        // return (
        // <div className={`${config.namespace}-responsive-settings-wrapper`}>
        //     <h4>{this.state.breakpoint}</h4>

        //     {/* <TextControl
        //         onChange={ this.updateValue }
        //         value={ this.state.value }
        //     /> */}


        //     <div className={`${config.namespace}-responsive-settings-body`}>
        //         {/* <h2>{wrapperTitle}</h2> */}

	    //         <TextControl
        //             onChange={ this.updateValue }
        //             value={ this.state.value }
        //         />

        //         <DropdownMenu
        //             icon={ getIcon('add-device-3') }
        //             label="Add Breakpoint"
        //             className="breakpoint-adder"
        //             controls={this.getBreakpointOptions()}
            
        //         />
        //     </div>

        //     <ReactJson src={this.state} enableClipboard={false}/>


        //     {/* <TextControl
        //         value={'text'}
        //         // onChange={ newText => {
        //         //     console.log("newText")
        //         //     // setText(newText) 
        //         //     // setAttributes({text: newText})
        //         // }}
        //     />  */}

        //     { this.createBreakpointSwitch() }
        // </div>
        // )
    }
}

export default ResponsiveNumberControl