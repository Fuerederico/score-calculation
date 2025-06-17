import { Score } from './Score.js';

export async function loadInstanceB() {
  let path = "";
  if (location.origin.includes("github.io")) {
    // GitHub Pages 用
    path = "/score-calculation/data/B_array.json";
  } else {
    // ローカル用（Live Serverなど）
    path = "./data/B_array.json";
  }

  const response = await fetch(path);
  const arrayData = await response.json();
  return new Score("群青讃歌【APD】", 29, 1254, arrayData);
}
