const {
    Fragment,
    useEffect,
    useLayoutEffect,
    useRef,
} = wp.element;
const { __ } = wp.i18n
const {
    RichTextShortcut,
    __unstableRichTextInputEvent,
} = wp.blockEditor


const {
    RichTextToolbarButton,
    // RichTextShortcut,
    BlockControls,
    InspectorControls,
} = wp.editor;



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
    useState 
} = wp.element
const { 
    insertObject,
    useAnchorRef,
    
    toggleFormat,
    insert,
    create,
} = wp.richText
const {
	MediaUpload,
	MediaUploadCheck,
    InspectorControl,
} = wp.blockEditor


const {
    getRectangleFromRange,
} = wp.dom;



const { 
    compose,
    ifCondition,
} = wp.compose;

const {
    withSelect,
} = wp.data;

const {
    renderToString,
} = wp.element;

// const {
//     keyboardReturn 
// } = wp.icons






import './style.scss'

// import {
//     BreakIcon,
//     HyphensIcon,
// } from './icons'
// import Icons from './icons'


const name = 'vanillablocks/custombreak';
const title = 'Custom Break'





const ALLOWED_MEDIA_TYPES = [ 'image' ];

// const name = 'core/image';
// const title = __( 'Inline image' );

export const image = {
	name,
	title,
	keywords: [ __( 'photo' ), __( 'media' ) ],
	object: true,
	// tagName: 'img',
	// tagName: 'span',
	tagName: 'vc-break',
	className: 'custom-image',
	attributes: {
		className: 'class',
		style: 'style',
		url: 'src',
		alt: 'alt',
	},
	edit: Edit,
};


export function BreakIcon() {
  return (<svg alt="BreakIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M18 5.5h-5.25V20H6v-1.5h5.25V4H18v1.5z" /></svg> )
}
export function HyphensIcon() {
  return (<svg alt="HyphensIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M6.8 10h1.5a3.7 3.7 0 1 1 7.4 0h1.5A5.23 5.23 0 0 0 12 4.8 5.16 5.16 0 0 0 6.8 10Zm5.2 7.7A3.76 3.76 0 0 1 8.3 14H6.8a5.2 5.2 0 1 0 10.4 0h-1.5a3.76 3.76 0 0 1-3.7 3.7Z" /></svg> )
}




function CustomInlineBreak() {

  return (
    <span onClick={(e) => {
        // setData(Math.round()*100)
        console.log( "hallo")
    }}>
        CustomInlineBreak
    </span>
  )
}



let anchorRange

