export class Score {
  constructor(name, level, n_count, arrayData) {
    this.name = name;
    this.level = level;
    this.n_count = n_count;

    this.type = arrayData.map(d => d.type);
    this.c_bns = arrayData.map(d => d.c_bns);
    this.actskl1 = arrayData.map(d => d.actskl1);
    this.actskl2 = arrayData.map(d => d.actskl2);
  }

  calculate(total, selectedValue) {
    let sum = 0;
    for (let i = 0; i < this.n_count; i++) {
      sum += (total + selectedValue) * this.c_bns[i];
    }
    return sum;
  }
}
