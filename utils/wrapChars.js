/**
 * Wraps a string around each character/letter
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input as splitted by chars/letters
 */
export default function wrapChars(str, tmpl) {
    return str.replace(/\w/g, tmpl || "<span>$&</span>");
}