export function Edit( props ) {
    const {
        name,
        value,
        onChange,
        onFocus,
        isObjectActive,
        activeObjectAttributes,
        contentRef,
    } = props
    

    const [isOpen, setIsOpen] = useState(false)
    const [selectedBreak, setSelectedBreak] = useState(false)



    const onClick = (e) => {
        if( !e.target.classList.contains('custom-break')) {
            return setSelectedBreak(false)
        }
        console.log('click', e )

        e.target.classList.add('selected')
        setSelectedBreak( e.target )
    }


    useLayoutEffect( () => {

        setTimeout( () => {
            if( selectedBreak ) selectedBreak.classList.add('selected')
        }, 25)
        // if( selectedBreak ) {
        //     console.log("selected")
        //     setTimeout( () => {
        //         selectedBreak.classList.add('selected')
        //     }, 25)
        // }
    }, [selectedBreak] )


    useEffect( () => {
    //     // console.log( text )
        if( contentRef.current ) {
            contentRef.current.addEventListener('click', onClick)
        }

        return () => {
            contentRef.current.removeEventListener('click', onClick)
        }

    }, [])




    const toggleBreak = () => {
        setIsOpen(!isOpen)

        const selection = window.getSelection();
        anchorRange = selection.rangeCount > 0 ? selection.getRangeAt( 0 ) : null;


            // let temp = create({'html' : '<span class="custom-break" aria-hidden="true" contenteditable="false">SHEESH</span>'});
            //  let temp = create({'html' : '<span class="custom-break" onclick="console.log(\'hallo\')" aria-hidden="true" contenteditable="false">SHEESH</span>'});
            //  const handle = renderToString( <CustomInlineBreak /> )
            // const handle = renderToString( <span
            //     className="custom-break"
            //     contenteditable={false}
            // >
            //      {/* <BreakIcon /> */}

            //      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M18 5.5h-5.25V20H6v-1.5h5.25V4H18v1.5z" fill="%007cba" /></svg> */}
                 
            //      {/* <Icon
            //         icon={ () => (
            //             <BreakIcon />
            //             // <svg>
            //             //     <path d="M5 4v3h5.5v12h3V7H19V4z" />
            //             // </svg>
            //         ) }
            //     /> */}
            // </span> )




            // const handle = renderToString( <vc-break
            //     className="custom-break"
            //     contenteditable={false}
            // >
            //      {/* <BreakIcon /> */}

            //      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M18 5.5h-5.25V20H6v-1.5h5.25V4H18v1.5z" fill="%007cba" /></svg> */}
                 
            //      {/* <Icon
            //         icon={ () => (
            //             <BreakIcon />
            //             // <svg>
            //             //     <path d="M5 4v3h5.5v12h3V7H19V4z" />
            //             // </svg>
            //         ) }
            //     /> */}
            // </vc-break> )

            const handle = renderToString(<vc-break
                className="custom-break"
                contenteditable={false}
            ><br /></vc-break> )


             let temp = create({'html' : handle});
            //  let temp = create({'html' : `<span class="custom-break" contenteditable="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M18 5.5h-5.25V20H6v-1.5h5.25V4H18v1.5z" fill="%23ff00cc"/></svg></span>`});
            //  let temp = create({'html' : `<span class="custom-break" contenteditable="false">
            //  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            //     <path d="M18 5.5h-5.25V20H6v-1.5h5.25V4H18v1.5z" fill="%23ff00cc"></path>
            //  </svg></span>`});
//              let temp = create({'html' : `<span class="custom-break" contenteditable="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 5.5h-5.25V20H6v-1.5h5.25V4H18v1.5z"></path></svg>
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 5.5h-5.25V20H6v-1.5h5.25V4H18v1.5z"></path></svg></span>`});
            //  let temp = create({'element' : <CustomInlineBreak />});

            //  console.log( temp )
             onChange( insert( value,  temp ) )

    }




    const anchorRect = () => {
        return getRectangleFromRange( anchorRange );
    }



    return (
        <Fragment>

            <InspectorControls key="breaksettings">
                {/* <Button>hallo</Button> */}
                { selectedBreak && (
                    <h1>Break is selected</h1>
                )}
            </InspectorControls>
           
            <BlockControls>


                <Toolbar>

                    <IconButton
                        // icon={ "flag" }
                        // icon={ <Icons.break /> }
                        icon={ <BreakIcon /> }
                        aria-haspopup="true"
                        tooltip={ __('Responsive Break') }
                        onClick={ toggleBreak }
                    >
                    </IconButton>
                    

                    {/* { isOpen && (
                        <Popover
                            className="gt-md-icons-popover"
                            position="bottom center"
                            key="icon-popover"
                            onClick={ () => {} }
                            getAnchorRect={ anchorRect }
                            expandOnMobile={ true }
                            headerTitle={ __( 'Insert Icon', 'gt-md-icons' ) }
                            onClose={ () => {
                                onChange( toggleFormat( value, { type: name } ) );
                            } }
                        >
                            <Button
                                isTertiary
                                onClick={ () => {
                                    // let temp = create({'html' : '<span class="custom-break" aria-hidden="true" contenteditable="false">SHEESH</span>'});
                                    let temp = create({'html' : '<span class="custom-break" onclick="console.log(\'hallo\')" aria-hidden="true" contenteditable="false">SHEESH</span>'});
                                    // const handle = renderToString( <CustomInlineBreak /> )
                                    // let temp = create({'html' : handle});
                                    // let temp = create({'element' : <CustomInlineBreak />});

                                    console.log( temp )
                                    onChange( insert( value,  temp ) )


                                    // onChange(insertObject( value, {
                                    //         type: 'vanillablocks/preventbreak',
                                    //         attributes: {
                                    //             className: 'custom-break',
                                    //             style: 'display: inline-block; width: 10px; height: 20px; background: #ffc; border: 1px solid #f0c; font-weight: bold; content: "CB"; cursor: pointer;',
                                    //             onClick: (e) => {console.log("sheesh click")}
                                    //             // className: `wp-image-${ id }`,
                                    //             // style: `width: ${ Math.min(
                                    //             //     imgWidth,
                                    //             //     150
                                    //             // ) }px;`,
                                    //             // url,
                                    //             // alt,
                                    //         },
                                    //     } )
                                    // )
                                    // onChange( insert( value,  <CustomInlineBreak /> ) )
                                    toggle()
                                } }
                            >
                                Insert Custom Break
                            </Button>
                        </Popover>
                    )} */}

                </Toolbar>
            
            </BlockControls>
        </Fragment>
    )
}







