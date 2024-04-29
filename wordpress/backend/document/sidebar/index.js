

import config from '../../../../config'
const {
    namespace
} = config





import {h} from 'preact'


const {
	map,
	sortBy,
	debounce
} = lodash;


const
	{ compose }  = wp.compose,
    {
		withDispatch,
		withSelect,
	}                              = wp.data,
	{
		TextControl,
		TextareaControl,

		BaseControl,
	    	PanelRow,
	    Button,
	} = wp.components,
	{ __ } = wp.i18n,
	{ 
        Component,
        Fragment
    } = wp.element,
	{ PluginDocumentSettingPanel } = wp.editPost,
    {
        MediaUpload,
    } = wp.blockEditor




// https://developer.wordpress.org/block-editor/tutorials/plugin-sidebar-0/plugin-sidebar-6-finishing-touches/

class FormDocumentSettings extends Component {
    constructor() {
		super( ...arguments );

		this.editMeta = this.editMeta.bind( this );


        let seo_image = wp.data.select('core/editor').getEditedPostAttribute('meta')[`${namespace}_seo_image`]

        this.state = {
			seo_title: 		    wp.data.select('core/editor').getEditedPostAttribute('meta')[`${namespace}_seo_title`],
			seo_description:    wp.data.select('core/editor').getEditedPostAttribute('meta')[`${namespace}_seo_description`],
			seo_keywords: 	    wp.data.select('core/editor').getEditedPostAttribute('meta')[`${namespace}_seo_keywords`],
			seo_image: 		    (!!seo_image) ? JSON.parse(seo_image) : null,
		}
    }


    editMeta( name, value, isJson = false ) {
		// console.log( `editMeta: ${namespace}_${name}`, value);
		wp.data.dispatch( 'core/editor' ).editPost( {
			meta: {
				// [name]: isJson ? JSON.stringify(value) : value,
				[`${namespace}_${name}`]: isJson ? JSON.stringify(value) : value,
			},
		} );
	}


    render() {

		const {
			setState,
			location,
			documentTest,
			// setFormMetas,
			getBlockPostType,
			getMeta,
			editMeta,			
		} = this.props;

        const {
			seo_title,
			seo_description,
			seo_keywords,
			seo_image,
		} = this.state;


        const postType = getBlockPostType();



        return (
			<Fragment>

                <PluginDocumentSettingPanel
					name={`${namespace}-seo-settings`}
					// icon="chart-line"
					// icon="chart-area"
					icon="admin-site-alt3"
					// title={ 'SEO Settings' }
					title={ 'SEO / Social Media' }
					// opened={ true }
				>

					<Fragment>
						<TextControl
							title={ __("Title") }
							label={ __("Title") }
							value={ seo_title }
							onChange={ (content) => {
                                console.log("content", content)
								this.setState({seo_title: content})
								this.editMeta('seo_title', content)

							} }
							placeholder={ __('Title')}
			                keepPlaceholderOnFocus={true}
						/>
					
						<TextareaControl
							title={ __("Description") }
							label={ __("Description") }
							value={ seo_description }
							onChange={ (content) => {
								this.setState({seo_description: content})
								this.editMeta('seo_description', content)

							} }
							placeholder={ __('Description')}
			                keepPlaceholderOnFocus={true}
						/>

						<TextControl
							title={ __("Keywords") }
							label={ __("Keywords") }
							// help={ __("comma separated keywords") }
							value={ seo_keywords }
							onChange={ (content) => {
								this.setState({seo_keywords: content})
								this.editMeta('seo_keywords', content)

							} }
							placeholder={ __('Keyword 1, Keyword 2, ...')}
			                keepPlaceholderOnFocus={true}
						/>






						

						{ 
							! seo_image ? (

								<BaseControl
									label={ __( 'Image') }
								>
									<PanelRow>
										<MediaUpload
				                            onSelect={ ( media ) => {
				                                // console.log("media", media)
				                                this.setState({
				                                	seo_image: media
				                                })
				                                this.editMeta('seo_image', media, true )
				                            } }
				                            allowedTypes={ [ 'image' ] }
				                            // value={ seoImage.id }
				                            render={ ( { open } ) => (
				                                <Button onClick={ open } 
				                                	// isPrimary
				                                	isDefault
				                                >
				                                    { __( 'Select Image', '@@text_domain' ) }
				                                </Button>
				                            ) }
				                        />
				                    </PanelRow>
			                    </BaseControl>
	                    ) : '' }


						{ 
							seo_image ? (
							<Fragment>


		                    	<BaseControl
									label={ __( 'Image') }
								>

			                        <MediaUpload
	                                    onSelect={ ( media ) => {
	                                        // console.log("media", media)
	                                        this.setState({
			                                	seo_image: media
			                                })
			                                this.editMeta('seo_image', media, true )
	                                    } }
	                                    allowedTypes={ [ 'image' ] }
	                                    value={seo_image.id }
	                                    render={ ( { open } ) => (
	                                        <BaseControl help={ __( 'Click the image to edit or update') }>
	                                            <a
	                                                href="#"
	                                                onClick={ open }
	                                                className={`${namespace}-seo-image-upload`}
	                                                style={ { display: 'block' } }
	                                                dangerouslySetInnerHTML={ {
	                                                	 // __html: posterTag 
	                                                	 __html: `<img src="${seo_image.sizes.medium.url}" width="100%" />`
	                                                } }
	                                            />
	                                        </BaseControl>
	                                    ) }
	                                />


									{ /*
									<a
		                                href="#"
		                                onClick={ ( e ) => {
	                                    	this.setState({
			                                	vc_seo_image: null
			                                })
		                                    editMeta('vc_seo_image', null)
		                                    e.preventDefault();
		                                } }
		                                className="button button-secondary"
		                            >
		                                { __( 'Remove Image' ) }
		                            </a>
		                        	*/ }


		                            <Button isDestructive onClick={ () => {
										this.setState({
			                                	seo_image: null
                                        })
                                        this.editMeta('seo_image', null)
									}}>
					 					{ __("Remove Image") }
					 				</Button>
		                        </BaseControl>
							</Fragment>
						) : '' }


					


					</Fragment>
				</PluginDocumentSettingPanel>

            </Fragment>

        )
    }
} 



