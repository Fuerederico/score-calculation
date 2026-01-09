import { Score } from './Score.js';

export async function loadScore() {
  let path = "";
  if (location.origin.includes("github.io")) {
    // GitHub Pages 用
    path = "/score-calculation/data/notes_6144.json";
  } else {
    // ローカル用（Live Serverなど）
    path = "./data/notes_6144.json";
  }

  const response = await fetch(path);
  const arrayData = await response.json();
  return new Score("Polar Star【MAS】", 31, arrayData);
}
