export class Random {
  static intInRange(min: number, max: number): number {
    const difference = max - min;
    const randomValue = Math.round(Math.random() * difference);

    return randomValue + min;
  }
}
