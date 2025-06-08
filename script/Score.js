export class Score {
  constructor(name, level, n_count, arrayData) {
    this.name = name;
    this.level = level;
    this.n_count = n_count;

    // 配列データの分解
    this.type = arrayData.map(d => d.type);
    this.c_bns = arrayData.map(d => d.c_bns);
    this.actskl1 = arrayData.map(d => d.actskl1);
    this.actskl2 = arrayData.map(d => d.actskl2);
  }

  // メソッド例
  calculate(total, selectedValue) {
    return total * selectedValue * this.level; // 仮
  }
}
