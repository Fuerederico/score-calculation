export class Score {
  static weight = [1, 2, 0.1, 0.2, 0.1, 0.2, 1, 3];

  constructor(name, level, noteData) {
    this.name = name;
    this.level = level;
    this.noteData = noteData;

    this.type = noteData.map(d => d.type);
    this.c_bns = noteData.map(d => d.c_bns);
    this.actskl1 = noteData.map(d => d.actskl1);
    this.actskl2 = noteData.map(d => d.actskl2);
  }

  calc_unit_score(talent) {
    const weight = Score.weight;
    const lv_fcr = 0.005 * (this.level - 5) + 1;
    const w_cnt = this.type.reduce((sum, t) => sum + weight[t - 1], 0);
    const raw_scr = 4.0 * talent * lv_fcr / w_cnt;

    return this.type.map(t => raw_scr * weight[t - 1]);
  }

  calc_max_score(talent, skill) {
    const s_bns1 = [];
    const s_bns2 = [];
    const n_cnt = this.type.length;
    const u_scr = this.calc_unit_score(talent);

    for (let i = 0; i < n_cnt; i++) {
      s_bns1[i] = 1 + skill[this.actskl1[i]] / 100;
      s_bns2[i] = 1 + skill[this.actskl2[i]] / 100;
    }

    let result1 = 0;
    let result2 = 0;

    for (let i = 0; i < n_cnt; i++) {
      const partial1 = u_scr[i] * this.c_bns[i] * s_bns1[i];
      const partial2 = u_scr[i] * this.c_bns[i] * s_bns2[i];

      result1 += Math.floor(partial1 * 100) / 100;
      result2 += Math.floor(partial2 * 100) / 100;
    }

    return {
      result1: Math.floor(result1),
      result2: Math.floor(result2)
    };
  }

  calc_skill_rank() {
    const weight = Score.weight;
    const n_cnt = this.type.length;
    const w_cnt_skl = Array(7).fill(0);

    for (let i = 0; i < n_cnt; i++) {
      w_cnt_skl[this.actskl1[i]] += weight[this.type[i] - 1];
    }

    const sliced = w_cnt_skl.slice(1, 6);
    const sorted = [...sliced].map((val, idx) => ({ val, idx })).sort((a, b) => b.val - a.val);

    const rank = Array(5);
    for (let i = 0; i < 5; i++) {
      rank[sorted[i].idx] = i + 1;
    }

    return rank;
  }
}
