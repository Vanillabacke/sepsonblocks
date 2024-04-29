/**
 * Wraps a string around each word
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by words
 */
export default function wrapWords(str, tmpl) {
    return str.replace(/\w+/g, tmpl || "<span>$&</span>");
}