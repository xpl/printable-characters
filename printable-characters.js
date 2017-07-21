"use strict";

const ansiEscapeCode                   = '[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]'
    , zeroWidthCharacterExceptNewline  = '\u0000-\u0008\u000B-\u0019\u001b\u009b\u00ad\u200b\u2028\u2029\ufeff'
    , zeroWidthCharacter               = '\n' + zeroWidthCharacterExceptNewline
    , zeroWidthCharactersExceptNewline = new RegExp ('(?:' + ansiEscapeCode + ')|[' + zeroWidthCharacterExceptNewline + ']', 'g')
    , zeroWidthCharacters              = new RegExp ('(?:' + ansiEscapeCode + ')|[' + zeroWidthCharacter + ']', 'g')
    , partition                        = new RegExp ('((?:' + ansiEscapeCode + ')|[\t' + zeroWidthCharacter + '])?([^\t' + zeroWidthCharacter + ']*)', 'g')

module.exports = {

    zeroWidthCharacters,

    ansiEscapeCodes: new RegExp (ansiEscapeCode, 'g'),

    strlen: s => s.replace (zeroWidthCharacters, '')
                  .length,

    isBlank: s => s.replace (zeroWidthCharacters, '')
                   .replace (/\s/g, '')
                   .length === 0,

    blank: s => s.replace (zeroWidthCharactersExceptNewline, '')
                 .replace (/[^\t\n]/g, ' '),

    partition (s) {
        for (var m, spans = []; (partition.lastIndex !== s.length) && (m = partition.exec (s));) { spans.push ([m[1] || '', m[2]]) }
        partition.lastIndex = 0 // reset
        return spans
    },

    first (s, n) {

        let result = '', length = 0

        for (const [nonPrintable, printable] of module.exports.partition (s)) {
            const text = printable.substr (0, n - length)
            result += nonPrintable + text
            length += text.length
        }

        return result
    }
}