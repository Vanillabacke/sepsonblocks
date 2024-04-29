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
    __experimentalNumberControl: NumberControl,
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

        // console.log(this.state.values)
        
        // return this.createWrapper(this.props.children)

        // return this.responsiveWrapper(this.props.children)
        return this.responsiveWrapper(
            <NumberControl
                onChange={ this.updateValue }
                // value={ this.state.value }
                value                   ={ this.getValue() }


                step                    ={ this.props.step  || '1' }
                shiftStep               ={ this.props.shiftStep || '1' }
                isShiftStepEnabled      ={ this.props.isShiftStepEnabled || true }
                
                dragDirection           ={ this.props.dragDirection || false }
                dragThreshold           ={ this.props.dragThreshold || false }
                hideHTMLArrows          ={ this.props.hideHTMLArrows || false }
                isDragEnabled           ={ this.props.isDragEnabled || false }

       
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