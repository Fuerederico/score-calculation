export class Score {
  constructor(name) {
    this.name = name;
    switch (name) {
      case 'A':
        this.level = 22;
        this.n_count = 544;
        this.multiplier = 2;
        break;
      case 'B':
        this.level = 29;
        this.n_count = 1254;
        this.multiplier = 3;
        break;
      default:
        this.level = 1;
        this.n_count = 0;
        this.multiplier = 1;
    }
  }

  calculate(total, selectedValue) {
    return total * this.multiplier * selectedValue;
  }
}
