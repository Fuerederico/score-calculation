import { Score } from './Score.js';

export async function loadInstanceA() {
  let path = "";
  if (location.origin.includes("github.io")) {
    // GitHub Pages 用
    path = "/score-calculation/data/A_array.json";
  } else {
    // ローカル用（Live Serverなど）
    path = "./data/A_array.json";
  }

  const response = await fetch(path);
  const arrayData = await response.json();
  return new Score("A", 22, 544, arrayData);
}
