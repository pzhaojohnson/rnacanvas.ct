# Installation

With `npm`:

```
npm install @rnacanvas/ct
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// an example import
import { parseCT } from '@rnacanvas/ct';
```

## `function parseCT()`

Parses a string in CT format
(e.g., the string could be the contents of a CT file).

```javascript
var ctString = await ctFile.text();

var ct = parseCT(ctString);

/**
 * Information about the structure included in the header line
 * (e.g., the name of the structure, the delta-G).
 */
ct.description;

/**
 * The sequnce of the structure in the CT file.
 */
ct.sequence;

/**
 * An array of position pair tuples indicating the pairs in the structure.
 *
 * A position pair is a pairing of two positions in a sequence
 * using one-based indexing.
 */
ct.positionPairs;

/**
 * The numbering offset for the bases in the structure.
 *
 * Is 0 by default.
 */
ct.numberingOffset;
```

## `function isCT()`

Returns `true` if a string is in CT format
(e.g., could be the text contents of a CT file).

Returns `false` otherwise.

```javascript
// a 5-nt structure (with no base-pairs)
var s = (
  '5	dG = -2.00 [Initially -2.00] 26Apr18-14-48-11\n'
  + '1	A	0	2	0	1\n'
  + '2	U	1	3	0	2\n'
  + '3	G	2	4	0	3\n'
  + '4	C	3	5	0	4\n'
  + '5	A	4	6	0	5'
);

isCT(s); // true
```

Extra leading and trailing empty and whitespace lines are allowed,
as well as comment lines beginning with `#`.

```javascript
var s = (
  '\n'
  + '  \n'
  + '# A comment.\n'
  + '\t\n'
  + '5	dG = -2.00 [Initially -2.00] 26Apr18-14-48-11\n'
  + '1	A	0	2	0	1\n'
  + '2	U	1	3	0	2\n'
  + '3	G	2	4	0	3\n'
  + '4	C	3	5	0	4\n'
  + '5	A	4	6	0	5\n'
  + '\n'
  + '# Another comment.\t'
  + '\t\n'
);

isCT(s); // true
```

However, extra lines with text content that are not commented out are not allowed in CT format.

```javascript
var s = (
  'Not commented out.\n'
  + '\n'
  + '5	dG = -2.00 [Initially -2.00] 26Apr18-14-48-11\n'
  + '1	A	0	2	0	1\n'
  + '2	U	1	3	0	2\n'
  + '3	G	2	4	0	3\n'
  + '4	C	3	5	0	4\n'
  + '5	A	4	6	0	5\n'
  + '\n'
  + 'Not commented out either.'
);

isCT(s); // false
```
