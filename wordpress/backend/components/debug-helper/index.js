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

    Toolbar,
    ToolbarGroup,
    ToolbarButton,
} = wp.components;

const {
    BlockControls,
} = wp.blockEditor

// import get from 'lodash.get'
import {get} from 'lodash'





import JSONTree from 'react-json-tree'
import ReactJson from 'react-json-view'
import { getIcon } from '../../utils';


// import { bug as bugIcon } from '@wordpress/icons'
import { SVG, Path } from '@wordpress/primitives';
const bug = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path
			d="M6.13 5.5l1.926 1.927A4.975 4.975 0 007.025 10H5v1.5h2V13H5v1.5h2.1a5.002 5.002 0 009.8 0H19V13h-2v-1.5h2V10h-2.025a4.979 4.979 0 00-1.167-2.74l1.76-1.76-1.061-1.06-1.834 1.834A4.977 4.977 0 0012 5.5c-1.062 0-2.046.33-2.855.895L7.19 4.44 6.13 5.5zm2.37 5v3a3.5 3.5 0 107 0v-3a3.5 3.5 0 10-7 0z"
			fillRule="evenodd"
			clipRule="evenodd"
		/>
	</SVG>
);



class DebugHelper extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            visible: this.props.attributes?.debug || false
        }

        // this.debugger = this.debugger.bind(this)

        // console.log(this)
    }


    // debugger() {
    //     if( this.state.visible ) return <ReactJson src={this.props.data} enableClipboard={false}/>
    //     else return
    // }

    render() {

        // const Debugger = () => {
        //     if( !this.state.visible ) return 
            
        //     return <ReactJson src={this.props.data || {} } enableClipboard={false}/>
        // }


        const renderArray = [
            <BlockControls>
                <ToolbarGroup>
                    {/* <ToolbarButton icon={ formatBold } label="Bold" />
                    <ToolbarButton icon={ formatItalic } label="Italic" /> */}
                    <ToolbarButton icon={ bug } label="Debug" 
                        isPressed={this.state.visible}
                        onClick={
                            () => {
                                this.setState({
                                    visible: !this.state.visible
                                })

                                if( typeof this.props.setAttributes == 'function') {
                                    this.props.setAttributes({
                                        debug: !this.state.visible
                                    })
                                }
                                // console.log(this)
                                // try {
                                // if( this.props )    this.props.setAttributes({
                                //         debug: !this.state.visible
                                //     })
                                // } catch(e) {}
                            }
                        }
                    />
                </ToolbarGroup>
            </BlockControls>
        ]

        if( this.state.visible ) renderArray.push(
            <ReactJson src={this.props.data || {} } enableClipboard={true}/>
        )



        return renderArray
    }
} 


export default DebugHelper