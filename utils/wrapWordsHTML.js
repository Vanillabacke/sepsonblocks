/**
 * Wraps a string around each word
 *
 * @param {Node} element The Node to transform
 * @param {string} template Template that gets interpolated
 * @returns {Node} The given Node extended by word wraps
 */
//  export default function wrapWordsHTML(element, template = '$1<span class="word">$2</span>') {
export default function wrapWordsHTML(element, template = '$1<span>$2</span>') {
    let i = -1
    const inner = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, (a, b, c) => { i++; return `${b}<span speech-id="${i}">${c}</span>` })
    return inner
}

//  export default function wrapWordsHTML(element, template = '$1<span>$2</span>') {
     
//     //  const inner = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, template)
    
//     let i = -1
//     // const inner = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, (a, b) => { i++; return `${b}<span speech-id="${i}">${a}</span>` })
    
//     const inner = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, (a, b, c) => { i++; return `${b}<span speech-id="${i}">${c}</span>` })
//     return inner
//     // const copy = document.createElement("div")
//     // copy.innerHTML = inner  
//     // return copy

//     // element.innerHTML = ''
//     // console.log( 'inner', inner)
//     // return element.innerHTML = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, template)
//     // return element.innerHTML = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, template)
//     // return element.innerHTML = element.innerHTML.replace(/(?<!(<\/?[^>]*|&[^;]*))([^\s<]+)/g, '$1<span class="word">$2</span>')


//     // element.innerHTML = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, template)
//     // return element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, template)
//     // return element
//     // return str.replace(/\w+/g, tmpl || "<span>$&</span>");
// }