import { isValidNumberWithSuffix } from './utils';

describe('isValidNumberWithSuffix', () => {
  it('should return true for integers without suffix', () => {
    expect(isValidNumberWithSuffix('0')).toBeTrue();
    expect(isValidNumberWithSuffix('1')).toBeTrue();
    expect(isValidNumberWithSuffix('20')).toBeTrue();
    expect(isValidNumberWithSuffix('100')).toBeTrue();
    expect(isValidNumberWithSuffix('1000')).toBeTrue();
    expect(isValidNumberWithSuffix('1,000')).toBeTrue();
  });

  it('should return true for numbers with suffixes', () => {
    expect(isValidNumberWithSuffix('1k')).toBeTrue();
    expect(isValidNumberWithSuffix('250m')).toBeTrue();
    expect(isValidNumberWithSuffix('.5b')).toBeTrue();
    expect(isValidNumberWithSuffix('0.5b')).toBeTrue();
  });

  it('should return false for invalid formats', () => {
    expect(isValidNumberWithSuffix('1,0000')).toBeFalse(); // invalid comma grouping
    expect(isValidNumberWithSuffix('1.5.6')).toBeFalse(); // multiple decimals
    expect(isValidNumberWithSuffix('1,2,3,4k')).toBeFalse(); // improper commas
    expect(isValidNumberWithSuffix('k')).toBeFalse(); // just a suffix, no number
    expect(isValidNumberWithSuffix('k2')).toBeFalse(); // no numbes should exist after suffix
    expect(isValidNumberWithSuffix('100bb')).toBeFalse(); // only a single suffix allowed
  });
});
