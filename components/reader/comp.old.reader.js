import {h, Component, render} from 'react'

import {useCallback, useContext, useEffect, useRef, useState} from 'react'

import './style.scss'



/****
 * 
 * 
 * https://codersblock.com/blog/javascript-text-to-speech-and-its-many-quirks/
 * https://codepen.io/lonekorean/pen/QWEegPV
 * 
 * 
 */



// var utterance = new SpeechSynthesisUtterance();
// utterance.lang = 'en-UK';
// utterance.rate = 1;

// document.getElementById('playButton').onclick = function(){
//     var text = document.getElementById('textarea').value;
//     // create the utterance on play in case user called stop
//     // reference https://stackoverflow.com/a/47276578/441016
//     utterance = new SpeechSynthesisUtterance();
//     utterance.onboundary = onboundaryHandler;
//     utterance.text = text;
//     speechSynthesis.speak(utterance);
// };

// document.getElementById('pauseButton').onclick = function(){
//     if (speechSynthesis) {
//       speechSynthesis.pause();
//     }
// };

// document.getElementById('resumeButton').onclick = function(){
//     if (speechSynthesis) {
//       speechSynthesis.resume();
//     }
// };

// document.getElementById('stopButton').onclick = function(){
//     if (speechSynthesis) {
//       speechSynthesis.cancel();
//     }
// };

// function onboundaryHandler(event){
//     var textarea = document.getElementById('textarea');
//     var value = textarea.value;
//     var index = event.charIndex;
//     var word = getWordAt(value, index);
//     var anchorPosition = getWordStart(value, index);
//     var activePosition = anchorPosition + word.length;
    
//     textarea.focus();
    
//     if (textarea.setSelectionRange) {
//        textarea.setSelectionRange(anchorPosition, activePosition);
//     }
//     else {
//        var range = textarea.createTextRange();
//        range.collapse(true);
//        range.moveEnd('character', activePosition);
//        range.moveStart('character', anchorPosition);
//        range.select();
//     }
// };

// // Get the word of a string given the string and index
// function getWordAt(str, pos) {
//     // Perform type conversions.
//     str = String(str);
//     pos = Number(pos) >>> 0;

//     // Search for the word's beginning and end.
//     var left = str.slice(0, pos + 1).search(/\S+$/),
//         right = str.slice(pos).search(/\s/);

//     // The last word in the string is a special case.
//     if (right < 0) {
//         return str.slice(left);
//     }
    
//     // Return the word, using the located bounds to extract it from the string.
//     return str.slice(left, right + pos);
// }

// // Get the position of the beginning of the word
// function getWordStart(str, pos) {
//     str = String(str);
//     pos = Number(pos) >>> 0;

//     // Search for the word's beginning
//     var start = str.slice(0, pos + 1).search(/\S+$/);
//     return start;
// }


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



