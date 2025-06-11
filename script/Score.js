export class Score {
  constructor(name, level, n_cnt, noteData) {
    this.name = name;
    this.level = level;
    this.n_cnt = n_cnt;
    this.noteData = noteData;

    this.type = noteData.map(d => d.type);
    this.c_bns = noteData.map(d => d.c_bns);
    this.actskl1 = noteData.map(d => d.actskl1);
    this.actskl2 = noteData.map(d => d.actskl2);
  }

  /*
  calculate(total, selectedValue) {
    // 仮の計算式なのだ（あとで書き換えるのだ）
    return this.noteData.reduce((sum, d) => sum + (total + selectedValue) * d.c_bns, 0);
  }
  */

  calculate(total, selectedValue) {
    // 仮の計算式なのだ（あとで書き換えるのだ）
    let sum = 0;
    for (let i = 0; i < this.n_cnt; i++) {
      sum += (total + selectedValue) * this.c_bns[i];
    }
    return sum;
  }

}
