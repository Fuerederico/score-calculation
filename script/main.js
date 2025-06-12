//エラーメッセージ表示 window.onerror = function(message, source, lineno, colno, error) { alert(Error: ${message}\nSource: ${source}\nLine: ${lineno}, Column: ${colno}); };

import { loadInstanceA } from './instanceA.js';

const instances = [];

async function initialize() { const instanceA = await loadInstanceA(); instances.push(instanceA);

populateDropdown(); setupEventListeners(); }

function populateDropdown() { const select = document.getElementById("instance-select"); instances.forEach((instance, index) => { const option = document.createElement("option"); option.value = index; option.textContent = instance.name; select.appendChild(option); }); }

function setupEventListeners() { const calculateBtn = document.getElementById("calculate-btn"); calculateBtn.addEventListener("click", () => { const select = document.getElementById("instance-select"); const selectedIndex = select.value; const instance = instances[selectedIndex];

const inputValues = [];
for (let i = 0; i < 6; i++) {
  const val = Number(document.getElementById(`input-${i}`).value) || 0;
  inputValues.push(val);
}

const selectedRadio = document.querySelector('input[name="selection"]:checked');
let selectedValue = 0;
if (selectedRadio) {
  const index = Number(selectedRadio.value);
  selectedValue = Number(document.getElementById(`input-${index}`).value) || 0;
}

const talent = inputValues[0];
const skill = [0].concat(inputValues.slice(1), selectedValue);

const { result1, result2 } = instance.calc_max_score(talent, skill);
document.getElementById("result").textContent = `${result1} / ${result2}`;

});

const inputsDiv = document.getElementById("inputs"); const instance = instances[0]; const skillRanks = instance.calc_skill_rank();

for (let i = 0; i < 6; i++) { const input = document.createElement("input"); input.type = "number"; input.id = input-${i}; input.placeholder = 入力${i + 1}; inputsDiv.appendChild(input);

if (i > 0) {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "selection";
  radio.value = i;
  inputsDiv.appendChild(radio);

  const rankSpan = document.createElement("span");
  rankSpan.textContent = ` ← ${skillRanks[i - 1]}位`;
  inputsDiv.appendChild(rankSpan);
}

inputsDiv.appendChild(document.createElement("br"));

} }

initialize();
