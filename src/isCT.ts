import { parseCT } from './parseCT';

import { splitLines } from '@rnacanvas/utilities';

/**
 * Returns `true` if a string is in CT format
 * (e.g., could be the text contents of a CT file).
 *
 * Returns `false` otherwise.
 */
export function isCT(s: string): boolean {
  let parsed;

  try {
    parsed = parseCT(s);
  } catch {
    return false;
  }

  if (parsed.sequence.length == 0) {
    return false;
  }

  let lines = splitLines(s);

  // find the index of the first line that's not empty, whitespace or a comment line
  let headerIndex = lines.findIndex(line => !isEmptyString(line) && !isWhitespace(line) && !isCommentLine(line));

  if (headerIndex < 0) {
    return false;
  }

  let headerLine = lines[headerIndex];

  let sequenceLength = Number.parseFloat(headerLine.trim().split(/\s+/)[0]);

  // the header line must start with the sequence length
  if (!Number.isInteger(sequenceLength)) {
    return false;
  }

  // there must be at least one position line
  if (headerIndex == lines.length - 1) {
    return false;
  }

  let firstPositionLine = lines[headerIndex + 1];

  let firstPositionItems = firstPositionLine.trim().split(/\s+/);

  // the partner column must be included
  if (firstPositionItems.length < 5) {
    return false;
  }

  let partner = Number.parseFloat(firstPositionItems[4]);

  return Number.isInteger(partner);
}

function isEmptyString(s: string): boolean {
  return s.length == 0;
}

function isWhitespace(s: string): boolean {
  return s.trim().length == 0;
}

function isCommentLine(s: string): boolean {
  // check if is multiple lines
  if (splitLines(s).length > 1) {
    return false;
  }

  return s.trim().charAt(0) == '#';
}
