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
    BlockControls,
    ResponsiveBlockControl,
} = wp.editor

const {
    DimensionControl,
} = wp.components


const {
    RichText,
} = wp.blockEditor


// const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;
// const { Fragment } = wp.element;

const {
    MediaUpload,
    MediaUploadCheck,
    URLInputButton,
    // LinkControl,
    __experimentalLinkControl: LinkControl,
    URLPopover,
} = wp.blockEditor;
// const LinkControl = __experimentalLinkControl;


const { withSelect } = wp.data;
const { Button, ResponsiveWrapper, Modal } = wp.components;



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


/**
 * Block edit function
 */







import useImageSelector from '../../blockControls/useImageSelector'

import './editor.scss'



function Edit(props) {

    const {
        attributes,
        setAttributes,

        mediaId,
        mediaUrl,
    } = props

    const {
        content,
        headline,
        subline,
        ctaLabel,
        cta,


        
    } = attributes


 
	const removeMedia = () => {
		props.setAttributes({
			mediaId: 0,
			mediaUrl: ''
		});
	}
 
 	const onSelectMedia = (media) => {
		props.setAttributes({
			mediaId: media.id,
			mediaUrl: media.url
		});
	}
 
	const blockStyle = {
		backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
	};




    const [ isOpen, setOpen ] = useState( false );
    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );
 
    const [_urlText, setUrlText]  = useState(false)
    const [_url, setUrl]  = useState(false)
   
  
    // const [text, setText]  = useState(content)
    const [_headline, setHeadline]  = useState(headline)
    const [_subline, setSubline]  = useState(subline)
    const [_ctaLabel, setCtaLabel]  = useState(ctaLabel)
    const [_cta, setCta]  = useState(cta)

    // useEffect( () => { setAttributes({content: text}) }, [text])
    useEffect( () => { setAttributes({headline: _headline}) }, [_headline])
    useEffect( () => { setAttributes({subline: _subline}) }, [_subline])
    useEffect( () => { setAttributes({ctaLabel: _ctaLabel}) }, [_ctaLabel])
    useEffect( () => { setAttributes({cta: _cta}) }, [_cta])
    

    
   
    return (<Fragment>

            <BlockControls>
                {/* <URLInputButton
                    url={ attributes.url }
                    onChange={ ( url, post ) => setAttributes( { url, text: (post && post.title) || 'Click here' } ) }
                /> */}

            </BlockControls>


        <InspectorControls>
				<PanelBody
					title={__('Select background image')}
					initialOpen={ true }
				>
                

               

					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								value={attributes.mediaId}
								allowedTypes={ ['image'] }
								render={({open}) => (
									<Button 
										className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
										onClick={open}
									>
										{attributes.mediaId == 0 && __('Choose an image', 'awp')}
										{props.media != undefined && 
						            			<ResponsiveWrapper
									    		naturalWidth={ props.media.media_details.width }
											naturalHeight={ props.media.media_details.height }
									    	>
									    		<img src={props.media.source_url} />
									    	</ResponsiveWrapper>
						            		}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.mediaId != 0 && 
							<MediaUploadCheck>
								<MediaUpload
									title={__('Replace image', 'awp')}
									value={attributes.mediaId}
									onSelect={onSelectMedia}
									allowedTypes={['image']}
									render={({open}) => (
										<Button onClick={open} isDefault isLarge>{__('Replace image', 'awp')}</Button>
									)}
								/>
							</MediaUploadCheck>
						}
						{attributes.mediaId != 0 && 
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'awp')}</Button>
							</MediaUploadCheck>
						}
					</div>
				</PanelBody>
			</InspectorControls>







            <div className="hero">
                <div className="hero-background" style={blockStyle}>

                    
                    
                    {!attributes.mediaId && <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectMedia}
                            value={attributes.mediaId}
                            allowedTypes={ ['image'] }
                            render={({open}) => (
                                <Button 
                                    className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                                    onClick={open}
                                >
                                    {attributes.mediaId == 0 && __('Choose an image', 'awp')}
                                    {props.media != undefined && 
                                            <ResponsiveWrapper
                                            naturalWidth={ props.media.media_details.width }
                                        naturalHeight={ props.media.media_details.height }
                                        >
                                            <img src={props.media.source_url} />
                                        </ResponsiveWrapper>
                                        }
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>}



                </div>
                <div className="hero-inner">

                  

                    <RichText
                        allowedFormats={ [ ] }
                        // allowedFormats={ [ 'core/bold', 'core/italic' ] }
                        // ref={editorRef}
                        // style={{
                        //     hyphens: 'auto'
                        // }}
                        tagName='h1'
                        // className='headline-subheading'
                        className='font-headline'
                        value={_headline}
                        onChange={(newVal) => setHeadline(newVal)}
                        // onChange={(newVal) => setAttributes({subheading: newVal})}
                        placeholder="Subheading Goes Here"
                    />


                    <RichText
                        allowedFormats={ [ 'core/link'] }
                        // allowedFormats={ [ 'core/bold', 'core/italic' ] }
                        // ref={editorRef}
                        // style={{
                        //     hyphens: 'auto'
                        // }}
                        tagName='p'
                        // className='headline-subheading'
                        className='font-subline'
                        value={_subline}
                        onChange={(newVal) => setSubline(newVal)}
                        // onChange={(newVal) => setAttributes({subheading: newVal})}
                        placeholder="Subheading Goes Here"
                    />




                    
                    <RichText
                        // allowedFormats={ ['core/link'] }
                        allowedFormats={ [] }
                        // allowedFormats={ [ 'core/bold', 'core/italic' ] }
                        // ref={editorRef}
                        // style={{
                        //     hyphens: 'auto'
                        // }}
                        tagName='button'
                        // className='headline-subheading'
                        className='cta transparent'
                        value={_ctaLabel}
                        onChange={(newVal) => setCtaLabel(newVal)}
                        // onChange={(newVal) => setAttributes({subheading: newVal})}
                        placeholder="CTA Button"
                    />





                    <Button variant="secondary" onClick={ openModal }>
                        Add Link
                        {/* {attributes.url || ''} */}
                    </Button>
                    { isOpen && (
                        <Modal
                            title="Add Link to Hero"
                            onRequestClose={ closeModal }
                        >
                            {/* <Button variant="secondary" onClick={ closeModal }>
                                My custom close button
                            </Button> */}

                            <LinkControl
                                url={ attributes.url }
                                onChange={ ( url, post ) => {
                                    setAttributes( { url, text: (post && post.title) || 'Click here' } )

                                    // setUrl(url)
                                    // setUrlText( (post && post.title) || 'Click here' )
                                    // text
                                } }
                            />

                            <Button variant="secondary" onClick={ () => {

                                setAttributes( { url: _url, text: _urlText || 'Click here' } )
                                closeModal()

                            } }>
                               {__('Ok')}
                            </Button>
                        </Modal>
                    ) }


                    {/* <LinkControl
                        url={ attributes.url }
                        onChange={ ( url, post ) => setAttributes( { url, text: (post && post.title) || 'Click here' } ) }
                    /> */}

                    {/* <URLInputButton
                        url={ attributes.url }
                        onChange={ ( url, post ) => setAttributes( { url, text: (post && post.title) || 'Click here' } ) }
                    /> */}

                </div>
            </div>


        
        </Fragment>
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


// export default compose()( Edit );



export default compose()( withSelect((select, props) => {
    return { media: props.attributes.mediaId ? select('core').getMedia(props.attributes.mediaId) : undefined };
})(Edit) )