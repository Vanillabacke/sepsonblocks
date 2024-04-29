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
} = wp.components;

// import get from 'lodash.get'
import {get} from 'lodash'





import JSONTree from 'react-json-tree'
import ReactJson from 'react-json-view'
import { getIcon } from '../../utils';




class ResponsiveControl extends Component {
    constructor() {
        super(...arguments)

        const attributeName         = this.props.attribute || false
        const values                = this.props.attributes.responsive?.[attributeName]?.sizes || {}
        const selectedBreakpoint    = this.props?.selectedBreakpoint
                                        //this.props.attributes?.breakpointPreview
                                    || this.props.attributes.responsive?.[attributeName]?.selected
                                    || this.props['selected-breakpoint']
                                    || 'default'

        const currentValue  = values?.[selectedBreakpoint] || undefined


        this.state = {
            attributeName:  attributeName,
            value:          currentValue,
            values:         values,

            selectedBreakpoint:     selectedBreakpoint, //'default',

            emptyValue:     this.props['empty-value'] || ''
        }

        this.selectBreakpoint   = this.selectBreakpoint.bind(this)
        this.addBreakpoint      = this.addBreakpoint.bind(this)
        this.removeBreakpoint   = this.removeBreakpoint.bind(this)

        this.updateValue        = this.updateValue.bind(this)
        this.getValue           = this.getValue.bind(this)

        this.updateAttributes   = this.updateAttributes.bind(this)


        this.responsiveWrapper = this.responsiveWrapper.bind(this)
        this.createBreakpointSwitch = this.createBreakpointSwitch.bind(this)


        this.getBreakpointOptions = this.getBreakpointOptions.bind(this)

    }


    // componentWillUpdate() {
    //     console.log('componentWillUpdate')
    //     // this.updateAttributes()
    // }
    // componentDidUpdate() {
    //     console.log('componentDidUpdate')
    //     // this.updateAttributes()
    // }


    getBreakpointOptions () {
        const breakpointOptions = []
        Object.keys(config.breakpointsReverse).map( breakpoint => { 

            // if( this.state.value && this.state.values.hasOwnProperty(breakpoint) ) return
            if( this.state.values.hasOwnProperty(breakpoint) ) return

            breakpointOptions.push({
                title: `${config.breakpointLabels[breakpoint]} (<${config.breakpoints[breakpoint]}px)`,
                // title: config.breakpointIcons[breakpoint],
                // icon: getIcon(config.breakpointIcons[breakpoint]),
                icon: getIcon(config.breakpointIcons[breakpoint]),
                onClick: () => {

                    this.addBreakpoint(breakpoint)
                    // console.log( config.breakpointLabels[breakpoint], config.breakpoints[breakpoint] )

                    // const settings = {
                    //     ... this.state.values,
                    //     [breakpoint]: this.state.emptyValue,
                    //     // [breakpoint]: {
                    //     //     ... this.state.values[breakpoint]
                    //     // }
                    // }
                    // this.setState({ values: settings })
                    // this.selectBreakpoint(breakpoint)
                },
            })
        })

        return breakpointOptions
    }



    selectBreakpoint( breakpoint ) {
        this.setState({
            selectedBreakpoint: breakpoint,
            value: this.getValue(breakpoint),
        }, () => {
            this.updateAttributes()
        })

        // this.updateAttributes()

        // const newValues = { ...this.props.attributes.responsive }
        // if(! newValues.hasOwnProperty(attributeName) ) newValues[attributeName] = { selected: breakpoint, sizes: {} }
        // newValues[attributeName].selected = breakpoint

        // // console.log(breakpoint)
        // this.props.setAttributes({
        //     responsive: newValues,
        // })
    }
    
    addBreakpoint( breakpoint = false) {
        if( !breakpoint ) return 
        // console.log( config.breakpointLabels[breakpoint], config.breakpoints[breakpoint] )

        const settings = {
            ... this.state.values,
            [breakpoint]: this.state.emptyValue,
            // [breakpoint]: {
            //     ... this.state.values[breakpoint]
            // }
        }
        this.setState({ values: settings }, () => {
            this.selectBreakpoint(breakpoint)
            this.updateAttributes()
        })
        // this.selectBreakpoint(breakpoint)
        // this.updateAttributes()
    }