/**
 * Retrieve custom meta information when retrieving posts.
 *
 * @since 1.6.0
 * @since 1.7.0 Retrieve form link attribute.
 * @since 1.7.2 Only modify select when working with an `llms_form` post type.
 */
 const applyWithSelect = withSelect( ( select ) => {

	// const {
	// 	getCurrentPost,
	// 	getCurrentPostType,
	// 	getEditedPostAttribute,
	// } = select( 'core/editor' );

	// // // if ( 'llms_form' !== getCurrentPostType() ) {
	// // // 	return {};
	// // // }

	// let customAttributes = {
	// 	vc_seo_title: select( 'core/editor' ).getEditedPostAttribute( 'meta' )['vc_seo_title'],
	// };

	// return customAttributes;

	// return {
	// 	// link: getCurrentPost().link,
	// 	// documentTest: select( 'core/editor' ).getEditedPostAttribute( 'meta' )['documentTest'],
	// 	// documentTest: getEditedPostAttribute( 'meta' ).documentTest,
	// 	// location: getEditedPostAttribute( 'meta' )._llms_form_location,
	// 	// showTitle: getEditedPostAttribute( 'meta' )._llms_form_show_title,
	// };
} );



/**
 * Save custom meta information when saving posts.
 *
 * @since 1.6.0
 */
// const applyWithDispatch = withDispatch( ( dispatch, { _llms_form_location } ) => {
    const applyWithDispatch = withDispatch( ( dispatch ) => {

        const { editPost } = dispatch( 'core/editor' );
            return {
                getBlockPostType() {
                    const getPostType = wp.data.select( 'core/editor' ).getCurrentPostType(); // Gets the current post type.
                    return getPostType;
                },
        
                getMeta( name, isJson = false ) {
                    const value = wp.data.select('core/editor').getEditedPostAttribute('meta')[name];
                    // const value = select( 'core/editor' ).getEditedPostAttribute( 'meta' )['vc_seo_title'];
        
                    if( isJson ) {
                        return ( value ) ? JSON.parse(value) : null;
                    } else {
                        return ( value ) ? value : null;
                    }
                },
        
                editMeta( name, value, isJson = false ) {
                    // console.log( `editMeta (${name})`, value);
                    wp.data.dispatch( 'core/editor' ).editPost( {
                        meta: {
                            [name]: isJson ? JSON.stringify(value) : value,
                        },
                    } );
                }
            };
        
        } );







export default compose( [
	applyWithSelect,
	applyWithDispatch
] )( FormDocumentSettings );
