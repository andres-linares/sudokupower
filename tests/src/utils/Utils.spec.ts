import { Utils } from '../../../src/utils/Utils';

describe('intersection', () => {
  it('should return the insection between 2 arrays', () => {
    let array1 = [1, 2, 3];
    let array2 = [3, 4, 5];
    expect(Utils.intersection(array1, array2)).toEqual([3]);

    array1 = [1, 2, 3];
    array2 = [1, 2, 3];
    expect(Utils.intersection(array1, array2)).toEqual([1, 2, 3]);

    array1 = [1, 2, 3];
    array2 = [4, 5, 6];
    expect(Utils.intersection(array1, array2)).toEqual([]);
  });

  it('should return the same array when the method receive only 1 array', () => {
    expect(Utils.intersection([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should return the interception among multiple arrays', () => {
    let array1 = [1, 2, 3, 4, 5];
    let array2 = [1, 7];
    let array3 = [1, 9];

    expect(Utils.intersection(array1, array2, array3)).toEqual([1]);

    array1 = [1, 2, 3];
    array2 = [1, 2, 3];
    array3 = [4, 5, 6];

    expect(Utils.intersection(array1, array2, array3)).toEqual([]);
  });
});
