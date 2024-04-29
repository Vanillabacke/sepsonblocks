/**
 * WordPress dependencies
 */
 const { __ } = wp.i18n;
 const {
     Component,
     Fragment,

     useRef,
     useState,
     useEffect,
} = wp.element;
const { 
    compose,
    //  withState 
} = wp.compose;



const {
    InspectorControls,
    ResponsiveBlockControl,
} = wp.editor

const {
    DimensionControl,
} = wp.components


const {
    RichText,
} = wp.blockEditor









// const {
//     toggleFormat
// } = wp.richText;

// const {
//     RichTextToolbarButton,
//     RichTextShortcut
// } = wp.editor;

const {
    registerFormatType
} = wp.richText;



import preventBreak from './format-library/prevent-break'
import customBreak from './format-library/custom-break'
// console.log( preventBreak )


// // const name = 'vanillablocks/preventbreak';
// const underline = {
// 	name: 'vanillablocks/preventbreak',
// 	title: __( 'preventBreak' ),
// 	// tagName: 'div',
// 	tagName: 'span',
// 	className: 'prevent-break',
// 	attributes: {
// 		style: 'style',
// 	},
// 	edit( { isActive, value, onChange } ) {
// 		const onToggle = () => {
// 			onChange(
// 				toggleFormat( value, {
// 					type: 'vanillablocks/preventbreak',
// 					attributes: {
// 						style: 'text-decoration: underline; color: #f0c; hyphens: none;',
// 					},
// 				} ) 
// 			);
// 		};
// 		return (
// 			<Fragment>
// 				<RichTextShortcut
// 					type="primary"
// 					character="u"
// 					onUse={ onToggle }
// 				/>
// 				<RichTextToolbarButton
// 					icon="editor-underline"
// 					title={ __( 'preventBreak' ) }
// 					onClick={ onToggle }
// 					isActive={ isActive }
// 					shortcutType="primary"
// 					shortcutCharacter="u"
// 				/>
// 			</Fragment>
// 		);

// 	},
// };


// const customBreak = {
// 	name: 'vanillablocks/custombreak',
// 	title: __( 'customBreak' ),
// 	// tagName: 'div',
// 	tagName: 'span',
// 	className: 'custom-break',
// 	attributes: {
// 		style: 'style',
// 	},
// 	edit( { isActive, value, onChange } ) {
// 		const onToggle = () => {
//             console.log({ isActive, value, onChange })
// 			// onChange(

// 				// toggleFormat( value, {
// 				// 	type: 'vanillablocks/custombreak',
// 				// 	attributes: {
// 				// 		style: 'text-decoration: underline; color: #f0c; hyphens: none;',
// 				// 	},
// 				// } ) 
// 			// );
// 		};
// 		return (
// 			<Fragment>
// 				<RichTextShortcut
// 					type="primary"
// 					character="u"
// 					onUse={ onToggle }
// 				/>
// 				<RichTextToolbarButton
// 					icon="editor-underline"
// 					title={ __( 'customBreak' ) }
// 					onClick={ onToggle }
// 					onClick={ onToggle }
// 					isActive={ isActive }
// 					shortcutType="primary"
// 					shortcutCharacter="u"
// 				/>
// 			</Fragment>
// 		);

// 	},
// };

// import registerResponsiveBreak from 'Components/responsive-break'

// console.log( registerResponsiveBreak )

function registerFormats () {
    // registerResponsiveBreak();
    // console.log("test");
	[
        customBreak,
        preventBreak,
		// underline,
        // customBreak,
	].forEach( ( { name, ...settings } ) => registerFormatType( name, settings ) );
};
registerFormats();



//  import {
// 	InspectorControls,
// 	ResponsiveBlockControl,
// } from '@wordpress/block-editor';

// import {
// 	DimensionControl,
// } from '@wordpress/components';


// import VanillaGrid from '../../../../../web-components/backend' 

/**
 * Block edit function
 */





