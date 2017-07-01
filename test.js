const assert = require ('assert')

describe ('printable-characters', () => {

    it ('counting visible letters works', () => {

		const { nonPrintableCharacters } = require ('./printable-characters')

		const printableTextOnly = s => s.replace (nonPrintableCharacters, '')
		    , looksEmpty = s => printableTextOnly (s).length === 0

		assert (!looksEmpty ('foobar'))
		assert ( looksEmpty ('\u001b[106m  \t  \t   \n     \u001b[49m'))
	})

	it ('removing ANSI codes works', () => {

		const { ansiEscapeCodes } = require ('./printable-characters')

		const brightCyanBg = '\u001b[106m'
		    , noBgColor    = '\u001b[49m'

		const foobar_withANSICodes = brightCyanBg + 'foobar' + noBgColor
		    , foobar               = foobar_withANSICodes.replace (ansiEscapeCodes, '')

		assert ('foobar' === foobar)
	})

	it ('matching printable characters works', () => {

		const { ansiEscapeCodes, printableCharacters } = require ('./printable-characters')

		const mask = s => s.replace (ansiEscapeCodes, '').replace (printableCharacters, '*')

		assert.equal (mask ('{ foo:'), '* ****')
	})
})