import { qsa } from '../utils/helper'
import './style.scss'

// window
// <link rel="stylesheet" href="https://use.typekit.net/cvj0une.css">








// function wrapNewLines(targetSelector, wrapEl = 'span', wrapClass = 'new-line') {
//     const content = document.querySelectorAll(targetSelector)
//     content.forEach(section => {
//       let sectionWidth = section.getBoundingClientRect().width
//       let words = section.innerText.split(/( )/g)
//       section.innerHTML = words.map(word =>`<span>${word}</span>`).join('')
//       let lines = []
//       let line = []
//       let lineWidth = 0
//       let spans = section.querySelectorAll('span')
//       spans.forEach((span, i) => {
//         let spanWidth = span.getBoundingClientRect().width
//         if (lineWidth + spanWidth <= sectionWidth - 4) {
//           line.push(span)
//           lineWidth += spanWidth
//         } else {
//           lines.push(line)
//           line = []
//           lineWidth = 0
//           line.push(span)
//           lineWidth += spanWidth
//         }
//       })
//       if (line.length) lines.push(line)
//       let newLines = lines
//         .map(
//           line =>
//             `<${wrapEl} class=${wrapClass}>${line
//               .map(span => span.innerText)
//               .join('')}</${wrapEl}>`
//         )
//         .join('')
//       section.innerHTML = newLines
//     })
// }


// wrapNewLines('.underline')








// qsa('.underline').forEach( (item, index) => {
//     // console.log( item )
//     console.log( item.text() ) 
// })