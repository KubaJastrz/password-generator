import { createCSVData } from '../src/utils/app';

describe('createCSVData', () => {
  const eol = '\r\n';

  it('should create csv data from array', () => {
    const data = [
      ['one', 'two'],
      ['three', 'four']
    ];

    const result = createCSVData(data);

    const expected = 
      'one,two' + eol +
      'three,four' + eol;

    expect(result).toBe(expected);
  });

  it('should include header', () => {
    const data = [
      ['one', 'two'],
      ['three', 'four']
    ];

    const result = createCSVData(data, 'First,Second');

    const expected = 
      'First,Second' + eol +
      'one,two' + eol +
      'three,four' + eol;

    expect(result).toBe(expected);
  });

  it('should allow custom delimiter', () => {
    const data = [
      ['one', 'two'],
      ['three', 'four']
    ];

    const result = createCSVData(data, null, ';');

    const expected = 
      'one;two' + eol +
      'three;four' + eol;

    expect(result).toBe(expected);
  });

  it('should handle delimiter', () => {
    const data = [
      ['one', 'tw,o'],
      ['thr,ee', 'four']
    ];

    const result = createCSVData(data);

    const expected = 
      'one,"tw,o"' + eol +
      '"thr,ee",four' + eol;

    expect(result).toBe(expected);
  });

  it('should handle custom delimiter', () => {
    const data = [
      ['one', 'tw;o'],
      ['thr;ee', 'four']
    ];

    const result = createCSVData(data, null, ';');

    const expected = 
      'one;"tw;o"' + eol +
      '"thr;ee";four' + eol;

    expect(result).toBe(expected);
  });

  it('should handle empty line', () => {
    const data = [
      ['one', 'tw\no'],
      ['thr\nee', 'four']
    ];

    const result = createCSVData(data);

    const expected = 
      'one,"tw\no"' + eol +
      '"thr\nee",four' + eol;

    expect(result).toBe(expected);
  });

  it('should handle quotes', () => {
    const data = [
      ['one', 'tw"o'],
      ['thr"ee', 'four']
    ];

    const result = createCSVData(data);

    const expected = 
      'one,"tw""o"' + eol +
      '"thr""ee",four' + eol;

    expect(result).toBe(expected);
  });
});