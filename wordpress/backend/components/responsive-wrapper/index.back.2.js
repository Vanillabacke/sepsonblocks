import config, { breakpoints } from '../../../../config'

import './style.scss'

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {  Button, ButtonGroup, Dropdown, DropdownMenu  } = wp.components;

// import get from 'lodash.get'
import {get} from 'lodash'



import ResponsiveContext from './responsive-context'



import JSONTree from 'react-json-tree'
import { getIcon } from '../../utils';


class ResponsiveWrapper extends Component {

    constructor() {
        super(...arguments)

        console.log( "this.props", this.props )

        const {
            attributes
        } = this.props

        const breakpointSettings = this.props['responsive-data'] 
            ? { 
                default: undefined,
                ... this.props?.['responsive-data'],
            }
            : {
                default: undefined,
            }

        const attributeName = this.props.attribute || false
        // const selectedBreakpoint = attributes?[attributeName]?.selected || this.props['selected-breakpoint'] || 'default'
        // const selectedBreakpoint = 'default' // get( attributes, `responsive.${attributeName}.selected` ) || 'default'
        // let value = undefined
        // if( this.props.responsive.hasOwnProperty(attributeName) 
        //     && this.props.responsive[attributeName].hasOwnProperty('sizes') 
        // ) {
        // const selectedBreakpoint = this.props.attributes[attributeName].selected || this.props['selected-breakpoint'] || 'default'
        //     value = this.props.responsive[attributeName].sizes[selectedBreakpoint] || undefined
        // }


        // const value = attributes[attributeName].sizes ? attributes[attributeName].sizes[selectedBreakpoint] : undefined


    //    const data = {
    //        ... breakpointSettings,
    //        ... attributes.responsive.hasOwnProperty(attributeName) && this.props.responsive[attributeName]
    //    }


        // console.log( 'LOG___', attributes?.responsive?.[attributeName]?.size  )

        const selectedBreakpoint = attributes?.responsive?.[attributeName]?.selected || this.props?.['selected-breakpoint'] || 'default'
        const values = {
            ... breakpointSettings,
            ... attributes?.responsive?.[attributeName]?.sizes
        }
        const value = values?.[attributeName] || undefined

        console.log(value)
    //    console.log( 'data', data)
        
        this.state = {
            responsive: this.props.responsive,
            attributeName: attributeName,
            // selectedBreakpoint: this.props.attributes[attributeName].selected || this.props['selected-breakpoint'] || 'default',
            selectedBreakpoint: selectedBreakpoint,
            breakpointSettings: breakpointSettings,

            values: values,
            value: value,
            // value: value,
            // value: this.props.responsive[attributeName].size[]
        }

        this.getBreakpointOptions = this.getBreakpointOptions.bind(this)
        this.selectBreakpoint = this.selectBreakpoint.bind(this)
        this.removeBreakpoint = this.removeBreakpoint.bind(this)

        this.updateValue = this.updateValue.bind(this)


        this.selectBreakpoint(this.state.selectedBreakpoint)

    }

    getBreakpointOptions () {
        const breakpointOptions = []
        Object.keys(config.breakpointsReverse).map( breakpoint => { 

            if( this.state.breakpointSettings.hasOwnProperty(breakpoint) ) return

            breakpointOptions.push({
                title: `${config.breakpointLabels[breakpoint]} (<${config.breakpoints[breakpoint]}px)`,
                // title: config.breakpointIcons[breakpoint],
                // icon: getIcon(config.breakpointIcons[breakpoint]),
                icon: getIcon(config.breakpointIcons[breakpoint]),
                onClick: () => {
                    console.log( config.breakpointLabels[breakpoint], config.breakpoints[breakpoint] )




                    const settings = {
                        ... this.state.breakpointSettings,
                        [breakpoint]: {
                            ... this.state.breakpointSettings[breakpoint]
                        }
                    }
                    this.setState({ breakpointSettings: settings })
                    this.selectBreakpoint(breakpoint)
                },
            })
        })

        return breakpointOptions

    }


