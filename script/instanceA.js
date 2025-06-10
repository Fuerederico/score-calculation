import { Score } from './Score.js';

export async function loadInstanceA() {
  const response = await fetch('data/A_array.json');
  const arrayData = await response.json();
  return new Score("A", 22, 544, arrayData);
}
