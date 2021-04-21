export class Random {
  static intInRange(min: number, max: number): number {
    const difference = max - min + 1;
    const randomValue = Math.floor(Math.random() * difference + min);

    return randomValue;
  }
}
