import {h, Component, render} from 'react'

import {useCallback, useContext, useEffect, useRef, useState} from 'react'


import useSpeech from 'Hooks/useSpeech'
import { wrapWordsHTML } from 'Utils'
import './style.scss'



/****
 * 
 * 
 * https://codersblock.com/blog/javascript-text-to-speech-and-its-many-quirks/
 * https://codepen.io/lonekorean/pen/QWEegPV
 * 
 * 
 */


/*

0: SpeechSynthesisVoice {voiceURI: "Microsoft Hedda - German (Germany)", name: "Microsoft Hedda - German (Germany)", lang: "de-DE", localService: true, default: true}
1: SpeechSynthesisVoice {voiceURI: "Microsoft Katja - German (Germany)", name: "Microsoft Katja - German (Germany)", lang: "de-DE", localService: true, default: false}
2: SpeechSynthesisVoice {voiceURI: "Microsoft Stefan - German (Germany)", name: "Microsoft Stefan - German (Germany)", lang: "de-DE", localService: true, default: false}
3: SpeechSynthesisVoice {voiceURI: "Google Deutsch", name: "Google Deutsch", lang: "de-DE", localService: false, default: false}
4: SpeechSynthesisVoice {voiceURI: "Google US English", name: "Google US English", lang: "en-US", localService: false, default: false}
5: SpeechSynthesisVoice {voiceURI: "Google UK English Female", name: "Google UK English Female", lang: "en-GB", localService: false, default: false}
6: SpeechSynthesisVoice {voiceURI: "Google UK English Male", name: "Google UK English Male", lang: "en-GB", localService: false, default: false}
7: SpeechSynthesisVoice {voiceURI: "Google español", name: "Google español", lang: "es-ES", localService: false, default: false}
8: SpeechSynthesisVoice {voiceURI: "Google español de Estados Unidos", name: "Google español de Estados Unidos", lang: "es-US", localService: false, default: false}
9: SpeechSynthesisVoice {voiceURI: "Google français", name: "Google français", lang: "fr-FR", localService: false, default: false}
10: SpeechSynthesisVoice {voiceURI: "Google हिन्दी", name: "Google हिन्दी", lang: "hi-IN", localService: false, default: false}
11: SpeechSynthesisVoice {voiceURI: "Google Bahasa Indonesia", name: "Google Bahasa Indonesia", lang: "id-ID", localService: false, default: false}
12: SpeechSynthesisVoice {voiceURI: "Google italiano", name: "Google italiano", lang: "it-IT", localService: false, default: false}
13: SpeechSynthesisVoice {voiceURI: "Google 日本語", name: "Google 日本語", lang: "ja-JP", localService: false, default: false}
14: SpeechSynthesisVoice {voiceURI: "Google 한국의", name: "Google 한국의", lang: "ko-KR", localService: false, default: false}
15: SpeechSynthesisVoice {voiceURI: "Google Nederlands", name: "Google Nederlands", lang: "nl-NL", localService: false, default: false}
16: SpeechSynthesisVoice {voiceURI: "Google polski", name: "Google polski", lang: "pl-PL", localService: false, default: false}
17: SpeechSynthesisVoice {voiceURI: "Google português do Brasil", name: "Google português do Brasil", lang: "pt-BR", localService: false, default: false}
18: SpeechSynthesisVoice {voiceURI: "Google русский", name: "Google русский", lang: "ru-RU", localService: false, default: false}
19: SpeechSynthesisVoice {voiceURI: "Google 普通话（中国大陆）", name: "Google 普通话（中国大陆）", lang: "zh-CN", localService: false, default: false}
20: SpeechSynthesisVoice {voiceURI: "Google 粤語（香港）", name: "Google 粤語（香港）", lang: "zh-HK", localService: false, default: false}
21: SpeechSynthesisVoice {voiceURI: "Google 國語（臺灣）", name: "Google 國語（臺灣）", lang: "zh-TW", localService: false, default: false}

*/

const DEFAULT_LANGUAGE = 'de-DE'

