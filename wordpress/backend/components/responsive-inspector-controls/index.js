import config, { breakpoints } from '../../../../config'

import './style.scss'

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { 
    Button,
    IconButton,
    ButtonGroup,
    Dropdown,
    DropdownMenu,
    
    TextControl,


    PanelBody,
    BaseControl,
} = wp.components;

const {
    InspectorControls,
} = wp.blockEditor


// import get from 'lodash.get'
import {get} from 'lodash'


import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import { getIcon } from '../../utils';


import ResponsiveTextControl            from '../responsive-text-control' 
import ResponsiveWrapper                from '../responsive-wrapper' 
import ResponsiveControl                from '../responsive-control' 
import ResponsiveNumberControl          from '../responsive-number-control' 
import ResponsiveRangeControl           from '../responsive-range-control' 
import ResponsiveToggleControl          from '../responsive-toggle-control' 
import ResponsiveSelectControl          from '../responsive-select-control' 
import ResponsiveCustomSelectControl    from '../responsive-custom-select-control' 
import ResponsiveButtonGroup            from '../responsive-button-group' 




class ResponsiveInspectorControls extends Component {
    constructor() {
        super(...arguments)


        const options = this.props.options || {}


        this.state = {
            options: options,
        }

        this.has = this.has.bind(this)
        this.getLabel = this.getLabel.bind(this)

    }


    has( option ){
        // console.log('this.props',this.props)
        // console.log(this.props[option])
        return Object.keys(this.state.options).includes( option) || this.props[option]
    }

    getLabel( label ) {
        return  __( label, `${ config.namespace }` )
    }

    render() {

        const {
            props,
            has,
            getLabel,
        } = this

        const {
            options
        } = this.state

        // if( Object.keys(options).length < 1) return false


        const groupLabel = this.props.label || `Responsive Settings`
        const isSmall = this.props.isSmall || false
        return (
            <InspectorControls>
                <PanelBody title={ __( groupLabel, `${ config.namespace }` ) }>
                    {/* { has('columns') &&
                        <ResponsiveRangeControl
                            label={ getLabel('Columns') }
                            attribute="columns"
                            min={ options?.columns?.min || 0}
                            max={ options?.columns?.max || config.columns || 12 }
                            {...props}
                        />
                    } */}
                    { has('size') &&
                        <ResponsiveRangeControl
                            label={ getLabel('Size') }
                            attribute="size"
                            min={ options?.size?.min || 0}
                            max={ options?.size?.max || config.columns || 12 }
                            {...props}
                        />
                    }
                    { has('order') &&
                        <ResponsiveRangeControl
                            label={ getLabel('Order') }
                            attribute="order"
                            // defaultValue
                            min={ options?.size?.min || -(config.columns) || -12 }
                            max={ options?.size?.max || config.columns    || 12  }
                            {...props}
                        />
                    }
                    { has('textAlign') &&
                        <ResponsiveButtonGroup
                            label={ getLabel('Text Align') }
                            attribute="text-align"
                            isSmall={isSmall}
                            options={[
                                // { value: null, label: 'Select a User', disabled: true },
                                { value: 'left',    icon: alignLeft },
                                { value: 'center',  icon: alignCenter },
                                { value: 'right',   icon: alignRight },
                            ] }
                            {...props}
                        />
                    }



                    { has('verticalAlign') && (this.props.verticalAlign == 'stretch') &&
                        <ResponsiveButtonGroup
                            label={ getLabel('Vertical Align') }
                            attribute="vertical-align"
                            isSmall={isSmall}
                            options={[
                                // { value: null, label: 'Select a User', disabled: true },
                                { value: 'top', icon: getIcon('vertical-top') },
                                { value: 'center',  icon: getIcon('vertical-center') },
                                { value: 'bottom',  icon: getIcon('vertical-bottom') },
                                { value: 'stretch',  icon: getIcon('vertical-stretch') },
                            ] }
                            {...props}
                        />
                    }
                    { has('verticalAlign') && (this.props.verticalAlign !== 'stretch') &&
                        <ResponsiveButtonGroup
                            label={ getLabel('Vertical Align') }
                            attribute="vertical-align"
                            isSmall={isSmall}
                            options={[
                                // { value: null, label: 'Select a User', disabled: true },
                                { value: 'top', icon: getIcon('vertical-top') },
                                { value: 'center',  icon: getIcon('vertical-center') },
                                { value: 'bottom',  icon: getIcon('vertical-bottom') },
                            ] }
                            {...props}
                        />
                    }



                    
                    { has('horizontalAlign') &&
                        <ResponsiveButtonGroup
                            label={ getLabel('Horizontal Align') }
                            attribute="horizontal-align"
                            isSmall={isSmall}
                            options={[
                                // { value: null, label: 'Select a User', disabled: true },
                                { value: 'start', icon: getIcon('horizontal-start') },
                                { value: 'center', icon: getIcon('horizontal-center') },
                                { value: 'end', icon: getIcon('horizontal-end') },
                                { value: 'between', icon: getIcon('horizontal-between') },
                                { value: 'around', icon: getIcon('horizontal-around') },
                            ] }
                            {...props}
                        />
                    }


                    { has('margin') &&
                        <ResponsiveNumberControl
                            label={ getLabel('Margin') }
                            attribute="margin"
                            {...props}
                        />
                    }
                    { has('padding') &&
                        <ResponsiveNumberControl
                            label={ getLabel('Padding') }
                            attribute="padding"
                            {...props}
                        />
                    }

                </PanelBody>
            </InspectorControls>
        )
    }
}

export default ResponsiveInspectorControls