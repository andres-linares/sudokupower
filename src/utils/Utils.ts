export class Utils {
  static intersection<T>(array1: T[], ...arrays: T[][]): T[] {
    if (arrays.length === 0) return array1;

    let intersected = array1;

    for (let i = 0; i < arrays.length; i++) {
      intersected = intersected.filter((item) => arrays[i].includes(item));
    }

    return intersected;
  }

  static getRepeated<T>(array: T[]): T[] {
    const repeated: T[] = [];

    const stringify = (x: T) => JSON.stringify(x);
    const areEqual = (x1: T, x2: T) => stringify(x1) === stringify(x2);

    for (const item of array) {
      const isRepeated = array.filter((x) => areEqual(x, item)).length > 1;

      if (isRepeated && !repeated.find((x) => areEqual(x, item))) {
        repeated.push(item);
      }
    }

    return repeated;
  }
}
