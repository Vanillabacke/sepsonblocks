import config, { breakpoints } from '../../../../config'

import './style.scss'

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {  Button, IconButton, ButtonGroup, Dropdown, DropdownMenu  } = wp.components;

// import get from 'lodash.get'
import {get} from 'lodash'



import ResponsiveContext from './responsive-context'



import JSONTree from 'react-json-tree'
import ReactJson from 'react-json-view'
import { getIcon } from '../../utils';


class ResponsiveWrapper extends Component {

    constructor() {
        super(...arguments)
        


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

        // console.log(breakpointSettings)



        const selectedBreakpoint = attributes?.responsive?.[attributeName]?.selected || this.props?.['selected-breakpoint'] || 'default'
        const values = {
            ... breakpointSettings,
            ... attributes?.responsive?.[attributeName]?.sizes
        }
        const value = values?.[attributeName] || undefined



        console.log(values)


        this.state = {
            responsive: this.props.responsive,
            attributeName: attributeName,
            // selectedBreakpoint: this.props.attributes[attributeName].selected || this.props['selected-breakpoint'] || 'default',
            selectedBreakpoint: selectedBreakpoint,
            breakpointSettings: breakpointSettings,

            values: values,
            value: value,
        }



        this.getBreakpointOptions = this.getBreakpointOptions.bind(this)
        this.selectBreakpoint = this.selectBreakpoint.bind(this)
        this.removeBreakpoint = this.removeBreakpoint.bind(this)

        // this.updateValue = this.updateValue.bind(this)


        this.selectBreakpoint(this.state.selectedBreakpoint)



    }




    getBreakpointOptions () {
        const breakpointOptions = []
        Object.keys(config.breakpointsReverse).map( breakpoint => { 

            if( this.state.values.hasOwnProperty(breakpoint) ) return

            breakpointOptions.push({
                title: `${config.breakpointLabels[breakpoint]} (<${config.breakpoints[breakpoint]}px)`,
                icon: getIcon(config.breakpointIcons[breakpoint]),
                onClick: () => {
                  const settings = {
                        ... this.state.values,
                        ... this.state.values[breakpoint] && {
                                [breakpoint]: {
                                    ... this.state.values[breakpoint]
                                }
                            },
                        ... !this.state.values[breakpoint] && {
                                [breakpoint]: undefined
                            },
                  }
                    this.setState({ values: settings })
                    this.selectBreakpoint(breakpoint)
                },
            })
        })

        return breakpointOptions
    }


    selectBreakpoint( breakpoint ) {
        const value = this.state.values?.[breakpoint] || undefined

        this.setState({ 
            selectedBreakpoint: breakpoint,
            value: value,
        })
        // this.props.onChangeBreakpoint(breakpoint)
        this.props.onSelectBreakpoint(breakpoint)

        // this.props.onUpdateValue(value)
    }


    removeBreakpoint( breakpoint = false ) {
        breakpoint = breakpoint || this.state.selectedBreakpoint

        // if( !this.state.breakpointSettings.hasOwnProperty(breakpoint) ) return
        // let settings = { ... this.state.breakpointSettings }

        if( !this.state.values.hasOwnProperty(breakpoint) ) return
        let settings = { ... this.state.values }

        if( breakpoint == 'default') settings.default = undefined
        if( breakpoint !== 'default') delete settings[breakpoint]
       
        // console.log("updated", settings)
        this.setState({values: settings})

        let newResponsive = {... this.props.attributes?.responsive }
        newResponsive[this.state.attributeName].sizes = settings

        // console.log("responsive", this.props.attributes?.responsive)
        // console.log("responsive", newResponsive)
        this.props.setAttributes({responsive: newResponsive})

        this.selectBreakpoint('default')
    }






   

    

    render() {


        const BreakpointButtons = () => {
            return Object.keys(config.breakpointsReverse).map( breakpoint => { 
                return <Button
                        isTertiary
                        isSmall
                        focus={false}
                        style={{
                            marginLeft: '2px',
                            marginRight: '2px',
                        }}
                    >
                    {breakpoint.toUpperCase()}
                    </Button>
            })
        }



        const BreakpointSwitcher = () => {
            return <div className={`${config.namespace}-responsive-breakpoint-switcher`}>
                {/* { Object.keys(this.state.values).length > 1 && ( ) } */}
                    <Button
                        isPrimary={ this.state.selectedBreakpoint == 'default'}
                        isSmall
                        onClick={ (e) => {
                            this.selectBreakpoint('default')
                        }} 
                    >Default</Button>


                    <ButtonGroup>{(
                        // Object.keys(config.breakpointsReverse).map( breakpoint => { 
                        // Object.keys(this.state.values).map( breakpoint => {
                        //     return <button>{breakpoint}</button>
                        // })
                        Object.keys(config.breakpointsReverse).map( breakpoint => { 

                            if( !this.state.values.hasOwnProperty(breakpoint) ) return
                            return <Button
                                        isPrimary={ this.state.selectedBreakpoint == breakpoint}
                                        isSmall
                                        onClick={ (e) => {
                                            this.selectBreakpoint(breakpoint)
                                        }} 
                                    >{breakpoint.toUpperCase()}</Button>
                        })
                    )}</ButtonGroup>
                


                <Button
                    // icon={ getIcon('trash') }
                    className={`breakpoint-remover count-${ Object.keys(this.state.values).length }`}
                    isDestructive
                    onClick={ (e) => {
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

                    { this.props.children || <h2 className="components-panel__body-title">Empty Wrapper</h2>}

                    <DropdownMenu
                        icon={ getIcon('add-device-3') }
                        label="Add Breakpoint"
                        className="breakpoint-adder"
                        controls={this.getBreakpointOptions()}
                
                    />
                </div>

                {/* { Object.keys(this.state.values).length > 1 && () } */}
                <div className={`${config.namespace}-responsive-settings-footer`}>
                    <BreakpointSwitcher />
                </div>



                {/* <JSONTree data={this.state.breakpointSettings} theme="summerfruit:inverted"/> */}
                {/* <JSONTree data={this.state.values} theme="summerfruit:inverted" collapsed={true}/> */}

                <ReactJson src={this.state.values} enableClipboard={false}/>

                { this.props.value && <pre>{ this.props.value}</pre> }
        </div>




    }
}

export default ResponsiveWrapper