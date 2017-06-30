A little regex helper for telling the "printable" (visible) parts of a string from the invisible ones: whitespaces, newlines, control characters, ANSI styling, etc.:

```javascript
const nonPrintableCharacters = '\ \0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383 .... long long regexp ...'
    , printableCharacters = '^' + nonPrintableCharacters
    , ansiEscapeCodes = '[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]'

module.exports = {

    nonPrintableCharacters: new RegExp ('(' + ansiEscapeCodes + ')|[' + nonPrintableCharacters + ']', 'g'),
       printableCharacters: new RegExp ('[' + printableCharacters + ']', 'g'),
           ansiEscapeCodes: new RegExp (ansiEscapeCodes, 'g'),
}
```

Counting visible letters:

```javascript
const { nonPrintableCharacters } = require ('printable-characters')

const printableTextOnly = s => s.replace (nonPrintableCharacters, '')
    , looksEmpty = s => printableTextOnly (s).length === 0

looksEmpty ('foobar')                                  // === false
looksEmpty ('\u001b[106m  \t  \t   \n     \u001b[49m') // === true
```

Cleaning ANSI codes:

```javascript
const { ansiEscapeCodes } = require ('printable-characters')

const brightCyanBg = '\u001b[106m'
    , noBgColor    = '\u001b[49m'

const foobar_withANSICodes = brightCyanBg + 'foobar' + noBgColor
    , foobar               = foobar_withANSICodes.replace (ansiEscapeCodes, '') // === "foobar"
```
