export class Cell {
  private _value: number | null;
  private _marks: number[] = [];
  private _manipulated = false;

  error = false;

  constructor(value: number | null = null) {
    this._value = this.isValidValue(value) ? value : null;
  }

  addMark(value: number): void {
    if (value < 1 || value > 9) return;
    if (this._marks.includes(value)) return;
    if (this.value) return;

    this._marks.push(value);
  }

  resetManipulation(): void {
    this._manipulated = false;
  }

  get marks(): number[] {
    return this._marks;
  }

  get manipulated(): boolean {
    return this._manipulated;
  }

  get value(): number | null {
    return this._value;
  }

  set value(value: number | null) {
    this._value = this.isValidValue(value) ? value : null;
    this._marks = [];
    this._manipulated = true;
  }

  private isValidValue(value: number | null): boolean {
    if (value === null) return true;
    if (value >= 1 && value <= 9) return true;

    return false;
  }
}