    updateValue( value ) {

        const {
            breakpointSettings,
            attributeName,
            selectedBreakpoint,
            values,
            value:oldValue,
        } = this.state

        const newValues = { 
            ...values,
            ... {
                [selectedBreakpoint]: value
            }
        }

        // console.clear()
        // console.table(newValues)

        // this.setState({
        //     values: newValues
        // })

        const newAttributes = {
            ... this.props.attributes.responsive,
            ... {
                [attributeName]: newValues
            }
        }

        // console.table( newAttributes)

        // this.props.setAttributes({
        //     responsive: newAttributes
        // })


        // this.setState({value, value})


        // const settings = { 
        //     ... breakpointSettings,
        //     ... {
        //         [selectedBreakpoint]: value,
        //     }
        // }

        // const settings = breakpointSettings
        // settings[selectedBreakpoint] = value

        // console.table(settings)



        // if( !breakpointSettings[attributeName].hasOwnProperty('sizes') || breakpointSettings[attributeName].size[selectedBreakpoint] == value ) return

        // const settings = { 
        //     ...this.state.breakpointSettings,
        //     [this.state.attributeName]: {
        //         ... this.state.breakpointSettings[this.state.attributeName],
        //         size: {
        //             [this.state.selectedBreakpoint]: value
        //         }
        //     }
        // }

        // this.setState({ breakpointSettings: settings})
        
        // this.props.setAttributes({ responsive: {
        //     ... this.props.responsive,
        //     ... {
        //         [attributeName]: settings
        //     }
        // }})

    }


    componentDidUpdate() {
        // console.log("will update", this.props)
        // console.log("will update", this.state.value)
        // this.props.onUpdateValue(this.state.value)
        
        // console.log( this.props?.value )
     
        this.updateValue(this.props?.value)
    }


    selectBreakpoint( breakpoint ) {
        // const value = this.state.values?.[this.state.selectedBreakpoint] || undefined
        const value = this.state.values?.[breakpoint] || undefined

        console.clear()
        console.log(breakpoint, value)
        console.table( this.state.values )
        // console.log( this.state.values )
        // console.log( this.state.selectedBreakpoint, this.state.values?.[this.state.selectedBreakpoint] )

        this.setState({ 
            selectedBreakpoint: breakpoint,
            value: value,
        })
        this.props.onChangeBreakpoint(breakpoint)

        this.props.onUpdateValue(value)
    }


    removeBreakpoint( breakpoint = false ) {
        breakpoint = breakpoint || this.state.selectedBreakpoint

        if( !this.state.breakpointSettings.hasOwnProperty(breakpoint) ) return

        let settings = { ... this.state.breakpointSettings }

        if( breakpoint == 'default') settings.default = {}
        if( breakpoint !== 'default') delete settings[breakpoint]
       
        
        this.setState({breakpointSettings: settings})
        // console.log(breakpoint)
    }

    

