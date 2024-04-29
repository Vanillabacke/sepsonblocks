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
    RichTextToolbarButton,
    // RichTextShortcut,
} = wp.editor;



const {
    Path,
    SVG,
    TextControl,
    Popover,
    Button, 
} = wp.components
const { 
    useState 
} = wp.element
const { 
    insertObject,
    useAnchorRef 
} = wp.richText
const {
	MediaUpload,
	MediaUploadCheck,
} = wp.blockEditor

// const {
//     keyboardReturn 
// } = wp.icons









const name = 'vanillablocks/custombreak';
const title = 'Custom Break'






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






const ALLOWED_MEDIA_TYPES = [ 'image' ];

// const name = 'core/image';
// const title = __( 'Inline image' );

export const image = {
	name,
	title,
	keywords: [ __( 'photo' ), __( 'media' ) ],
	object: true,
	// tagName: 'img',
	tagName: 'span',
	className: 'custom-image',
	attributes: {
		className: 'class',
		style: 'style',
		url: 'src',
		alt: 'alt',
	},
	edit: Edit,
};

export default image

function InlineUI( { value, onChange, activeObjectAttributes, contentRef } ) {
	const { style } = activeObjectAttributes;
	const [ width, setWidth ] = useState( style?.replace( /\D/g, '' ) );
	const anchorRef = useAnchorRef( {
		ref: contentRef,
		value,
		settings: image,
	} );

	return (
		<Popover
			position="bottom center"
			focusOnMount={ false }
			anchorRef={ anchorRef }
			className="block-editor-format-toolbar__image-popover"
		>
			<form
				className="block-editor-format-toolbar__image-container-content"
				onSubmit={ ( event ) => {
					const newReplacements = value.replacements.slice();

					newReplacements[ value.start ] = {
						type: name,
						attributes: {
							...activeObjectAttributes,
							// style: width ? `width: ${ width }px;` : '',
                            style: 'display: inline-block; width: 10px; height: 20px; background: #ffc; border: 1px solid #f0c; font-weight: bold; content: "CB";'
						},
					};

					onChange( {
						...value,
						replacements: newReplacements,
					} );

					event.preventDefault();
				} }
			>
				<TextControl
					className="block-editor-format-toolbar__image-container-value"
					type="number"
					label={ __( 'Width' ) }
					value={ width }
					min={ 1 }
					onChange={ ( newWidth ) => setWidth( newWidth ) }
				/>
				<Button
					// icon={ keyboardReturn }
					label={ __( 'Apply' ) }
					type="submit"
				/>
			</form>
		</Popover>
	);
}

function Edit( {
	value,
	onChange,
	onFocus,
	isObjectActive,
	activeObjectAttributes,
	contentRef,
} ) {
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	function openModal() {
		setIsModalOpen( true );
	}

	function closeModal() {
		setIsModalOpen( false );
	}

	return (
		<MediaUploadCheck>
			<RichTextToolbarButton
				icon={
					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<Path d="M4 18.5h16V17H4v1.5zM16 13v1.5h4V13h-4zM5.1 15h7.8c.6 0 1.1-.5 1.1-1.1V6.1c0-.6-.5-1.1-1.1-1.1H5.1C4.5 5 4 5.5 4 6.1v7.8c0 .6.5 1.1 1.1 1.1zm.4-8.5h7V10l-1-1c-.3-.3-.8-.3-1 0l-1.6 1.5-1.2-.7c-.3-.2-.6-.2-.9 0l-1.3 1V6.5zm0 6.1l1.8-1.3 1.3.8c.3.2.7.2.9-.1l1.5-1.4 1.5 1.4v1.5h-7v-.9z" />
					</SVG>
				}
				title={ title }
				onClick={ openModal }
				isActive={ isObjectActive }
			/>
			{ isModalOpen && (
				<MediaUpload
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					onSelect={ ( { id, url, alt, width: imgWidth } ) => {
						closeModal();
						onChange(
							insertObject( value, {
								type: name,
								attributes: {
									className: `wp-image-${ id }`,
									// style: `width: ${ Math.min(
									// 	imgWidth,
									// 	150
									// ) }px;`,

                                    style: 'display: inline-block; width: 30px; height: 20px; background: #f0c; border: 1px solid #f0c; font-weight: bold; content: "CB";',

									url,
									alt,
								},
							} )
						);
						onFocus();
					} }
					onClose={ closeModal }
					render={ ( { open } ) => {
						open();
						return null;
					} }
				/>
			) }
			{ isObjectActive && (
				<InlineUI
					value={ value }
					onChange={ onChange }
					activeObjectAttributes={ activeObjectAttributes }
					contentRef={ contentRef }
				/>
			) }
		</MediaUploadCheck>
	);
}































// const image = {
//     name,
// 	title,
// 	keywords: [ __( 'responsive' ), __( 'break' ) ],
// 	object: true,
// 	tagName: 'span',
// 	className: 'custom-break',
// 	attributes: {
//         className: 'class',
// 		style: 'style',
// 		// url: 'src',
// 		// alt: 'alt',
// 	},
// 	edit: Edit,
// }

