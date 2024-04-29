export default function remap ( value, inputRange = [0,1], outputRange = [0,100]) {
    try {
        const newValue = ((value - inputRange[0]) * ( outputRange[1] - outputRange[0]) / ( inputRange[1] - inputRange[0]) + outputRange[0] )
        if( !newValue ) {
            console.error( `Can not remap value: ${value} of ${inputRange.toString()} to ${outputRange.toString()}`, newValue)
            return value
        }
        return newValue
    } catch (err) {
        console.error( 'Can not remap value', err)
        return value
    }
}
    
    
// x, long in_min, long in_max, long out_min, long out_max)
// {
//   return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
// } 