export default image





/*
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
https://github.com/wpgaurav/md-icons-gutenberg
*/






// function InlineUI( { value, onChange, activeObjectAttributes, contentRef } ) {
// 	const { style } = activeObjectAttributes;
// 	const [ width, setWidth ] = useState( style?.replace( /\D/g, '' ) );
// 	const anchorRef = useAnchorRef( {
// 		ref: contentRef,
// 		value,
// 		settings: image,
// 	} );

// 	return (
// 		<Popover
// 			position="bottom center"
// 			focusOnMount={ false }
// 			anchorRef={ anchorRef }
// 			className="block-editor-format-toolbar__image-popover"
// 		>
// 			<form
// 				className="block-editor-format-toolbar__image-container-content"
// 				onSubmit={ ( event ) => {
// 					const newReplacements = value.replacements.slice();

// 					newReplacements[ value.start ] = {
// 						type: name,
// 						attributes: {
// 							...activeObjectAttributes,
// 							// style: width ? `width: ${ width }px;` : '',
//                             style: 'display: inline-block; width: 10px; height: 20px; background: #ffc; border: 1px solid #f0c; font-weight: bold; content: "CB";'
// 						},
// 					};

// 					onChange( {
// 						...value,
// 						replacements: newReplacements,
// 					} );

// 					event.preventDefault();
// 				} }
// 			>
// 				<TextControl
// 					className="block-editor-format-toolbar__image-container-value"
// 					type="number"
// 					label={ __( 'Width' ) }
// 					value={ width }
// 					min={ 1 }
// 					onChange={ ( newWidth ) => setWidth( newWidth ) }
// 				/>
// 				<Button
// 					// icon={ keyboardReturn }
// 					label={ __( 'Apply' ) }
// 					type="submit"
// 				/>
// 			</form>
// 		</Popover>
// 	);
// }

// function Edit( {
// 	value,
// 	onChange,
// 	onFocus,
// 	isObjectActive,
// 	activeObjectAttributes,
// 	contentRef,
// } ) {
// 	const [ isModalOpen, setIsModalOpen ] = useState( false );

// 	function openModal() {
// 		setIsModalOpen( true );
// 	}

// 	function closeModal() {
// 		setIsModalOpen( false );
// 	}

// 	return (
// 		<MediaUploadCheck>
// 			<RichTextToolbarButton
// 				icon={
// 					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
// 						<Path d="M4 18.5h16V17H4v1.5zM16 13v1.5h4V13h-4zM5.1 15h7.8c.6 0 1.1-.5 1.1-1.1V6.1c0-.6-.5-1.1-1.1-1.1H5.1C4.5 5 4 5.5 4 6.1v7.8c0 .6.5 1.1 1.1 1.1zm.4-8.5h7V10l-1-1c-.3-.3-.8-.3-1 0l-1.6 1.5-1.2-.7c-.3-.2-.6-.2-.9 0l-1.3 1V6.5zm0 6.1l1.8-1.3 1.3.8c.3.2.7.2.9-.1l1.5-1.4 1.5 1.4v1.5h-7v-.9z" />
// 					</SVG>
// 				}
// 				title={ title }
// 				onClick={ openModal }
// 				isActive={ isObjectActive }
// 			/>
// 			{ isModalOpen && (
// 				<MediaUpload
// 					allowedTypes={ ALLOWED_MEDIA_TYPES }
// 					onSelect={ ( { id, url, alt, width: imgWidth } ) => {
// 						closeModal();
// 						onChange(
// 							insertObject( value, {
// 								type: name,
// 								attributes: {
// 									className: `wp-image-${ id }`,
// 									// style: `width: ${ Math.min(
// 									// 	imgWidth,
// 									// 	150
// 									// ) }px;`,

//                                     style: 'display: inline-block; width: 30px; height: 20px; background: #f0c; border: 1px solid #f0c; font-weight: bold; content: "CB";',

