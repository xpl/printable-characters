"use strict";

const assert              = require ('assert')
const printableCharacters = require ('./build/printable-characters')

// cannot use spread operator in tests due to Node v4 compatibility requirements...
const strlen              = printableCharacters.strlen
    , isBlank             = printableCharacters.isBlank
    , blank               = printableCharacters.blank
    , ansiEscapeCodes     = printableCharacters.ansiEscapeCodes
    , zeroWidthCharacters = printableCharacters.zeroWidthCharacters
    , partition           = printableCharacters.partition
    , first               = printableCharacters.first

describe ('printable-characters', () => {

    it ('determines visible length', () => {

        assert (strlen ('foo bar'), 7)
        assert (strlen ('\u001b[106mfoo bar\u001b[49m'), 7)
    })

    it ('detects blank text', () => {

        assert (!isBlank ('foobar'))
        assert ( isBlank ('\u001b[106m  \t  \t   \n     \u001b[49m'))
    })

    it ('matches zero-width characters and ANSI escape codes', () => {

        let s = '\u001b[106m' + 'foo' + '\n\n' + 'bar' + '\u001b[49m'

        assert (s = s.replace (ansiEscapeCodes, ''), 'foo\n\nbar')
        assert (    s.replace (zeroWidthCharacters, ''), 'foobar')
    })

    it ('obtains blank string of the same width', () => {

        assert.equal (blank ('foo'), '   ')
        assert.equal (blank ('\n'), '\n')
        assert.equal (blank ('\t'), '\t')
        assert.equal (blank ('\tfoo \nfoo'), '\t    \n   ')
        assert.equal (blank ('\u001b[22m\u001b[1mfoo \t\u001b[39m\u001b[22m'), '    \t')
    })

    it ('extracts invisible parts followed by visible ones', () => {

        assert.deepEqual (partition (''),                        [                                                     ])
        assert.deepEqual (partition ('foo'),                     [['',          'foo']                                 ])
        assert.deepEqual (partition ('\u001b[1mfoo'),            [['\u001b[1m', 'foo']                                 ])
        assert.deepEqual (partition ('\u001b[1mfoo\u0000bar'),   [['\u001b[1m', 'foo'],   ['\u0000', 'bar']            ])
        assert.deepEqual (partition ('\u001b[1mfoo\u0000bar\n'), [['\u001b[1m', 'foo'],   ['\u0000', 'bar'], ['\n', '']])
    })

    it ('gets first N visible symbols (preserving invisible parts)', () => {

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