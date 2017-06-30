const assert = require ('assert')
const { ansiEscapeCodes, printableCharacters, printableText } = require ('./printable-characters')

describe ('printable-characters', () => {

    it ('works', () => {

        const text = '\u001b[106m' + 'a bc\tdef\nghjk' + '\u001b[49m'

        assert.equal (printableText (text), 'abcdefghjk')
        
        assert.equal (text.replace (ansiEscapeCodes, '')
                          .replace (printableCharacters, '?'), '? ??\t???\n????')
    })
})