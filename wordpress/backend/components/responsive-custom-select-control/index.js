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

    CustomSelectControl,
} = wp.components;



import ReactJson from 'react-json-view'

import { getIcon } from '../../utils';
import ResponsiveControl from '../responsive-control'


class ResponsiveSelectControl extends ResponsiveControl {
    constructor() {
        super(...arguments)

        // this.state = {
        //     // ... {this.state},

        //     emptyValue:     this.props['empty-value'] || 0
        // }

        this.state.emptyValue = this.props['empty-value'] || false

    }

    render() {

        // console.log(this.state.values)
        // console.log(this)
        
        // return this.createWrapper(this.props.children)

        // return this.responsiveWrapper(this.props.children)
        return this.responsiveWrapper(
            <CustomSelectControl
                onChange={ this.updateValue }
                value={ this.state.value }

                options                      ={ this.props.options  || false }
                // multiple                     ={ this.props.multiple   || false }

                disabled                      ={ this.props.disabled  || false }
            />
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

    }
}

export default ResponsiveSelectControl