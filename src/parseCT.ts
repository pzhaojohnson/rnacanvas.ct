import { splitLines } from '@rnacanvas/utilities';

/**
 * Parses a CT string (e.g., the contents of a CT file).
 *
 * Throws if unable to parse the CT string.
 */
export function parseCT(ct: string) {
  let lines = splitLines(ct);

  let prunedLines = pruned(lines);

  return {
    description: parseDescription(prunedLines),
    sequence: parseSequence(prunedLines),
    positionPairs: parsePositionPairs(prunedLines),
    numberingOffset: parseNumberingOffset(prunedLines),
  };
}

/**
 * Prunes the lines of a CT string.
 *
 * Does not modify the input array of lines.
 */
function pruned(lines: string[]): string[] | never {
  let i = lines.findIndex(line => !isWhitespaceLine(line) && !isCommentLine(line));

  if (i < 0) {
    throw new Error('Unable to find the start of the structure.');
  }

  // don't reverse the original array of lines!
  // (the `reverse()` method acts in place)
  let reversedLines = [...lines].reverse();

  let j = reversedLines.findIndex(line => !isWhitespaceLine(line) && !isCommentLine(line));

  if (j < 0) {
    throw new Error('Unable to find the end of the structure.');
  }

  // un-reverse the index
  j = lines.length - j - 1;

  return lines.slice(i, j + 1);
}

/**
 * Checks if the line only contains whitespace characters.
 */
function isWhitespaceLine(line: string): boolean {
  return line.trim().length == 0;
}

/**
 * Checks if the only content in the line is a comment.
 */
function isCommentLine(line: string): boolean {
  return line.trim().charAt(0) == '#';
}

function parseDescription(prunedLines: string[]): string | undefined {
  if (prunedLines.length == 0) {
    return undefined;
  }

  let firstLine = prunedLines[0];

  let items = nonEmptySplitByWhitespace(firstLine);

  if (items.length < 2) {
    return undefined;
  }

  let sequenceLength = items[0];

  let description = firstLine.slice(firstLine.indexOf(sequenceLength) + sequenceLength.length);
  return description.trim();
}

function parseSequence(prunedLines: string[]): string | never {
  // lines containing characters in the sequence of the structure
  let characterLines = prunedLines.slice(1);

  let characters = characterLines.map(line => {
    let items = nonEmptySplitByWhitespace(line);

    if (items.length < 2) {
      throw new Error('Line is missing a character.');
    }

    return items[1];
  });

  return characters.join('');
}

function parsePositionPairs(prunedLines: string[]): PositionPair[] | never {
  // lines corresponding to positions in the structure
  let positionLines = prunedLines.slice(1);

  let positionPairs: PositionPair[] = [];

  positionLines.forEach((line, i) => {
    // the position corresponding to the line
    let p = i + 1;

    let items = nonEmptySplitByWhitespace(line);

    if (items.length >= 5) {
      // the partner position
      let q = Number.parseFloat(items[4]);

      if (Number.isNaN(q)) {
        throw new Error('Partner positions must be numbers.');
      } else if (!Number.isInteger(q)) {
        throw new Error('Partner positions must be integers.');
      }

      // don't duplicate pairs
      if (q != 0 && p <= q) {
        positionPairs.push([p, q]);
      }
    }
  });

  return positionPairs;
}

/**
 * A pairing of two positions in a sequence.
 */
type PositionPair = [number, number];

function parseNumberingOffset(prunedLines: string[]): number {
  if (prunedLines.length < 2) {
    return 0;
  }

  // the line corresponding to the first position in the structure
  let firstPositionLine = prunedLines[1];

  let items = nonEmptySplitByWhitespace(firstPositionLine);

  if (items.length < 6) {
    return 0;
  }

  let offsetPosition = Number.parseFloat(items[5]);

  if (Number.isNaN(offsetPosition)) {
    return 0;
  } else if (!Number.isInteger(offsetPosition)) {
    return 0;
  }

  return offsetPosition - 1;
}

function splitByWhitespace(s: string): string[] {
  return s.split(/\s/);
}

function nonEmptySplitByWhitespace(s: string): string[] {
  return splitByWhitespace(s).filter(isNonEmptyString);
}

function isEmptyString(s: string): boolean {
  return s.length == 0;
}

function isNonEmptyString(s: string): boolean {
  return s.length > 0;
}
