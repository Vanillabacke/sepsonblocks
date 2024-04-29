//round float to n.xxx
// export default function css2obj( _css ) {
//     const css = _css || ''
//     // console.log( 'css2obj', typeof _css )
//     if( typeof _css === 'object') return _css
//     try {
//         if( css.length < 1 ) return {}
//         const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g, o = {};
//         css.replace(r, (m,p,v) => o[p] = v);
//         return o;
//     } catch( err ) {
//         // console.log(' ')
//         // console.log(' ')
//         // console.log(' - - - - - - - - - - - - - -')
//         // console.log( err )
//         // console.log( _css )
//         // console.log( css )
//         // console.log(' - - - - - - - - - - - - - -')
//         // console.log(' ')
//         // console.log(' ')
//         return {}
//     }  
// }



export default function css2obj (style) {
    if( typeof style === 'object') return style 
    const styles = {};
    style.split(';').forEach((s) => {
      const parts = s.split(':', 2);
      if (parts.length > 1) {
        styles[parts[0].trim().replace(/-([a-z])/ig, (_, l) => l.toUpperCase())] = parts[1].trim();
      }
    });
    return styles;
  };