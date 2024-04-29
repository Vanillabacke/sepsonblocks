
// https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript

/*
 * Converts a string to a bool.
 *
 * This conversion will:
 *
 *  - match 'true', 'on', or '1' as true.
 *  - ignore all white-space padding
 *  - ignore capitalization (case).
 *
 * '  tRue  ','ON', and '1   ' will all evaluate as true.
 *
 */
export default function parseBool(val)
{
    // will match one and only one of the string 'true','1', or 'on' rerardless
    // of capitalization and regardless off surrounding white-space.
    //
    // var regex = /^\s*(true|1|on)\s*$/i
    // return regex.test(s);

    // var regex = /^(?:f(?:alse)?|no?|0+)$/i;
    // return !regex.test(s) && !!s;
    return !/^(?:f(?:alse)?|no?|0+)$/i.test(val) && !!val;
}