    removeBreakpoint( breakpoint = false ) {
        if( !breakpoint || typeof breakpoint !== 'string') breakpoint = this.state.selectedBreakpoint
        const newValues = { ... this.state.values }
        delete newValues?.[breakpoint]


        // console.log('newValues', newValues)
        this.setState({
            // value: value,
            values: newValues,
        }, () => {
            // console.log("setState callback")

            this.updateAttributes()

            const breakpoints = [
                // 'default',
                // ... Object.keys(config.breakpointsReverse),

                ... Object.keys(config.breakpoints),
                'default'
            ]

            let nextDefault = 'default'
            breakpoints.map( breakpoint => {
                if( !newValues.hasOwnProperty(breakpoint) || nextDefault !== 'default') return
                // console.log(breakpoint)
                nextDefault = breakpoint  
            })

            this.selectBreakpoint(this.props?.selectedBreakpoint || nextDefault)
        })
        // this.updateAttributes()



        // const breakpoints = [
        //     // 'default',
        //     // ... Object.keys(config.breakpointsReverse),

        //     ... Object.keys(config.breakpoints),
        //     'default'
        // ]

        // let nextDefault = 'default'
        // breakpoints.map( breakpoint => {
        //     if( !newValues.hasOwnProperty(breakpoint) || nextDefault !== 'default') return
        //     // console.log(breakpoint)
        //     nextDefault = breakpoint  
        // })

        // this.selectBreakpoint(nextDefault)
    }


    updateValue( value, breakpoint = false ) {
        // console.log('typeof', typeof breakpoint)
        if( !breakpoint || typeof breakpoint !== 'string') breakpoint = this.state.selectedBreakpoint
        const newValues = { ... this.state.values }
        newValues[breakpoint] = value

        // console.log('breakpoint', breakpoint)
        // console.log('value', value)
        this.setState({
            value: value,
            values: newValues,
        }, () => {
            this.updateAttributes() 
        })
        // this.updateAttributes(value)
    }

    getValue( breakpoint = false) {
        const {
            attributeName,
            emptyValue,
        } = this.state

        
        if( !breakpoint ) breakpoint = this.state.selectedBreakpoint
        // console.log("getValue", this.props.attributes.responsive?.[attributeName]?.sizes?.[breakpoint] || emptyValue)
        return this.props.attributes.responsive?.[attributeName]?.sizes?.[breakpoint] || emptyValue
    }

    updateAttributes(value = undefined) {
        const {
            attributeName,
            selectedBreakpoint,
            values,
            // value,
        } = this.state
        const newValues = { ...this.props.attributes.responsive }
        if(! newValues.hasOwnProperty(attributeName) ) newValues[attributeName] = { selected: selectedBreakpoint, sizes: {} }
        newValues[attributeName].sizes = values
        if( value !== undefined) newValues[attributeName].sizes[selectedBreakpoint] = value
        newValues[attributeName].selected = selectedBreakpoint

        // console.log('value_____', value )

        // console.log(selectedBreakpoint, newValues)

        this.props.setAttributes({
            responsive: newValues,
        })
    }


    createBreakpointSwitch( children = false ) {
        // if( this.props.attribute == 'text-align') console.log(Object.keys(this.state.values))
        if( Object.keys(this.state.values).length == 0 ) return false
        if( Object.keys(this.state.values).length < 2 && Object.keys(this.state.values).includes('default')  ) return false


        const BreakpointSwitcher = () => {
            return (
                <Fragment>
                        <Button isSmall
                        className={ (this.props?.selectedBreakpoint && this.props?.selectedBreakpoint == 'default') ? 'is-preview' : false}
                        isPressed={ this.state.selectedBreakpoint == 'default'}
                        isTertiary={ this.state.selectedBreakpoint == 'default'}
                        
                        onClick={()=>this.selectBreakpoint('default')}>Default</Button>
                        {(
                            Object.keys(config.breakpointsReverse).map( breakpoint => { 

                                // if( this.state.value && !this.state.values.hasOwnProperty(breakpoint) ) return
                                if( !this.state.values.hasOwnProperty(breakpoint) ) return
                                return <Button
                                            // isPrimary={ this.state.selectedBreakpoint == breakpoint}
                                            className={ (this.props?.selectedBreakpoint && this.props?.selectedBreakpoint == breakpoint) ? 'is-preview' : false}
                                            isPressed={ this.state.selectedBreakpoint == breakpoint}
                                            isTertiary={ this.state.selectedBreakpoint == breakpoint}
                                            
                                            isSmall
                                            onClick={ (e) => {
                                                this.selectBreakpoint(breakpoint)
                                            }} 
                                        >{breakpoint.toUpperCase()}</Button>
                            })
                        )}

                        {/* <Button isSmall onClick={()=>this.removeBreakpoint()} isDestructive >{__('Remove')}</Button> */}
                        {/* <IconButton icon={getIcon('trash')} isSmall onClick={()=>this.removeBreakpoint()} isDestructive ></IconButton> */}
                        {/* <IconButton icon={getIcon('remove')} isSmall onClick={()=>this.removeBreakpoint()} isDestructive ></IconButton> */}
                        {/* <IconButton icon={getIcon('remove-2')} isSmall onClick={()=>this.removeBreakpoint()} isDestructive ></IconButton> */}
                        {/* <IconButton icon={getIcon('trash')} isSmall onClick={()=>this.removeBreakpoint()} isDestructive >{__('Remove')}</IconButton> */}

                    <IconButton icon={getIcon('trash-2')} isSmall onClick={()=>this.removeBreakpoint()} isDestructive ></IconButton>
                </Fragment>
            )
            return (
                <ButtonGroup>
                    <Button isSmall
                    isPressed={ this.state.selectedBreakpoint == 'default'}
                    onClick={()=>this.selectBreakpoint('default')}>Default</Button>
                    {(
                        Object.keys(config.breakpointsReverse).map( breakpoint => { 

                            // if( this.state.value && !this.state.values.hasOwnProperty(breakpoint) ) return
                            if( !this.state.values.hasOwnProperty(breakpoint) ) return
                            return <Button
                                        // isPrimary={ this.state.selectedBreakpoint == breakpoint}
                                        isPressed={ this.state.selectedBreakpoint == breakpoint}
                                        isSmall
                                        onClick={ (e) => {
                                            this.selectBreakpoint(breakpoint)
                                        }} 
                                    >{breakpoint.toUpperCase()}</Button>
                        })
                    )}

                    <Button isSmall onClick={()=>this.removeBreakpoint()} isDestructive >{__('Remove')}</Button>
                </ButtonGroup>
            )
        }
        return  <div className={`${config.namespace}-responsive-settings-footer`}><BreakpointSwitcher /></div>
    }




