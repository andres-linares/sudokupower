import { Cell } from '../../src/Cell';

describe('Value', () => {
  it('should only set values from 1 to 9 or null on constructor, otherwise set null', () => {
    expect(new Cell(1).value).toEqual(1);
    expect(new Cell(5).value).toEqual(5);
    expect(new Cell(9).value).toEqual(9);
    expect(new Cell(null).value).toEqual(null);

    expect(new Cell(0).value).toEqual(null);
    expect(new Cell(-6).value).toEqual(null);
    expect(new Cell(10).value).toEqual(null);
    expect(new Cell(69).value).toEqual(null);
  });

  it('should only set values from 1 to 9 or null on setter, otherwise set null', () => {
    let cell = new Cell(null);
    cell.value = 1;
    expect(cell.value).toEqual(1);
    cell.value = 5;
    expect(cell.value).toEqual(5);
    cell.value = 9;
    expect(cell.value).toEqual(9);
    cell.value = null;
    expect(cell.value).toEqual(null);

    cell.value = 0;
    expect(cell.value).toEqual(null);
    cell.value = -6;
    expect(cell.value).toEqual(null);
    cell.value = 10;
    expect(cell.value).toEqual(null);
    cell.value = 69;
    expect(cell.value).toEqual(null);
  });
});

describe('Marks', () => {
  it('should not have marks initially', () => {
    expect(new Cell().marks).toEqual([]);
  });

  it('should add only valid marks', () => {
    const cell = new Cell();

    cell.addMark(2);
    expect(cell.marks).toEqual([2]);

    cell.addMark(20);
    expect(cell.marks).toEqual([2]);

    cell.addMark(7);
    expect(cell.marks).toEqual([2, 7]);

    cell.addMark(0);
    expect(cell.marks).toEqual([2, 7]);

    cell.addMark(3);
    expect(cell.marks).toEqual([2, 7, 3]);
  });

  it('should not repeat marks', () => {
    const cell = new Cell();
    cell.addMark(1);
    cell.addMark(1);
    expect(cell.marks).toEqual([1]);
  });

  it('should not add marks to a cell that has a value', () => {
    const cell = new Cell(1);
    cell.addMark(1);
    expect(cell.marks).toEqual([]);
  });

  it('should erase the marks after a value is set', () => {
    const cell = new Cell();
    cell.addMark(1);
    cell.value = 1;
    expect(cell.marks).toEqual([]);
  });
});

describe('Manipulated', () => {
  it('should not be manipulated when value is set from constructor', () => {
    expect(new Cell().manipulated).toEqual(false);
    expect(new Cell(1).manipulated).toEqual(false);
  });

  it('should be manipulated when value is set from setter', () => {
    const cell = new Cell();
    cell.value = 2;
    expect(cell.manipulated).toEqual(true);
  });

  it('should be possible to reset manipulation', () => {
    const cell = new Cell();
    cell.value = 2;
    cell.resetManipulation();
    expect(cell.manipulated).toEqual(false);
  });
});
