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
 * An array of position pair tuples that indicate the pairs in the structure.
 *
 * A position pair is a pairing of two positions in a sequence using one-based indexing.
 */
ct.positionPairs;

/**
 * The numbering offset for the bases in the structure.
 *
 * Is 0 by default.
 */
ct.numberingOffset;
```
