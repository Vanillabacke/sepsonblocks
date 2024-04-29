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
    IconButton,
    ButtonGroup,
    Dropdown,
    DropdownMenu,

    ToggleControl,
} = wp.components;



import ReactJson from 'react-json-view'

import { getIcon } from '../../utils';
import ResponsiveControl from '../responsive-control'


class ResponsiveButtonGroup extends ResponsiveControl {
    constructor() {
        super(...arguments)

        // this.state = {
        //     // ... {this.state},

        //     emptyValue:     this.props['empty-value'] || 0
        // }

        this.state.emptyValue = this.props['empty-value'] || false
        this.state.options = this.props.options || []

    }

    render() {

        // console.log(this.state.values)
        // console.log(this)
        
        // return this.createWrapper(this.props.children)

        // if( !this.props.options ) return <div>No Options available</div>
        // return this.responsiveWrapper(this.props.children)

        const ButtonGroupOptions = () => {
            <ButtonGroup>
             {
                this.state.options.map( option => {

                    console.log(option)
                    // return <Button>{option.label}</Button>
                })
            }
            </ButtonGroup>
        }

        return this.responsiveWrapper(
            // (<Button>Test</Button>
            // <ButtonGroupOptions />

            <ButtonGroup>
             {
                this.state.options.map( option => {

                    // console.log(option)

                    const buttonAttr = {
                        isSmall: this.props.isSmall || false,
                        // isSmall: (option.value !== this.state.value) || this.props.isSmall || false,
                        isPressed: (option.value == this.state.value),
                        value: option.value,
                        onClick: () => {
                            if(option.value == this.state.value) this.updateValue(this.state.emptyValue)
                            else this.updateValue(option.value)
                        },
                    }

                    // iconSize={20}

                    if( option.icon ) return (<IconButton icon={option.icon} {...buttonAttr}>{option.label}</IconButton>)  
                    else  return (<Button {...buttonAttr}>{option.label}</Button>)  

                    // return <Button 
                    // isSmall
                    // isPressed={option.value == this.state.value }
                    // value={ option.value }
                    // // onClick={ (val)=>{console.log(val)} }
                    // onClick={ () => this.updateValue(option.value) }
                    // // onChange={ this.updateValue }
                    // // value                   ={ this.state.value }
                    // >{option.label}</Button>
                })
            }
            </ButtonGroup>

            // <ToggleControl
            //     onChange={ this.updateValue }
            //     checked={ this.state.value }

            //     disabled                      ={ this.props.disabled  || false }
            // />


            // <RangeControl
            //     onChange={ this.updateValue }
            //     value                   ={ this.state.value }
            //     min                     ={ this.props.min || 0 }
            //     max                     ={ this.props.max || 10 }
            //     step                    ={ this.props.step  || 1 }
                
            //     beforeIcon              ={ this.props.beforeIcon || false }
            //     afterIcon               ={ this.props.afterIcon || false }
            //     allowReset              ={ this.props.allowReset || false }
            //     initialPosition         ={ this.props.initialPosition || false }
            //     isShiftStepEnabled      ={ this.props.isShiftStepEnabled || false }
            //     marks                   ={ this.props.marks || false }
            //     railColor               ={ this.props.railColor || false }
            //     trackColor              ={ this.props.trackColor || false }
            //     renderTooltipContent    ={ this.props.renderTooltipContent || false }
            //     resetFallbackValue      ={ this.props.resetFallbackValue || false }
            //     showTooltip             ={ this.props.showTooltiptype || false }
            //     withInputField          ={ this.props.withInputField || true }
            //     icon                    ={ this.props.icon || true }
            //     separatorType           ={ this.props.separatorType || true }
            //     type                    ={ this.props.type || true }
            //     // shiftStep={ 1 }
            //     // isShiftStepEnabled={ true }
            // />
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

export default ResponsiveButtonGroup