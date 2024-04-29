import roundTo 		from '../roundTo';
import isNumber 	from '../isNumber';
import getHours 	from '../getHours';
import getMinutes 	from '../getMinutes';
import getSeconds 	from '../getSeconds';



// Format time to UI friendly string
export default function formatTime(time = 0, displayHours = false, inverted = false) {
    // Bail if the value isn't a number
    if (!isNumber(time)) {
        return formatTime(undefined, displayHours, inverted);
    }

    // Format time component to add leading zero
    const format = value => `0${value}`.slice(-2);
    // Breakdown to hours, mins, secs
    var hours = getHours(time);
    const mins = getMinutes(time);
    const secs = getSeconds(time);

    // Do we need to display hours?
    if (displayHours || hours > 0) {
        hours = `${hours}:`;
    } else {
        hours = '';
    }

    // Render
    return `${inverted && time > 0 ? '-' : ''}${hours}${format(mins)}:${format(secs)}`;
}