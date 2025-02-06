import { parseCT } from './parseCT';

import * as fs from 'fs';

import { parseDotBracket, sorted } from '@rnacanvas/position-pairs';

test('`function parseCT()`', () => {
  var ct = fs.readFileSync('test_inputs/hairpin.ct', 'utf8');
  expect(parseCT(ct).description).toBe('dG = -14.30 [Initially -14.30] 25Feb05-14-44-27');
  expect(parseCT(ct).sequence).toBe('AAAAGGGGGGAAAAAAACCCCCCUAAA');
  expect(parseCT(ct).positionPairs).toStrictEqual([[4, 24], [5, 23], [6, 22], [7, 21], [8, 20], [9, 19], [10, 18]]);
  expect(parseCT(ct).numberingOffset).toBe(0);

  var ct = fs.readFileSync('test_inputs/CYVaV_structure.ct', 'utf8');
  expect(parseCT(ct).sequence).toBe('ucucaaauggacacuccgcaaccauggcgucgccuccugcaaagaauugucauaugaguaugagguuguuggccggagaaugaguggugacauggacacugcauugggcaacugcgucauuaugucgauacuuacaugguuuaugcuuagugaacuuggcauuaagcaugaauuauucga');
  expect(parseCT(ct).positionPairs).toStrictEqual(sorted([...parseDotBracket('......((.((((...((((.(((((.(..(((((((.((.((.((((.(((((....))))))))).)).)).)))).....)))..).)))))....(((.....)))..))))......)))).))......(((((((((((((((((.......)))))))))))))))))....')]));

  var ct = fs.readFileSync('test_inputs/descriptionless.ct', 'utf8');
  expect(parseCT(ct).description).toBeUndefined();

  var ct = fs.readFileSync('test_inputs/zero_length.ct', 'utf8');
  expect(parseCT(ct).sequence.length).toBe(0);
  expect(parseCT(ct).positionPairs.length).toBe(0);
  expect(parseCT(ct).numberingOffset).toBe(0);

  var ct = fs.readFileSync('test_inputs/structureless.ct', 'utf8');
  expect(parseCT(ct).sequence.length).toBe(5);
  expect(parseCT(ct).positionPairs.length).toBe(0);

  var ct = fs.readFileSync('test_inputs/numbering_offset.ct', 'utf8');
  expect(parseCT(ct).numberingOffset).toBe(28);

  var ct = fs.readFileSync('test_inputs/leading_whitespace.ct', 'utf8');
  expect(parseCT(ct).sequence).toBe('AAAAGGGGGGAAAAAAACCCCCCUAAA');
  expect(parseCT(ct).positionPairs).toStrictEqual([[4, 24], [5, 23], [6, 22], [7, 21], [8, 20], [9, 19], [10, 18]]);

  var ct = fs.readFileSync('test_inputs/trailing_whitespace.ct', 'utf8');
  expect(parseCT(ct).sequence).toBe('AAAAGGGGGGAAAAAAACCCCCCUAAA');
  expect(parseCT(ct).positionPairs).toStrictEqual([[4, 24], [5, 23], [6, 22], [7, 21], [8, 20], [9, 19], [10, 18]]);

  var ct = fs.readFileSync('test_inputs/leading_comments.ct', 'utf8');
  expect(parseCT(ct).sequence).toBe('AAAAGGGGGGAAAAAAACCCCCCUAAA');
  expect(parseCT(ct).positionPairs).toStrictEqual([[4, 24], [5, 23], [6, 22], [7, 21], [8, 20], [9, 19], [10, 18]]);

  var ct = fs.readFileSync('test_inputs/trailing_comments.ct', 'utf8');
  expect(parseCT(ct).sequence).toBe('AAAAGGGGGGAAAAAAACCCCCCUAAA');
  expect(parseCT(ct).positionPairs).toStrictEqual([[4, 24], [5, 23], [6, 22], [7, 21], [8, 20], [9, 19], [10, 18]]);

  var ct = fs.readFileSync('test_inputs/RNAfold.ct', 'utf8');
  expect(parseCT(ct).description).toBe('ENERGY =   -50.2    1');
  expect(parseCT(ct).sequence).toBe('UCUCAAAUGGACACUCCGCAACCAUGGCGUCGCCUCCUGCAAAGAAUUGUCAUAUGAGUAUGAGGUUGUUGGCCGGAGAAUGAGUGGUGACAUGGACACUGCAUUGGGCAACUGCGUCAUUAUGUCGAUACUUACAUGGUUUAUGCUUAGUGAACUUGGCAUUAAGCAUGAAUUAUUCGA');
  expect(parseCT(ct).positionPairs).toStrictEqual(sorted([...parseDotBracket('.((((.(((.(((((..(((.....(((...)))...)))..))...)))))).)))).((((.((.((((.(((....(((((((..........)))).)))))).)))).)).))))....((((.......(((((((((((((((((.......)))))))))))))))))))))')]));
  expect(parseCT(ct).numberingOffset).toBe(0);
});
