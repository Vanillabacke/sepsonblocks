/**
 * Wraps a string around each line
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by lines
 */
export default function wrapLines(str, tmpl) {
    return str.replace(/.+$/gm, tmpl || "<span>$&</span>");
}