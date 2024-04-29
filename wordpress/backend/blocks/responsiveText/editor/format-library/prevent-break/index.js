/**
 * WordPress dependencies
 */
//  import { __ } from '@wordpress/i18n';
//  import { toggleFormat } from '@wordpress/rich-text';
//  import {
//      RichTextShortcut,
//      __unstableRichTextInputEvent,
//  } from '@wordpress/block-editor';
 

const {
    Fragment,
} = wp.element;
const { __ } = wp.i18n
const { toggleFormat } = wp.richText
const {
    RichTextShortcut,
    __unstableRichTextInputEvent,
} = wp.blockEditor


const {
    Path,
    SVG,
    TextControl,
    Popover,
    Button, 

    Toolbar,
    IconButton,
    Icon,
    Panel,
    Tooltip,

} = wp.components

const {
    BlockControls,
} = wp.editor;





// const {
//     toggleFormat
// } = wp.richText;

const {
    RichTextToolbarButton,
    // RichTextShortcut,
} = wp.editor;


import './style.scss'

export function HyphensIcon() {
    return (<svg alt="HyphensIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M6.8 10h1.5a3.7 3.7 0 1 1 7.4 0h1.5A5.23 5.23 0 0 0 12 4.8 5.16 5.16 0 0 0 6.8 10Zm5.2 7.7A3.76 3.76 0 0 1 8.3 14H6.8a5.2 5.2 0 1 0 10.4 0h-1.5a3.76 3.76 0 0 1-3.7 3.7Z" /></svg> )
  }
  



const name = 'vanillablocks/preventbreak';
export default {
	name, //: 'vanillablocks/preventbreak',
	title: __( 'preventBreak' ),
	// tagName: 'div',
	tagName: 'span',
	className: 'prevent-break',
	attributes: {
		style: 'style',
	},
	edit( { isActive, value, onChange } ) {
		const onToggle = () => {
			onChange(
				toggleFormat( value, {
					type: name, //: 'vanillablocks/preventbreak',
					attributes: {
						// style: 'text-decoration: underline; color: #f0c; hyphens: none;',
					},
				} ) 
			);
		};


		return (
			<Fragment>
                <BlockControls>
                    <Toolbar>

                        <IconButton
                            // icon={ "flag" }
                            // icon={ <Icons.break /> }
                            icon={ <HyphensIcon /> }
                            aria-haspopup="true"
                            tooltip={ __('Prevent Hyphens') }
                            onClick={ onToggle }
                        >
                        </IconButton>
                    </Toolbar>
                </BlockControls>


				{/* <RichTextShortcut
					type="primary"
					character="u"
					onUse={ onToggle }
				/>
				<RichTextToolbarButton
					icon="editor-underline"
					title={ __( 'preventBreak' ) }
					onClick={ onToggle }
					isActive={ isActive }
					shortcutType="primary"
					shortcutCharacter="u"
				/> */}
			</Fragment>
		);

	},
};
