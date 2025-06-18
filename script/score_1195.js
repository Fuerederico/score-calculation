import { Score } from './Score.js';

export async function loadScore() {
  let path = "";
  if (location.origin.includes("github.io")) {
    // GitHub Pages 用
    path = "/score-calculation/data/notes_1195.json";
  } else {
    // ローカル用（Live Serverなど）
    path = "./data/notes_1195.json";
  }

  const response = await fetch(path);
  const arrayData = await response.json();
  return new Score("群青讃歌【APD】", 29, arrayData);
}
