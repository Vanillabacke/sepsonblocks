// import {
//     useState,
//     useEffect,
//     useCallback,
// } from 'react';



const { __ } = wp.i18n;
const {
    Component,
    Fragment,

    useRef,
    useState,
    useEffect,
    useCallback,
} = wp.element;


const {
    InspectorControls,
    BlockControls,
    ResponsiveBlockControl,
} = wp.editor





const {
    PanelBody,
    Button,
    IconButton,
    ResponsiveWrapper,
    Modal,
} = wp.components;

const {
    MediaUpload,
    MediaUploadCheck,
    // URLInputButton,
    // // LinkControl,
    // __experimentalLinkControl: LinkControl,
    // URLPopover,
} = wp.blockEditor;


// https://github.com/WordPress/gutenberg/tree/trunk/packages/icons
// import { Icon, check } from '@wordpress/icons';
import { Icon, image } from '@wordpress/icons';

// const {
//     Icon,
//     image,
// } = wp.icons






/*
    const {
        imageBlockStyle,
        imageInspectorControl,
        imageSelector,

        mediaUrl: _mediaUrl,
        mediaId: _mediaId,
    } = useImageSelector(props, {
        mediaId: 'heroImageId',
        mediaUrl: 'heroImageUrl',
    })
*/




function useImageSelector( props, options = {} ) {

    options = {
        mediaId: 'mediaId',
        mediaUrl: 'mediaUrl',

        selectImageLabel: 'Select image',
        chooseImageLabel: 'Choose an image',
        replaceImageLabel: 'Replace image',
        removeImageLabel: 'Remove image',

        ... options,
    }

    const {
        selectImageLabel,
        chooseImageLabel,
        replaceImageLabel,
        removeImageLabel,
    } = options


    const {
        attributes,
        setAttributes,
    } = props

    
    const mediaId = attributes[ options.mediaId ] || 0
    const mediaUrl = attributes[ options.mediaUrl ] || ''

   
    const removeMedia = () => {
		setAttributes({
			// mediaId: 0,
			// mediaUrl: ''
			[ options.mediaId ]: 0,
			[ options.mediaUrl ]: ''
		});
	}
 
 	const onSelectMedia = (media) => {
		setAttributes({
			// mediaId: media.id,
			// mediaUrl: media.url
			[ options.mediaId ]: media.id,
			[ options.mediaUrl ]: media.url
		});
	}


    // const [ mediaUrl, setMediaUrl ] = useState( attributes.mediaUrl )
    // const [ mediaId, setMediaId ] = useState( mediaId )


    const imageBlockStyle = {
		// backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
		backgroundImage: mediaUrl != '' ? 'url("' + mediaUrl + '")' : 'none'
	};




    const imageInspectorControl = (
        <InspectorControls>
				<PanelBody
					title={__(selectImageLabel)}
					initialOpen={ true }
				>
                

					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								value={mediaId}
								allowedTypes={ ['image'] }
								render={({open}) => (
									<Button 
										className={mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
										onClick={open}
									>
										{mediaId == 0 && __(chooseImageLabel)}

                                        {/* {mediaUrl != undefined && 
                                            <ResponsiveWrapper
									    		naturalWidth={ 200 }
                                                naturalHeight={ 200 }
									    	>
                                                mediaGoes 
                                                <img src={mediaUrl} />
									    	</ResponsiveWrapper>
                                        } */}

                                        { mediaUrl && <img src={mediaUrl} /> }

										{/* {props.media != undefined && 
						            			<ResponsiveWrapper
									    		naturalWidth={ props.media.media_details.width }
											    naturalHeight={ props.media.media_details.height }
									    	>
                                                mediaGoes 

									    		<img src={props.media.source_url} />
                                                <img src={mediaUrl} />
									    	</ResponsiveWrapper>
						            		} */}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{mediaId != 0 && 
							<MediaUploadCheck>
								<MediaUpload
									title={__(replaceImageLabel)}
									value={mediaId}
									onSelect={onSelectMedia}
									allowedTypes={['image']}
									render={({open}) => (
										<Button onClick={open} isDefault isLarge>{__(replaceImageLabel)}</Button>
									)}
								/>
							</MediaUploadCheck>
						}
						{mediaId != 0 && 
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>{__(removeImageLabel)}</Button>
							</MediaUploadCheck>
						}
					</div>
				</PanelBody>
			</InspectorControls>
    )



    const imageBlockControl = <BlockControls>
        <MediaUploadCheck>
            <MediaUpload
                onSelect={onSelectMedia}
                value={mediaId}
                allowedTypes={ ['image'] }
                render={({open}) => (
                    <Button 
                        // icon={ image.icon }
                        
                        // icon={ <Icon icon={ image } />}
                        className={'components-button components-dropdown-menu__toggle has-icon'}
                        // className={mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                        onClick={open}
                    >  
                            <Icon icon={ image } />
                        {/* {mediaId == 0 && __(chooseImageLabel)}
                        {mediaId !== 0 && __(replaceImageLabel)}    */}
                    </Button>
                )}
            />
        </MediaUploadCheck>
    </BlockControls>

    // /* <Button
    //     className={mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
    //     onClick={removeMedia}
    // >
    //     {__(removeImageLabel)}
    // </Button> */



    const imageSelector = <MediaUploadCheck>
        <MediaUpload
            onSelect={onSelectMedia}
            value={mediaId}
            allowedTypes={ ['image'] }
            render={({open}) => (
                <Button 
                    className={mediaId == 0 ? 'editor-post-featured-image__toggle image-preview-selector' : 'editor-post-featured-image__preview image-preview-selector'}
                    onClick={open}
                >
                    {mediaId == 0 && __(chooseImageLabel)}
                   
                    { mediaUrl && <img src={mediaUrl} /> }


                    {/* {mediaUrl != undefined && 
                            <ResponsiveWrapper
                            naturalWidth={ 200 }
                            naturalHeight={ 200 }
                        >
                            mediaGoes 
                            <img src={mediaUrl} />
                        </ResponsiveWrapper>
                    } */}


                    {/* {props.media != undefined && 
                        <ResponsiveWrapper
                            naturalWidth={ props.media.media_details.width }
                            naturalHeight={ props.media.media_details.height || 200 }
                        >
                            Media goes here
                            <img src={props.media.source_url} />
                        </ResponsiveWrapper>
                    } */}
                </Button>
            )}
        />
    </MediaUploadCheck>
  


    
  
    return {
        imageBlockStyle,
        imageInspectorControl,
        imageBlockControl,
        imageSelector,
        mediaUrl,
        mediaId,
    }
}

export default useImageSelector












// function useImageSelector(callback, dependencies = []) {
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState()
//     const [value, setValue] = useState()
  
//     const callbackMemoized = useCallback(() => {
//       setLoading(true)
//       setError(undefined)
//       setValue(undefined)
//       callback()
//         .then(setValue)
//         .catch(setError)
//         .finally(() => setLoading(false))
//     }, dependencies)
  
//     useEffect(() => {
//       callbackMemoized()
//     }, [callbackMemoized])
  
//     return { loading, error, value }
// }

// export default useImageSelector