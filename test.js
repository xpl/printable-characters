const assert = require ('assert')

describe ('printable-characters', () => {

    it ('determines visible length', () => {

        const { strlen } = require ('./printable-characters')

        assert (strlen ('foo bar'), 7)
        assert (strlen ('\u001b[106mfoo bar\u001b[49m'), 7)
    })

    it ('detects blank text', () => {

        const { isBlank } = require ('./printable-characters')

        assert (!isBlank ('foobar'))
        assert ( isBlank ('\u001b[106m  \t  \t   \n     \u001b[49m'))
    })

    it ('matches zero-width characters and ANSI escape codes', () => {

        const { ansiEscapeCodes, zeroWidthCharacters } = require ('./printable-characters')

        let s = '\u001b[106m' + 'foo' + '\n\n' + 'bar' + '\u001b[49m'

        assert (s = s.replace (ansiEscapeCodes, ''), 'foo\n\nbar')
        assert (    s.replace (zeroWidthCharacters, ''), 'foobar')
    })

    it ('obtains blank string of the same width', () => {

        const { blank } = require ('./printable-characters')

        assert.equal (blank ('foo'), '   ')
        assert.equal (blank ('\n'), '\n')
        assert.equal (blank ('\t'), '\t')
        assert.equal (blank ('\tfoo \nfoo'), '\t    \n   ')
        assert.equal (blank ('\u001b[22m\u001b[1mfoo \t\u001b[39m\u001b[22m'), '    \t')
    })

    it ('extracts invisible parts followed by visible ones', () => {

        const { partition } = require ('./printable-characters')

        assert.deepEqual (partition (''),                        [                                                     ])
        assert.deepEqual (partition ('foo'),                     [['',          'foo']                                 ])
        assert.deepEqual (partition ('\u001b[1mfoo'),            [['\u001b[1m', 'foo']                                 ])
        assert.deepEqual (partition ('\u001b[1mfoo\u0000bar'),   [['\u001b[1m', 'foo'],   ['\u0000', 'bar']            ])
        assert.deepEqual (partition ('\u001b[1mfoo\u0000bar\n'), [['\u001b[1m', 'foo'],   ['\u0000', 'bar'], ['\n', '']])
    })

    it ('gets first N visible symbols (preserving invisible parts)', () => {

        const { first } = require ('./printable-characters')

        assert.equal (first ('123456789', 0),   '')
        assert.equal (first ('123456789', 3),   '123')
        assert.equal (first ('123456789', 100), '123456789')

        const s = '\u001b[22m\u001b[1m' + '123' + '\u0000' + '45' + '\u001b[39m' + '67' + '\n' + '89' + '\u001b[39m\u001b[22m'
        
        assert.equal (first (s, 0),   '\u001b[22m\u001b[1m' + ''    + '\u0000' + ''   + '\u001b[39m' + ''   + '\n' + ''   + '\u001b[39m\u001b[22m')
        assert.equal (first (s, 3),   '\u001b[22m\u001b[1m' + '123' + '\u0000' + ''   + '\u001b[39m' + ''   + '\n' + ''   + '\u001b[39m\u001b[22m')
        assert.equal (first (s, 4),   '\u001b[22m\u001b[1m' + '123' + '\u0000' + '4'  + '\u001b[39m' + ''   + '\n' + ''   + '\u001b[39m\u001b[22m')
        assert.equal (first (s, 6),   '\u001b[22m\u001b[1m' + '123' + '\u0000' + '45' + '\u001b[39m' + '6'  + '\n' + ''   + '\u001b[39m\u001b[22m')
        assert.equal (first (s, 9),   '\u001b[22m\u001b[1m' + '123' + '\u0000' + '45' + '\u001b[39m' + '67' + '\n' + '89' + '\u001b[39m\u001b[22m')
        assert.equal (first (s, 100), '\u001b[22m\u001b[1m' + '123' + '\u0000' + '45' + '\u001b[39m' + '67' + '\n' + '89' + '\u001b[39m\u001b[22m')
    })
})