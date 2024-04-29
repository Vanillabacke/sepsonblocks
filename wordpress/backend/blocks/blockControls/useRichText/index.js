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
    RichText,
} = wp.blockEditor


// import React from 'react'

// export default function index() {
//   return (
//     <div>index</div>
//   )
// }






function useRichText( props, propKey = 'content', options = {} ) {

    options = {
        // propKey: 'mediaId',
        placeholder: __('Add Text'),
        classeName: '',
        style: {},
        tagName: 'p',
        allowedFormats: [ 'core/bold', 'core/italic', 'core/link' ],
        // multiline: true,
        callback: () => {},
        ... options,
    }


    const {
        placeholder,
        classeName,
        style,
        tagName,
        allowedFormats,
        // multiline,
        callback,
    } = options


    const {
        attributes,
        setAttributes,
    } = props


    // console.log( attributes )

    // const [_text, setText]  = useState(attributes[propKey] || '')
    // const [_text, setText]  = useState(attributes[propKey])
    // const [_text, setText]  = useState(props.attributes.headlineContent)
    // const [_text, setText]  = useState('some placeholder')

    // useEffect( () => { 
    //     setAttributes({[propKey]: _text})
    //     try { callback( _text ) } catch(e) {}
    // }, [_text])
    useEffect( () => { 
        // console.log( 'changed value', attributes[`${propKey}`] )
        try { callback( attributes[`${propKey}`] ) } catch(e) {}
    }, [attributes[`${propKey}`]])



    // https://dev.to/droopytersen/new-react-hooks-pattern-return-a-component-31bh

    // or convert it to a new component!!!

    const richTextControl = (<RichText
        tagName={tagName}
        className={classeName}
        style={style}

        value={attributes[`${propKey}`]}
        onChange={(newVal) => setAttributes({[`${propKey}`]: newVal})}
        placeholder={ placeholder }

        // {... props }
      />)


    //   const richTextControl = (props) => {
    //     return (<RichText
    //         tagName={tagName}
    //         className={classeName}
    //         style={style}
    
    //         value={attributes[`${propKey}`]}
    //         onChange={(newVal) => setAttributes({[`${propKey}`]: newVal})}
    //         placeholder={ placeholder }
    
    //         // {... props }
    //       />)
    //   }
      



    // const richTextControl = (<div>
    //     {attributes[propKey] }
    //     <RichText
    //     allowedFormats={ allowedFormats }
    //     // allowedFormats={ [ 'core/bold', 'core/italic' ] }
    //     // ref={editorRef}
    //     // style={{
    //         //     hyphens: 'auto'
    //         // }}
    //         // tagName='p'
    //         tagName={domType}
    //         multiline={multiline}
    //         // className='headline-subheading'
    //         className={classes}
    //         // className='font-subline'
    //         value={ props.attributes.headlineContent }
    //         // value={_text || attributes.headlineContent}
    //         // value={attributes.headlineContent}
    //         onChange={(newVal) => setText(newVal)}
    //         // onChange={(newVal) => setAttributes({subheading: newVal})}
    //         placeholder={ placeholder }
    //         />
    // </div>)
    

    return {
        richTextControl,
        // richTextControl: <richTextControl />,
        // imageBlockStyle,
        // imageInspectorControl,
        // imageBlockControl,
        // imageSelector,
        // mediaUrl,
        // mediaId,
    }
}

export default useRichText

