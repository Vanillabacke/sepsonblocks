export default function rangeMap (val, low1, high1, low2, high2) {
    let out;
    let handle = val/( (high1-low1));
    
    out = (high2-low2)*handle
    
    return out
}