// export default image



// function InlineUI( { value, onChange, activeObjectAttributes, contentRef } ) {

//     console.log(  { value, onChange, activeObjectAttributes, contentRef } )
// 	const { style } = activeObjectAttributes;
// 	const [ width, setWidth ] = useState( style?.replace( /\D/g, '' ) );
// 	const anchorRef = useAnchorRef( {
// 		ref: contentRef,
// 		value,
// 		settings: image,
// 	} );


//     return (<div>SHEEESH</div>)

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

//                     console.log( "submit format")

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

 

// export function Edit (
//     {
//         value,
//         onChange,
//         onFocus,
//         isObjectActive,
//         activeObjectAttributes,
//         contentRef,
//     } 
// ) {
    
//     const [ isModalOpen, setIsModalOpen ] = useState( false );

//     function openModal() {
//         setIsModalOpen( true );
//     }

//     function closeModal() {
//         setIsModalOpen( false );
//     }


//     function insertBreak () {
//         // console.log("insert break")
//         insertObject( value, {
//             type: name,
//             attributes: {
//                 className: 'custom-break',
//                 style: 'display: inline-block; width: 10px; height: 20px; background: #ffc; border: 1px solid #f0c; font-weight: bold; content: "CB";'
//                 // className: `wp-image-${ id }`,
//                 // style: `width: ${ Math.min(
//                 //     imgWidth,
//                 //     150
//                 // ) }px;`,
//                 // url,
//                 // alt,
//             },
//         } )
//     }



//     return (
//         <Fragment>


//             <RichTextToolbarButton
// 				icon={
// 					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
// 						<Path d="M4 18.5h16V17H4v1.5zM16 13v1.5h4V13h-4zM5.1 15h7.8c.6 0 1.1-.5 1.1-1.1V6.1c0-.6-.5-1.1-1.1-1.1H5.1C4.5 5 4 5.5 4 6.1v7.8c0 .6.5 1.1 1.1 1.1zm.4-8.5h7V10l-1-1c-.3-.3-.8-.3-1 0l-1.6 1.5-1.2-.7c-.3-.2-.6-.2-.9 0l-1.3 1V6.5zm0 6.1l1.8-1.3 1.3.8c.3.2.7.2.9-.1l1.5-1.4 1.5 1.4v1.5h-7v-.9z" />
// 					</SVG>
// 				}
// 				// title={ title }
//                 title={ __( 'xCustom Break' ) }
// 				onClick={ openModal }
// 				isActive={ isObjectActive }
// 			/>



//             { isModalOpen && (
// 				<button
//                     onClick={ (onChange) => {

//                         closeModal();
// 						onChange(
//                             insertObject( value, {
//                                 type: name,
//                                 attributes: {
//                                     className: 'custom-break',
//                                     style: 'display: inline-block; width: 10px; height: 20px; background: #ffc; border: 1px solid #f0c; font-weight: bold; content: "CB";'
//                                     // className: `wp-image-${ id }`,
//                                     // style: `width: ${ Math.min(
//                                     //     imgWidth,
//                                     //     150
//                                     // ) }px;`,
//                                     // url,
//                                     // alt,
//                                 },
//                             } )
// 						);
// 						onFocus();
//                         }
//                     }
//                     >
//                     break
//                 </button>
//             ) }

//             { isObjectActive && (
//                 <InlineUI
//                     value={ value }
//                     onChange={ onChange }
//                     activeObjectAttributes={ activeObjectAttributes }
//                     contentRef={ contentRef }
//                 />
//             ) }

            

//             {/* <RichTextShortcut
//                 type="primary"
//                 character="u"
//                 // onUse={ onToggle }
//                 // onUse={ openModal }
//                 onUse={ insertBreak }
//             />
//             <RichTextToolbarButton
//                 icon="editor-underline"
//                 title={ __( 'xCustom Break' ) }
//                 // onClick={ onToggle }
//                 // onClick={ openModal }
//                 onClick={ insertBreak }
//                 // isActive={ isActive }
//                 shortcutType="primary"
//                 shortcutCharacter="u"
//             />

//             { isObjectActive && (
//                 <InlineUI
//                     value={ value }
//                     onChange={ onChange }
//                     activeObjectAttributes={ activeObjectAttributes }
//                     contentRef={ contentRef }
//                 />
//             ) }  */}
//         </Fragment>
//     );

// }







// // export default {
// // 	name, //: 'vanillablocks/preventbreak',
// // 	title: __( 'customBreak' ),
// // 	// tagName: 'div',
// // 	tagName: 'span',
// // 	className: 'custom-break',
// // 	attributes: {
// // 		style: 'style',
// // 	},
// // 	edit( {
// //         value,
// //         onChange,
// //         onFocus,
// //         isObjectActive,
// //         activeObjectAttributes,
// //         contentRef,
// //     } ) {
		

// //         const [ isModalOpen, setIsModalOpen ] = useState( false );

// //         function openModal() {
// //             setIsModalOpen( true );
// //         }

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