export default(props) => {


    const [value, setValue] = useState('');
    const [ended, setEnded] = useState(false);


    const [content, setContent] = useState(false);
    const [wrappedContent, setWrappedContent] = useState(false);
    const [currentWord, setCurrentWord] = useState(false);

    const [currentPos, setCurrentPos] = useState(-1);


    


     // Get the word of a string given the string and index
     const getWordAt = (str, pos) => {
        // Perform type conversions.
        str = String(str);
        pos = Number(pos) >>> 0;

        var word = ''
        // Search for the word's beginning and end.
        var left = str.slice(0, pos + 1).search(/\S+$/),
            right = str.slice(pos).search(/\s/);

        // The last word in the string is a special case.
        if (right < 0) {
            // return str.slice(left);
            return {
                word: str.slice(left),
                pos: pos,
            }
        }

        // Return the word, using the located bounds to extract it from the string.
        return {
            word: str.slice(left, right + pos),
            pos: pos,
        }
    }




    const onBoundary = (event) => {
        // console.log(`${event.name} boundary reached after ${event.elapsedTime} milliseconds.`, event);

        // const current = getWordAt( ref.current.textContent.trim(), event.charIndex )
        
        // ref.current.querySelectorAll('[speech-id]').forEach( element => {
            //     element.classList.toggle("current")
            // })
            
        const current = getWordAt( event.currentTarget.text, event.charIndex )
        setCurrentWord(current.pos)

        // console.log( event )

        console.log(`
            charIndex ${event.charIndex}
            charLength ${event.charLength}
            getWordAt ${getWordAt( ref.current.textContent.trim(), event.charIndex)}
            `, getWordAt( ref.current.textContent.trim(), event.charIndex ));
        //     // `, event);
    };
    const onEnd = () => {
        setEnded(true)
        setCurrentPos(-1)
        setCurrentWord(false)
    }
    const onError = (event) => {
        console.warn(event);
    };

    const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeech({
        onEnd,
        onBoundary,
        onError,
    });


    const [langVoice, setLangVoice] = useState(voices[0]);

    if (!supported) {
        // return 'Speech is not supported. Upgrade your browser';
        return props.children
    }


    useEffect( () => {
        // setCurrentPos(currentPos + 1)
        let hasVoice = false
        voices.forEach( voice => {
            // console.log( voice )
            if( voice.lang == DEFAULT_LANGUAGE && !hasVoice) {
                hasVoice = true
                console.log( voice )
                setLangVoice( voice )
            }
        })
    }, [voices] )

    useEffect( () => {
        setCurrentPos(currentPos + 1)
    }, [currentWord] )



    const componentRef = useRef(props.customDom);
    const ref = useRef(null);

    useEffect( () => {
        if( ref.current ) {
            // console.log( props.children )
            // setContent( props.children )
            // setWrappedContent( wrapWordsHTML( ref.current ) )
            // wrapWordsHTML( ref.current )
            
            const wrapped = wrapWordsHTML( ref.current )
            // const wrapped = ref.current.innerHTML
            
            // ref.current.innerHTML = 'test'
            setWrappedContent( wrapped )
            
            // ref.current.innerHTML = '<strong>test</strong>'
            // console.log( wrappedContent )
        }
    },[])
    
    useEffect( () => {
        console.log( wrappedContent )
    },[wrappedContent])
    
    // useEffect( () => {
    //     // console.log( wrappedContent )
    //     // wrapWordsHTML( ref.current )
    // },[wrappedContent])


    const readContent = ( text ) => {
        if( typeof text !== 'string') return
        if( !ref.current ) return

        // setCurrentPos(0)
        // setCurrentWord(false)
        // console.log( voices )

        speak({
            text: text,
            voice: langVoice,
            // voice: voices[0]
        })
    }


    // return <div className="reader-wrapper" ref={ref}>
    return <div className="reader-wrapper">
        <div>
            <button onClick={() => {
                if( !ref.current ) return
                console.log( ref.current )
                // setModalContent(false)
                // readContent( ref.current.textContent )
                readContent( ref.current.textContent.trim() )
            }}>read</button>
            <button onClick={ cancel }>cancel</button>
            <button onClick={ pause }>pause</button>
            <button onClick={ resume }>resume</button>
        </div>
        {/* <div>{ wrappedContent }</div> */}

        {speaking && <style>{`[speech-id="${currentPos - 1}"]{ background: #f0c; color: #fff;}`}</style>}
        {/* <div dangerouslySetInnerHTML={{ __html: wrappedContent }} /> 
        <div ref={ref}>{ props.children }</div>  */}

        { speaking && <div dangerouslySetInnerHTML={{ __html: wrappedContent }} /> }
        { !speaking && <div ref={ref}>{ props.children }</div> }

        <div>{currentPos} - {currentWord}</div>

        {/* { highlightText && highlightText.join(" ") } */}
        {/* { highlightText && highlightText.firstPart }
        { highlightText && <span>{highlightText.highlighted}</span> }
        { highlightText && highlightText.lastPart } */}
        {/* { highlightText && highlightText.map( highlight => {
            return highlight
        })} */}
        {/* { new DOMParser().parseFromString(highlightText, "text/xml") } */}
    </div>
}