    responsiveWrapper(children) {
        const wrapperTitle = this.props.label || false // || `Responsive Wrapper`

        return (
            <div className={`${config.namespace}-responsive-settings-wrapper`}>
                 { wrapperTitle && <div className={`${config.namespace}-responsive-settings-header`}>
                    <h2 className="components-panel__body-title">{wrapperTitle}</h2>
                </div> }
    
                <div className={`${config.namespace}-responsive-settings-body`}>
                    {/* <h2>{wrapperTitle}</h2> */}
    
                    { children || <h2 className="components-panel__body-title">Empty Wrapper</h2>}
    
                    {/* <TextControl
                        onChange={ this.updateValue }
                        value={ this.state.value }
                    /> */}
    
                    <DropdownMenu
                        // icon={ getIcon('add-device-3') }
                        // icon={ getIcon('add-device-3') }

                        // icon={getIcon('add-responsive-1') }
                        // icon={getIcon('add-responsive-2') }
                        // icon={getIcon('add-responsive-3') }
                                        // icon={getIcon('add-responsive-4') }
                        // icon={getIcon('add-responsive-5') }
                        // icon={getIcon('add-responsive-6') }
                                        // icon={getIcon('add-responsive-7') }
                        // icon={getIcon('add-responsive-8') }
                                        icon={getIcon('add-responsive-9') }
                            // icon={getIcon('add-responsive-10') }
                        // icon={getIcon('add-responsive-11') }

                        label="Add Breakpoint"
                        className="breakpoint-adder"
                        controls={this.getBreakpointOptions()}
                
                    />
                </div>
    
                { this.props.debug && <ReactJson src={this.state} enableClipboard={false}/> }
    
    
                {/* <TextControl
                    value={'text'}
                    // onChange={ newText => {
                    //     console.log("newText")
                    //     // setText(newText) 
                    //     // setAttributes({text: newText})
                    // }}
                />  */}
    
                { this.createBreakpointSwitch() }
            </div>
            )
    }


    render() {

        // console.log(this.state.values)
        
        // return this.createWrapper(this.props.children)
        return this.responsiveWrapper(this.props.children)




        // return (
        // <div className={`${config.namespace}-responsive-settings-wrapper`}>
        //     <h4>{this.state.breakpoint}</h4>
        //     {this.props.children}

        //     {/* <TextControl
        //         onChange={ this.updateValue }
        //         value={ this.state.value }
        //     /> */}


        //     <div className={`${config.namespace}-responsive-settings-body`}>
        //         {/* <h2>{wrapperTitle}</h2> */}

        //         { this.props.children || <h2 className="components-panel__body-title">Empty Wrapper</h2>}

        //         {/* <TextControl
        //             onChange={ this.updateValue }
        //             value={ this.state.value }
        //         /> */}

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

export default ResponsiveControl