// 									url,
// 									alt,
// 								},
// 							} )
// 						);
// 						onFocus();
// 					} }
// 					onClose={ closeModal }
// 					render={ ( { open } ) => {
// 						open();
// 						return null;
// 					} }
// 				/>
// 			) }
// 			{ isObjectActive && (
// 				<InlineUI
// 					value={ value }
// 					onChange={ onChange }
// 					activeObjectAttributes={ activeObjectAttributes }
// 					contentRef={ contentRef }
// 				/>
// 			) }
// 		</MediaUploadCheck>
// 	);
// }































// // const image = {
// //     name,
// // 	title,
// // 	keywords: [ __( 'responsive' ), __( 'break' ) ],
// // 	object: true,
// // 	tagName: 'span',
// // 	className: 'custom-break',
// // 	attributes: {
// //         className: 'class',
// // 		style: 'style',
// // 		// url: 'src',
// // 		// alt: 'alt',
// // 	},
// // 	edit: Edit,
// // }

// // export default image



// // function InlineUI( { value, onChange, activeObjectAttributes, contentRef } ) {

// //     console.log(  { value, onChange, activeObjectAttributes, contentRef } )
// // 	const { style } = activeObjectAttributes;
// // 	const [ width, setWidth ] = useState( style?.replace( /\D/g, '' ) );
// // 	const anchorRef = useAnchorRef( {
// // 		ref: contentRef,
// // 		value,
// // 		settings: image,
// // 	} );


// //     return (<div>SHEEESH</div>)

// // 	return (
// // 		<Popover
// // 			position="bottom center"
// // 			focusOnMount={ false }
// // 			anchorRef={ anchorRef }
// // 			className="block-editor-format-toolbar__image-popover"
// // 		>
// // 			<form
// // 				className="block-editor-format-toolbar__image-container-content"
// // 				onSubmit={ ( event ) => {
// // 					const newReplacements = value.replacements.slice();

// //                     console.log( "submit format")

// // 					newReplacements[ value.start ] = {
// // 						type: name,
// // 						attributes: {
// // 							...activeObjectAttributes,
// // 							// style: width ? `width: ${ width }px;` : '',
// //                             style: 'display: inline-block; width: 10px; height: 20px; background: #ffc; border: 1px solid #f0c; font-weight: bold; content: "CB";'
// // 						},
// // 					};

// // 					onChange( {
// // 						...value,
// // 						replacements: newReplacements,
// // 					} );

// // 					event.preventDefault();
// // 				} }
// // 			>
// // 				<TextControl
// // 					className="block-editor-format-toolbar__image-container-value"
// // 					type="number"
// // 					label={ __( 'Width' ) }
// // 					value={ width }
// // 					min={ 1 }
// // 					onChange={ ( newWidth ) => setWidth( newWidth ) }
// // 				/>
// // 				<Button
// // 					// icon={ keyboardReturn }
// // 					label={ __( 'Apply' ) }
// // 					type="submit"
// // 				/>
// // 			</form>
// // 		</Popover>
// // 	);
// // }

 

// // export function Edit (
// //     {
// //         value,
// //         onChange,
// //         onFocus,
// //         isObjectActive,
// //         activeObjectAttributes,
// //         contentRef,
// //     } 
// // ) {
    
// //     const [ isModalOpen, setIsModalOpen ] = useState( false );

// //     function openModal() {
// //         setIsModalOpen( true );
// //     }

// //     function closeModal() {
// //         setIsModalOpen( false );
// //     }


// //     function insertBreak () {
// //         // console.log("insert break")
// //         insertObject( value, {
// //             type: name,
// //             attributes: {
// //                 className: 'custom-break',
// //                 style: 'display: inline-block; width: 10px; height: 20px; background: #ffc; border: 1px solid #f0c; font-weight: bold; content: "CB";'
// //                 // className: `wp-image-${ id }`,
// //                 // style: `width: ${ Math.min(
// //                 //     imgWidth,
// //                 //     150
// //                 // ) }px;`,
// //                 // url,
// //                 // alt,
// //             },
// //         } )
// //     }



// //     return (
// //         <Fragment>