function Edit(props) {

    const {
        attributes,
        setAttributes,
    } = props

    const {
        content
    } = attributes

    // const [text, setText]  = useState('It is a period of civil war. <div class="custom-break" style="font-weight:bold;">test</div>Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy…')
    // const [text, setText]  = useState('Damit alles rund läuft am Wasserskilift, im ProShop, der Gastronomie<span class="custom-break" contenteditable="false"></span>und jeder Gast sich wohl fühlt, braucht man ein starkes Team. Hier ein kurzer Überblick<span class="custom-break" contenteditable="false"></span>über unsere Mannschaft und die einzelnen Aufgabenbereiche. Wir sind stets bemüht Ihren Aufenthalt<span class="custom-break" contenteditable="false"></span>so angenehm wie möglich zu gestalten und freuen uns auf Anregungen!')
    // const [text, setText]  = useState('Damit alles rund <vc-break></vc-break> läuft am Wasserskilift, im ProShop, der Gastronomie und jeder Gast sich wohl fühlt, braucht man ein starkes Team. Hier ein kurzer Überblick über unsere Mannschaft und die einzelnen Aufgabenbereiche. Wir sind stets bemüht Ihren Aufenthalt so angenehm wie möglich zu gestalten und freuen uns auf Anregungen!')
    const [text, setText]  = useState(content)

    useEffect( () => {
        setAttributes({content: text})
    }, [text])
    
    
    // const editorRef = useRef()


    // const onClick = (e) => {
    //     if( !e.target.classList.contains('custom-break')) return 
    //     console.log('click', e )
    // }


    // useEffect( () => {
    // //     // console.log( text )
    //     if( editorRef.current ) {
    //         editorRef.current.addEventListener('click', onClick)
    //     }

    //     return () => {
    //         editorRef.current.removeEventListener('click', onClick)
    //     }
    // }, [])

    // useEffect( () => {
    //     console.log( text )
    // }, [text])
    
    return (
        <div>
            <p>Edit</p>
            {/* <vc-break></vc-break> */}

            <RichText
                // ref={editorRef}
                style={{
                    hyphens: 'auto'
                }}
                tagName='p'
                className='card-subheading'
                value={text}
                onChange={(newVal) => setText(newVal)}
                // onChange={(newVal) => setAttributes({subheading: newVal})}
                placeholder="Subheading Goes Here"
            />
        </div>
    )
}






//  class Edit extends Component {

// 	constructor( props ) {
// 		super( ...arguments );

// 		this.state = {
// 			isResponsive: false,
// 			paddingSize: 10,
// 		}
// 	}



// 	render() {

// 		// const {
// 		// 	// clientId,
// 		// 	// attributes,
// 		// 	// className,
// 		// 	// setAttributes,

// 		// } = this.props

// 		// const {
			

// 		// } = attributes;

// 		const {
// 			isResponsive,
// 			paddingSize,
// 		} = this.state

// 		// const { paddingSize } = this.props.attributes;


// 		const sizeOptions = [
// 			{
// 				label: 'Small',
// 				value: 'small',
// 			},
// 			{
// 				label: 'Medium',
// 				value: 'medium',
// 			},
// 			{
// 				label: 'Large',
// 				value: 'large',
// 			},
// 		];

// 		// Your custom control can be anything you'd like to use.
// 		// You are not restricted to `DimensionControl`s, but this
// 		// makes life easier if dealing with standard CSS values.
// 		// see `packages/components/src/dimension-control/README.md`
// 		// const paddingControl = ( labelComponent, viewport ) => {
// 		// 	// return (
// 		// 	// 	<DimensionControl label="DimensionControl"></DimensionControl>
// 		// 	// )
// 		// 		<DimensionControl
// 		// 			label={ "viewport.label" }
// 		// 			// onChange={
// 		// 			// 	// handle update to padding value here
// 		// 			// }
// 		// 			value={ this.state.paddingSize }
// 		// 		/>

// 		// }

	



// 		return (
// 			<Fragment>

// 				<InspectorControls>
// 					{/* <ResponsiveBlockControl
// 						title='Block Padding'
// 						property='padding'
// 						// renderDefaultControl={paddingControl}
// 						// isResponsive={ isResponsive }
// 						// onIsResponsiveChange={ () => {
// 						// 	setIsResponsive( ! isResponsive );
// 						// } }
// 					/> */}
// 					<h2>Inspector</h2>
// 				</InspectorControls>


// 				 {/* <InspectorControls>
// 					<ResponsiveBlockControl
// 						title='Block Padding'
// 						property='padding'
// 						renderDefaultControl={paddingControl}
// 						isResponsive={ isResponsive }
// 						// onIsResponsiveChange={ () => {
// 						// 	setIsResponsive( ! isResponsive );
// 						// } }
// 					/>
// 				</InspectorControls> */}

// {/* <ResponsiveBlockControl
// 						title='Block Padding'
// 						property='padding'
// 						renderDefaultControl={paddingControl}
// 						isResponsive={ isResponsive }
// 						// onIsResponsiveChange={ () => {
// 						// 	setIsResponsive( ! isResponsive );
// 						// } }
// 					/>  */}



// 	       		<h1>Test Block</h1>
// 				   <vc-col size="12" order="3" order-m="3">Column 1</vc-col>
// 				   <vc-row>
// 			<vc-col
// 				size="12"
// 				xxl="10"
// 				xl="8"
// 				l="7"
// 				m="6"
// 				s="4"
// 				xs="2"
// 			>
// 				Column 1</vc-col>
// 		</vc-row>
// 				   <vc-row grid="10">
// 						<vc-col size="2" m="12" order="3" order-m="3">Column 1</vc-col>
// 						<vc-col size="4" m="12" order="2" order-m="1">Column 2</vc-col>
// 						<vc-col size="12" m="12" order="1" order-m="2">Column 3</vc-col>
// 					</vc-row>
// 	       	</Fragment>
// 		)

// 	}
// };


export default compose()( Edit );
