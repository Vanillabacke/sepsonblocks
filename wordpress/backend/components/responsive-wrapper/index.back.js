import config, { breakpoints } from '../../../../config'

import './style.scss'

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {  Button, ButtonGroup, Dropdown, DropdownMenu  } = wp.components;






import JSONTree from 'react-json-tree'
import { getIcon } from '../../utils';


class ResponsiveWrapper extends Component {

    constructor() {
        super(...arguments)

        console.log( "this.props", this.props )

        this.state = {
            responsive: this.props.responsive,
            currentBreakpoint: this.props['selected-breakpoint'] || 'default',
            breakpointSettings: this.props['responsive-data'] || {
                default: {},
                m: {},
                xl: {},
            },

        }

        // this.props.onUpdate("test")

        // console.log(this.props)

        // console.log(config.breakpoints)


        this.getBreakpointOptions = this.getBreakpointOptions.bind(this)
        this.setCurrentBreakpoint = this.setCurrentBreakpoint.bind(this)
        this.removeBreakpoint = this.removeBreakpoint.bind(this)


        this.setCurrentBreakpoint(this.state.currentBreakpoint)

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
                    this.setCurrentBreakpoint(breakpoint)
                },
            })
        })

        return breakpointOptions

    }


    setCurrentBreakpoint( breakpoint ) {
        this.setState({ currentBreakpoint: breakpoint })
        this.props.onChangeBreakpoint(breakpoint)
        // this.props.onToggle(breakpoint)
        // this.props.toggleBreakpoint(breakpoint)
    }


    removeBreakpoint( breakpoint = false ) {
        breakpoint = breakpoint || this.state.currentBreakpoint

        if( !this.state.breakpointSettings.hasOwnProperty(breakpoint) ) return

        let settings = { ... this.state.breakpointSettings }

        if( breakpoint == 'default') settings.default = {}
        if( breakpoint !== 'default') delete settings[breakpoint]
       
        
        this.setState({breakpointSettings: settings})
        // console.log(breakpoint)
    }

    

    render() {



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
                <ButtonGroup>
                { Object.keys(this.state.breakpointSettings).length > 1 &&
                    <Button
                        // isSecondary={ this.state.currentBreakpoint !== 'default'}
                        // isPrimary={ this.state.currentBreakpoint == 'default'}
                        isPrimary={ this.state.currentBreakpoint == 'default'}
                        isSmall
                        onClick={ (e) => {
                            this.setCurrentBreakpoint('default')
                        }} 
                    >Default</Button>
                }

                {(
                    // Object.keys(this.state.breakpointSettings).map( switcher => {
                    Object.keys(config.breakpointsReverse).map( breakpoint => { 

                        if( !this.state.breakpointSettings.hasOwnProperty(breakpoint) ) return
                        return <Button
                                    // isSecondary
                                    // isSecondary={ this.state.currentBreakpoint !== breakpoint}
                                    // isPrimary={ this.state.currentBreakpoint == breakpoint}
                                    isPrimary={ this.state.currentBreakpoint == breakpoint}
                                    isSmall
                                    onClick={ (e) => {
                                        this.setCurrentBreakpoint(breakpoint)
                                    }} 
                                >{breakpoint.toUpperCase()}</Button>
                    })
                )}
                </ButtonGroup>

                    <Button
                        className="breakpoint-remover"
                        isDestructive
                        // isSecondary
                        // isSecondary={ this.state.currentBreakpoint !== breakpoint}
                        // isPrimary={ this.state.currentBreakpoint == breakpoint}
                        // isPrimary={ this.state.currentBreakpoint == breakpoint}
                        // isSmall
                        onClick={ (e) => {
                            // this.setCurrentBreakpoint(breakpoint)
                            this.removeBreakpoint()
                        }} 
                    >Remove</Button>
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

                <JSONTree data={this.state.breakpointSettings} theme="summerfruit:inverted"/>

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