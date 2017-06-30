## What for

- [x] Detecting optically "empty" strings consisting of whitespaces / non-printable symbols / escape codes only
- [x] Cleaning up ANSI escape codes

## Usage

Measuring "printable" text length:

```javascript
const { printableText } = require ('printable-characters')

if (printableText (str).length === 0) {
    
    // this string appears as empty string
}
```

Accessing `ansiEscapeCodes` and `printableCharacters` regular expressions:

```javascript
const { ansiEscapeCodes, printableCharacters  } = require ('printable-characters')

const fillWithWhitespaces = str => str
                                    .replace (ansiEscapeCodes, '')
                                    .replace (printableCharacters, ' ')

assert.equal (fillWithWhitespaces ('\u001b[106m' + 'foo\tbar\nbaz'), '   \t   \n   ')
```

There is also `nonPrintableCharacters` member, which is inverse of `printableCharacters`.
