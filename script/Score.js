export class Score {
  constructor(name, level, n_count, multiplier) {
    this.name = name;
    this.level = level;
    this.n_count = n_count;
    this.multiplier = multiplier;
  }

  calculate(total, selectedValue) {
    return total * this.multiplier * selectedValue;
  }
}
