import { Score } from './Score.js';

export async function loadScore() {
  let path = "";
  if (location.origin.includes("github.io")) {
    // GitHub Pages 用
    path = "/score-calculation/data/notes_0593.json";
  } else {
    // ローカル用（Live Serverなど）
    path = "./data/notes_0593.json";
  }

  const response = await fetch(path);
  const arrayData = await response.json();
  return new Score("独りんぼエンヴィー【EXP】", 22, arrayData);
}
