import { parseCT } from './parseCT';

import { splitLines } from '@rnacanvas/utilities';

import { first } from '@rnacanvas/utilities';

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

  // prune lines
  lines = lines.filter(line => !isEmptyString(line) && !isWhitespace(line) && !isCommentLine(line));

  if (lines.length == 0) {
    return false;
  }

  let headerLine = first(lines);

  let sequenceLength = Number.parseFloat(headerLine.trim().split(/\s+/)[0]);

  // the header line must start with the sequence length
  if (!Number.isInteger(sequenceLength)) {
    return false;
  }

  let positionLines = lines.slice(1);

  // there must be at least one position line
  if (positionLines.length == 0) {
    return false;
  }

  return positionLines.every(line => {
    let items = line.trim().split(/\s+/);

    // there must be a partner column
    if (items.length < 5) {
      return false;
    }

    let partner = Number.parseFloat(items[4]);

    // partner must be specified
    return Number.isInteger(partner);
  });
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
