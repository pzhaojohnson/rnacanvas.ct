import { isCT } from './isCT';

test('`function isCT()`', () => {
  // an unstructured structure
  expect(isCT(
    '50	dG = -10.90 [Initially -10.90] 26Apr18-13-56-50\n'
    + '1	a	0	2	0	1\n'
    + '2	g	1	3	0	2\n'
    + '3	c	2	4	0	3\n'
    + '4	g	3	5	0	4\n'
    + '5	c	4	6	0	5'
  )).toBe(true);

  // an empty structure
  expect(isCT(
    '0	dG = 0 [Initially 0] 26Apr18-13-56-50'
  )).toBe(false);

  // bare minimum (to be CT format)
  expect(isCT(
    '50\n'
    + '1	a	0	2	0'
  )).toBe(true);

  // bare minimum (but missing partner column)
  expect(isCT(
    '50\n'
    + '1	a	0	2'
  )).toBe(false);

  // bare minimum (but sequence length is not a number)
  expect(isCT(
    'A\n'
    + '1	a	0	2	0'
  )).toBe(false);

  // leading empty and whitespace lines
  expect(isCT(
    '\n'
    + '   \n'
    + '\t\n'
    + '50	dG = -10.90 [Initially -10.90] 26Apr18-13-56-50\n'
    + '1	a	0	2	0	1\n'
    + '2	g	1	3	0	2\n'
    + '3	c	2	4	0	3\n'
    + '4	g	3	5	0	4\n'
    + '5	c	4	6	0	5'
  )).toBe(true);

  // leading comment lines
  expect(isCT(
    '# Structure 1 \n'
    + '# A 5-nt unstructure structure.\n'
    + '\n'
    + '50	dG = -10.90 [Initially -10.90] 26Apr18-13-56-50\n'
    + '1	a	0	2	0	1\n'
    + '2	g	1	3	0	2\n'
    + '3	c	2	4	0	3\n'
    + '4	g	3	5	0	4\n'
    + '5	c	4	6	0	5'
  )).toBe(true);

  // a leading non-comment line
  expect(isCT(
    'Structure 1\n'
    + '50	dG = -10.90 [Initially -10.90] 26Apr18-13-56-50\n'
    + '1	a	0	2	0	1\n'
    + '2	g	1	3	0	2\n'
    + '3	c	2	4	0	3\n'
    + '4	g	3	5	0	4\n'
    + '5	c	4	6	0	5'
  )).toBe(false);

  // a leading non-comment line (that starts with a number)
  expect(isCT(
    '10 Structure\n'
    + '50	dG = -10.90 [Initially -10.90] 26Apr18-13-56-50\n'
    + '1	a	0	2	0	1\n'
    + '2	g	1	3	0	2\n'
    + '3	c	2	4	0	3\n'
    + '4	g	3	5	0	4\n'
    + '5	c	4	6	0	5'
  )).toBe(false);

  // trailing empty and whitespace lines
  expect(isCT(
    '50	dG = -10.90 [Initially -10.90] 26Apr18-13-56-50\n'
    + '1	a	0	2	0	1\n'
    + '2	g	1	3	0	2\n'
    + '3	c	2	4	0	3\n'
    + '4	g	3	5	0	4\n'
    + '5	c	4	6	0	5\n'
    + '\n'
    + '  \n'
    + '\t'
  )).toBe(true);

  // trailing comment lines
  expect(isCT(
    '50	dG = -10.90 [Initially -10.90] 26Apr18-13-56-50\n'
    + '1	a	0	2	0	1\n'
    + '2	g	1	3	0	2\n'
    + '3	c	2	4	0	3\n'
    + '4	g	3	5	0	4\n'
    + '5	c	4	6	0	5\n'
    + '\n'
    + '# Structure 1\n'
    + '# An unstructure structure.'
  )).toBe(true);

  // a trailing non-comment line
  expect(isCT(
    '50	dG = -10.90 [Initially -10.90] 26Apr18-13-56-50\n'
    + '1	a	0	2	0	1\n'
    + '2	g	1	3	0	2\n'
    + '3	c	2	4	0	3\n'
    + '4	g	3	5	0	4\n'
    + '5	c	4	6	0	5\n'
    + '\n'
    + 'Structure 1'
  )).toBe(false);

  // empty string
  expect(isCT('')).toBe(false);

  // just whitespace
  expect(isCT('  \t\n   \t\t\t \n  \r\n ')).toBe(false);

  // random text contents
  expect(isCT(
    'ihsoeih woeirj\n'
    + '  siejofiwe \n'
    + '\n'
    + '89283u 8uf '
  )).toBe(false);
});