export default(props) => {

    if( !('speechSynthesis' in window)) return props.children

    const componentRef = useRef(props.customDom);
    const ref = useRef(null);
    // const [innerRef, setInnerRef] = useState(useRef(null))


    const [currentSpeech, setCurrentSpeech] = useState()
    const [currentWord, setCurrentWord] = useState(0)
    
    const [highlightText, setHighlightText] = useState(false)

    const voiceId = 2


/*
    0 SpeechSynthesisVoice {voiceURI: "Microsoft Hedda - German (Germany)", name: "Microsoft Hedda - German (Germany)", lang: "de-DE", localService: true, default: true}
    1: SpeechSynthesisVoice {voiceURI: "Microsoft Katja - German (Germany)", name: "Microsoft Katja - German (Germany)", lang: "de-DE", localService: true, default: false}
    2: SpeechSynthesisVoice {voiceURI: "Microsoft Stefan - German (Germany)", name: "Microsoft Stefan - German (Germany)", lang: "de-DE", localService: true, default: false}
    3: SpeechSynthesisVoice {voiceURI: "Google Deutsch", name: "Google Deutsch", lang: "de-DE", localService: false, default: false}
  */  

    let utterance = new SpeechSynthesisUtterance()
        utterance.lang = 'de-DE' //'en-UK'
        utterance.voice = window.speechSynthesis.getVoices()[voiceId] //'en-UK'
        // utterance.name = "Microsoft Stefan - German (Germany)" //'en-UK'

        // utterance.rate = 0.1

        // console.log( window.speechSynthesis.getVoices() )


    useEffect(()=> {
        console.log("currentSpeech", currentSpeech)
    }, [currentSpeech])
   

    useEffect(()=> {
        return () => {
            // console.log("unmount")
            currentSpeech.pause()
        }
    }, [])




    

    // Get the word of a string given the string and index
    const getWordAt = (str, pos) => {
        // Perform type conversions.
        str = String(str);
        pos = Number(pos) >>> 0;

        // Search for the word's beginning and end.
        var left = str.slice(0, pos + 1).search(/\S+$/),
            right = str.slice(pos).search(/\s/);

        // The last word in the string is a special case.
        if (right < 0) {
            return str.slice(left);
        }

        // Return the word, using the located bounds to extract it from the string.
        return str.slice(left, right + pos);
    }


    // Get the position of the beginning of the word
    const getWordStart = (str, pos) => {
        str = String(str);
        pos = Number(pos) >>> 0;

        // Search for the word's beginning
        var start = str.slice(0, pos + 1).search(/\S+$/);
        return start;
    }



    const onboundaryHandler = (event) => {
        // console.log( event )

        if( ref.current ) {
            // var textarea = document.getElementById('textarea');
            var textarea = ref.current;
            // var value = textarea.value;
            var value = textarea.textContent.trim() //.replace("\t", "").replace("\n", "");
            // console.log( value.trim() )
            var index = event.charIndex;

            var word = getWordAt(value, index);
            var anchorPosition = getWordStart(value, index);
            var activePosition = anchorPosition + word.length;


            // const firstPart = value.substring(0, index)
            // const lastParts = value.substring(index).split(" ")

            const firstPart = value.substring(0, index)
            const lastParts = value.substring(index).split(" ")
            const highlighted = lastParts.shift()

            const lastPart = ` ${lastParts.join(" ")}`

            const parts = [
                ... firstPart.split(" "),
                // `<span>${lastPart[0]}</span>`,
                lastPart[0],
                ... lastPart.split(" ")
            ]

            // console.log( `Word: ${word}`, {highlighted, firstPart, lastPart} )  
            console.log( `${word}`, {highlighted, firstPart, lastPart} )  
            // let highlighted = `<span>${lastPart[0]}</span>`

            // console.log( word, {highlighted, firstPart, lastPart} )
            // console.log( parts )



            // setHighlightText( parts )
            setHighlightText(  {highlighted, firstPart, lastPart} )
            // setHighlightText( `${firstPart}<span>${highlighted}</span>${lastPart}` )
            // console.log( "activePosition", activePosition )

            // textarea.focus();

            // if (textarea.setSelectionRange) {
            //    textarea.setSelectionRange(anchorPosition, activePosition);
            // }
            // else {
            //    var range = textarea.createTextRange();
            //    range.collapse(true);
            //    range.moveEnd('character', activePosition);
            //    range.moveStart('character', anchorPosition);
            //    range.select();
            // }
        }
    };

    const onmarkHandler = ( event ) => {
        console.log( event)
    }

    const readContent = () => {
        console.log( ref.current )
        if( ref.current ) {
            utterance = new SpeechSynthesisUtterance();
            utterance.onboundary = onboundaryHandler;
            utterance.onmark = onmarkHandler;
            utterance.on
            // utterance.text = text;
            utterance.text = ref.current.textContent;
            utterance.rate = 1;

            // utterance.voice = window.speechSynthesis.getVoices()[3] //'en-UK'
            utterance.voice = window.speechSynthesis.getVoices()[voiceId] //'en-UK'

            const current = speechSynthesis.speak(utterance)
            // console.log("current", utterance)
            setCurrentSpeech(utterance)

            setCurrentWord(0)
        }
    }

    // return <div className="reader-wrapper" ref={ref}>
    return <div className="reader-wrapper">
        <div>
            <button onClick={() => {
                // setModalContent(false)
                readContent()
            }}>read</button>
        </div>
        <div ref={ref}>{props.children}</div>
        {/* { highlightText && highlightText.join(" ") } */}
        { highlightText && highlightText.firstPart }
        { highlightText && <span>{highlightText.highlighted}</span> }
        { highlightText && highlightText.lastPart }
        {/* { highlightText && highlightText.map( highlight => {
            return highlight
        })} */}
        {/* { new DOMParser().parseFromString(highlightText, "text/xml") } */}
    </div>
}