// //             <RichTextToolbarButton
// // 				icon={
// // 					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
// // 						<Path d="M4 18.5h16V17H4v1.5zM16 13v1.5h4V13h-4zM5.1 15h7.8c.6 0 1.1-.5 1.1-1.1V6.1c0-.6-.5-1.1-1.1-1.1H5.1C4.5 5 4 5.5 4 6.1v7.8c0 .6.5 1.1 1.1 1.1zm.4-8.5h7V10l-1-1c-.3-.3-.8-.3-1 0l-1.6 1.5-1.2-.7c-.3-.2-.6-.2-.9 0l-1.3 1V6.5zm0 6.1l1.8-1.3 1.3.8c.3.2.7.2.9-.1l1.5-1.4 1.5 1.4v1.5h-7v-.9z" />
// // 					</SVG>
// // 				}
// // 				// title={ title }
// //                 title={ __( 'xCustom Break' ) }
// // 				onClick={ openModal }
// // 				isActive={ isObjectActive }
// // 			/>



// //             { isModalOpen && (
// // 				<button
// //                     onClick={ (onChange) => {

// //                         closeModal();
// // 						onChange(
// //                             insertObject( value, {
// //                                 type: name,
// //                                 attributes: {
// //                                     className: 'custom-break',
// //                                     style: 'display: inline-block; width: 10px; height: 20px; background: #ffc; border: 1px solid #f0c; font-weight: bold; content: "CB";'
// //                                     // className: `wp-image-${ id }`,
// //                                     // style: `width: ${ Math.min(
// //                                     //     imgWidth,
// //                                     //     150
// //                                     // ) }px;`,
// //                                     // url,
// //                                     // alt,
// //                                 },
// //                             } )
// // 						);
// // 						onFocus();
// //                         }
// //                     }
// //                     >
// //                     break
// //                 </button>
// //             ) }

// //             { isObjectActive && (
// //                 <InlineUI
// //                     value={ value }
// //                     onChange={ onChange }
// //                     activeObjectAttributes={ activeObjectAttributes }
// //                     contentRef={ contentRef }
// //                 />
// //             ) }

            

// //             {/* <RichTextShortcut
// //                 type="primary"
// //                 character="u"
// //                 // onUse={ onToggle }
// //                 // onUse={ openModal }
// //                 onUse={ insertBreak }
// //             />
// //             <RichTextToolbarButton
// //                 icon="editor-underline"
// //                 title={ __( 'xCustom Break' ) }
// //                 // onClick={ onToggle }
// //                 // onClick={ openModal }
// //                 onClick={ insertBreak }
// //                 // isActive={ isActive }
// //                 shortcutType="primary"
// //                 shortcutCharacter="u"
// //             />

// //             { isObjectActive && (
// //                 <InlineUI
// //                     value={ value }
// //                     onChange={ onChange }
// //                     activeObjectAttributes={ activeObjectAttributes }
// //                     contentRef={ contentRef }
// //                 />
// //             ) }  */}
// //         </Fragment>
// //     );

// // }







// // // export default {
// // // 	name, //: 'vanillablocks/preventbreak',
// // // 	title: __( 'customBreak' ),
// // // 	// tagName: 'div',
// // // 	tagName: 'span',
// // // 	className: 'custom-break',
// // // 	attributes: {
// // // 		style: 'style',
// // // 	},
// // // 	edit( {
// // //         value,
// // //         onChange,
// // //         onFocus,
// // //         isObjectActive,
// // //         activeObjectAttributes,
// // //         contentRef,
// // //     } ) {
		

// // //         const [ isModalOpen, setIsModalOpen ] = useState( false );

// // //         function openModal() {
// // //             setIsModalOpen( true );
// // //         }

// //         function closeModal() {
// //             setIsModalOpen( false );
// //         }



// // 		return (
// // 			<Fragment>
// // 				<RichTextShortcut
// // 					type="primary"
// // 					character="u"
// // 					onUse={ onToggle }
// // 				/>
// // 				<RichTextToolbarButton
// // 					icon="editor-underline"
// // 					title={ __( 'preventBreak' ) }
// // 					onClick={ onToggle }
// // 					isActive={ isActive }
// // 					shortcutType="primary"
// // 					shortcutCharacter="u"
// // 				/>

// //                 { isObjectActive && (
// //                     <InlineUI
// //                         value={ value }
// //                         onChange={ onChange }
// //                         activeObjectAttributes={ activeObjectAttributes }
// //                         contentRef={ contentRef }
// //                     />
// //                 ) }
// // 			</Fragment>
// // 		);

// // 	},
// // };