    render() {


        // console.log('render', this.props)
        const BreakpointButtons = () => {
            return Object.keys(config.breakpointsReverse).map( breakpoint => { 
                return <Button
                        isTertiary
                        // isPressed
                        isSmall
                        focus={false}
                        style={{
                            marginLeft: '2px',
                            marginRight: '2px',
                        }}
                    >
                    {breakpoint.toUpperCase()}
                    {/* <strong>{breakpoint.toUpperCase()}</strong>
                    <br />
                    {config.breakpoints[breakpoint]} */}
                    </Button>
            })
        }


        const BreakpointSwitcher = () => {
            // this.state.breakpointSettings
            return <div className={`${config.namespace}-responsive-breakpoint-switcher`}>
                { Object.keys(this.state.breakpointSettings).length > 1 &&
                    <Button
                        // isSecondary={ this.state.selectedBreakpoint !== 'default'}
                        // isPrimary={ this.state.selectedBreakpoint == 'default'}
                        isPrimary={ this.state.selectedBreakpoint == 'default'}
                        isSmall
                        onClick={ (e) => {
                            this.selectBreakpoint('default')
                        }} 
                    >Default</Button>
                }
                <ButtonGroup>

                {(
                    // Object.keys(this.state.breakpointSettings).map( switcher => {
                    Object.keys(config.breakpointsReverse).map( breakpoint => { 

                        if( !this.state.breakpointSettings.hasOwnProperty(breakpoint) ) return
                        return <Button
                                    // isSecondary
                                    // isSecondary={ this.state.selectedBreakpoint !== breakpoint}
                                    // isPrimary={ this.state.selectedBreakpoint == breakpoint}
                                    isPrimary={ this.state.selectedBreakpoint == breakpoint}
                                    isSmall
                                    onClick={ (e) => {
                                        this.selectBreakpoint(breakpoint)
                                    }} 
                                >{breakpoint.toUpperCase()}</Button>
                    })
                )}
                </ButtonGroup>

                    <Button
                        className="breakpoint-remover"
                        isDestructive
                        // isSecondary
                        // isSecondary={ this.state.selectedBreakpoint !== breakpoint}
                        // isPrimary={ this.state.selectedBreakpoint == breakpoint}
                        // isPrimary={ this.state.selectedBreakpoint == breakpoint}
                        // isSmall
                        onClick={ (e) => {
                            // this.selectBreakpoint(breakpoint)
                            this.removeBreakpoint()
                        }} 
                    >Remove Breakpoint</Button>
            </div>
        }



        const wrapperTitle = this.props.label || false // || `Responsive Wrapper`



        return <div className={`${config.namespace}-responsive-settings-wrapper`}>
                { wrapperTitle && <div className={`${config.namespace}responsive-settings-header`}>
                    <h2 className="components-panel__body-title">{wrapperTitle}</h2>
                </div> }

                <div className={`${config.namespace}-responsive-settings-body`}>
                    {/* <h2>{wrapperTitle}</h2> */}

                    { this.props.children || <h2 className="components-panel__body-title">Empty Wrapper</h2>}

                    <DropdownMenu
                        icon={ getIcon('add-device-3') }
                        label="Add Breakpoint"
                        className="breakpoint-adder"
                        controls={this.getBreakpointOptions()}
                
                    />
                </div>

                { Object.keys(this.state.breakpointSettings).length > 1 &&
                <div className={`${config.namespace}-responsive-settings-footer`}>
                    <BreakpointSwitcher />
                </div>
                }


                {/* <JSONTree data={this.state.breakpointSettings} theme="summerfruit:inverted"/> */}
                <JSONTree data={this.state.values} theme="summerfruit:inverted"/>

                { this.props.value && <pre>{ this.props.value}</pre> }
        </div>






        return [
            
            <h2>Responsive Wrapper</h2>,


            
            // {
            //     (
            //         config.breakpoints.map( (width,breakpoint) => {
            //         return <strong>{width}</strong>
            //     })
            //     )
            // },
           
            // <BreakpointButtons />,

           
            <DropdownMenu
                // icon={ getIcon('all-devices') }
                // icon={ getIcon('add-device') }
                // icon={ getIcon('add-device-2') }
                icon={ getIcon('add-device') }
                label="Select a direction"
                controls={this.getBreakpointOptions()}
                // controls={this.breakpointOptions}
        
            />,


            // <Dropdown
            //     className="my-container-class-name"
            //     contentClassName="my-popover-content-classname"
            //     position="bottom right"
            //     renderToggle={ ( { isOpen, onToggle } ) => (
            //         <Button isPrimary onClick={ onToggle } aria-expanded={ isOpen }>
            //             Toggle Popover!
            //         </Button>
            //     ) }
            //     renderContent={ () => (
            //         <div style={{width:"auto", whiteSpace:'nowrap'}}>{
            //             <BreakpointButtons />
            //     }</div>
            //     ) }
            // />,

            <JSONTree data={this.state.breakpointSettings} theme="summerfruit:inverted"/>
            // <JSONTree data={this.state.responsive} theme="summerfruit:inverted"/>
            // <pre>
            //     {JSON.stringify(this.state.responsive)}
            // </pre>
        ]
    }
}

export default ResponsiveWrapper