export class Utils {
  static intersection<T>(array1: T[], ...arrays: T[][]): T[] {
    if (arrays.length === 0) return array1;

    let intersected = array1;

    for (let i = 0; i < arrays.length; i++) {
      intersected = intersected.filter((item) => arrays[i].includes(item));
    }

    return intersected;
  }
}
