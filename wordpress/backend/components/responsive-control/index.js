import React, { Component, Fragment } from 'react';
import { Button, IconButton, DropdownMenu } from '@wordpress/components';
import { getIcon } from '../../utils';
import THEME_CONFIG from '../../../../config'; // Ensure the correct path to your config file
import config, { breakpoints } from '../../../../config'

import './style.scss'


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



    getBreakpointOptions () {
        /*
        const breakpointOptions = []
        Object.keys(config.breakpointsReverse).map( breakpoint => { 

            if( this.state.values.hasOwnProperty(breakpoint) ) return

            breakpointOptions.push({
                title: `${config.breakpointLabels[breakpoint]} (<${config.breakpoints[breakpoint]}px)`,
                icon: getIcon(config.breakpointIcons[breakpoint]),
                onClick: () => {

                    this.addBreakpoint(breakpoint)
                },
            })
        })

        return breakpointOptions
        */

        return THEME_CONFIG.breakpoints.filter(bp => !this.state.values.hasOwnProperty(bp.key))
            .filter(bp => !this.state.values.hasOwnProperty(bp.key) && bp.width !== null)
            .map(bp => {
                return {
                    title: `${bp.label} (<${bp.width}px)`,
                    icon: getIcon(bp.icon),
                    onClick: () => this.addBreakpoint(bp.key)
                }
            });
    }



    selectBreakpoint( breakpoint ) {
        this.setState({
            selectedBreakpoint: breakpoint,
            value: this.getValue(breakpoint),
        }, () => {
            this.updateAttributes()
        })
    }
    
    addBreakpoint( breakpoint = false) {
        if( !breakpoint ) return 

        const settings = {
            ... this.state.values,
            [breakpoint]: this.state.emptyValue,
        }
        this.setState({ values: settings }, () => {
            this.selectBreakpoint(breakpoint)
            this.updateAttributes()
        })
    }

    removeBreakpoint( breakpoint = false ) {
        if( !breakpoint || typeof breakpoint !== 'string') breakpoint = this.state.selectedBreakpoint
        const newValues = { ... this.state.values }
        delete newValues?.[breakpoint]


        this.setState({
            // value: value,
            values: newValues,
        }, () => {

            this.updateAttributes()

            console.clear()
            console.log("config.breakpoints")
            console.log(config.breakpoints)

            // const breakpoints = [

            //     ... Object.keys(config.breakpoints),
            //     'default'
            // ]
            // const breakpoints = config.breakpoints.map(bp => bp.key).concat('default');
            const breakpoints = config.breakpoints.map(bp => bp.key);


            // this.selectBreakpoint('s')
            let breakpointSelectAfter = 'default'
            let breakpointSelectAfterIndex = 0 
            // breakpoints.length - 1

            breakpoints.reverse().forEach((bp, index) => {
                console.log("       ")

                console.log("- - - - -  - - -  - -", breakpoint)
                console.log("bp", bp)
                console.log("bp:index", index)
                // if (!newValues.hasOwnProperty(bp)) return; // Skip if breakpoint doesn't exist in values
                
                if( breakpoint == bp) {
                    breakpointSelectAfterIndex = -1 + index
                    console.log("      set index", breakpointSelectAfterIndex)
                }
                console.log("       - - - - -  - - -  - -")
                console.log("       ")
                // breakpointSelectAfter = bp;
                
                // if( bp !== 'default') {

                // }
                // if (nextDefault === 'default' || bp === previousBreakpoint) {
                //     nextDefault = bp; // Update nextDefault to the previous breakpoint if found, or keep looking
                // }
            });


            console.log('breakpointSelectAfter', breakpointSelectAfter);
            console.log('breakpointSelectAfterIndex', breakpointSelectAfterIndex);
            
            breakpointSelectAfterIndex = Math.max(0, Math.min(breakpointSelectAfterIndex, breakpoints.length - 1));
            console.log('breakpointSelectAfterIndex:min:max', breakpointSelectAfterIndex);
            
            this.selectBreakpoint(this.props?.selectedBreakpoint || breakpoints[breakpointSelectAfterIndex]);
            // this.selectBreakpoint(breakpointSelectAfter);

            // let nextDefault = 'default';
            // console.log('breakpoints');
            // console.log(breakpoints);
            
            // // Finding the previous breakpoint
            // const currentBreakpointIndex = breakpoints.indexOf(breakpoint);
            // const previousBreakpoint = currentBreakpointIndex > 0 ? breakpoints[currentBreakpointIndex - 1] : 'default';
            
            // breakpoints.forEach(bp => {
            //     if (!newValues.hasOwnProperty(bp)) return; // Skip if breakpoint doesn't exist in values
            //     if (nextDefault === 'default' || bp === previousBreakpoint) {
            //         nextDefault = bp; // Update nextDefault to the previous breakpoint if found, or keep looking
            //     }
            // });

            // console.log("select", (this.props?.selectedBreakpoint || nextDefault));
            // console.log("select:selectBreakpoint", this.props?.selectedBreakpoint);
            // console.log("select:next", nextDefault);
            // this.selectBreakpoint(this.props?.selectedBreakpoint || nextDefault);


            // let nextDefault = 'default'
            // console.log('breakpoints')
            // console.log(breakpoints)
            // breakpoints.map( breakpoint => {
            //     if( !newValues.hasOwnProperty(breakpoint) || nextDefault !== 'default') return
            //     console.log("breakpoint", breakpoint)
            //     nextDefault = breakpoint  
            // })

            // console.log("select", (this.props?.selectedBreakpoint || nextDefault))
            // console.log("select:selectBreakpoint", this.props?.selectedBreakpoint)
            // console.log("select:next",  nextDefault)
            // this.selectBreakpoint(this.props?.selectedBreakpoint || nextDefault)
        })
       
    }


    updateValue( value, breakpoint = false ) {
        // console.log('typeof', typeof breakpoint)
        if( !breakpoint || typeof breakpoint !== 'string') breakpoint = this.state.selectedBreakpoint
        const newValues = { ... this.state.values }
        newValues[breakpoint] = value
        this.setState({
            value: value,
            values: newValues,
        }, () => {
            this.updateAttributes() 
        })
    }

    getValue( breakpoint = false) {
        const {
            attributeName,
            emptyValue,
        } = this.state

        
        if( !breakpoint ) breakpoint = this.state.selectedBreakpoint
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


        this.props.setAttributes({
            responsive: newValues,
        })
    }


    createBreakpointSwitch( children = false ) {
        /*
        if( Object.keys(this.state.values).length == 0 ) return false
        if( Object.keys(this.state.values).length < 2 && Object.keys(this.state.values).includes('default')  ) return false
        */

        if (Object.keys(this.state.values).length === 0 || 
            (Object.keys(this.state.values).length < 2 && this.state.values.hasOwnProperty('default'))) {
            return null;
        }

        const BreakpointSwitcher = () => {
            return (
                <Fragment>
                        <Button isSmall
                        className={ (this.props?.selectedBreakpoint && this.props?.selectedBreakpoint == 'default') ? 'is-preview' : false}
                        isPressed={ this.state.selectedBreakpoint == 'default'}
                        isTertiary={ this.state.selectedBreakpoint == 'default'}
                        
                        onClick={()=>this.selectBreakpoint('default')}>Default</Button>
                        {
                        /*(
                            Object.keys(config.breakpointsReverse).map( breakpoint => { 

                                if( !this.state.values.hasOwnProperty(breakpoint) ) return
                                return <Button
                                            className={ (this.props?.selectedBreakpoint && this.props?.selectedBreakpoint == breakpoint) ? 'is-preview' : false}
                                            isPressed={ this.state.selectedBreakpoint == breakpoint}
                                            isTertiary={ this.state.selectedBreakpoint == breakpoint}
                                            
                                            isSmall
                                            onClick={ (e) => {
                                                this.selectBreakpoint(breakpoint)
                                            }} 
                                        >{breakpoint.toUpperCase()}</Button>
                            })
                        )*/}

                    {Object.keys(THEME_CONFIG.breakpointObject)
                        .filter( bp => !(bp == 'default'))
                        .reverse()
                        .map(bp => {
                        if (!this.state.values.hasOwnProperty(bp)) return null;
                        return (
                            <Button key={bp}
                                    isSmall
                                    isPressed={this.state.selectedBreakpoint === bp}
                                    onClick={() => this.selectBreakpoint(bp)}>
                                {/* {THEME_CONFIG.breakpointObject[bp].label} */}
                                {bp.toUpperCase()}
                            </Button>
                        );
                    })}

                       
                    <IconButton icon={getIcon('trash-2')} isSmall onClick={()=>this.removeBreakpoint()} isDestructive ></IconButton>
                </Fragment>
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
    
    
                { this.createBreakpointSwitch() }
            </div>
            )
    }


    render() {

        // console.log(this.state.values)
        
        // return this.createWrapper(this.props.children)
        return this.responsiveWrapper(this.props.children)
    }

}

export default ResponsiveControl

