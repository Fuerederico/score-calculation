import { loadInstanceA } from './instanceA.js';
import { loadInstanceB } from './instanceB.js';

const instances = [];

function updateRankDisplay(instance) {
  const ranks = instance.calc_skill_rank();
  for (let i = 1; i <= 5; i++) {
    const span = document.getElementById(`rank-${i}`);
    if (span) {
      span.textContent = `${ranks[i - 1]}`;
    }
  }
}

async function initialize() {
  const instanceA = await loadInstanceA();
  instances.push(instanceA);

  const instanceB = await loadInstanceB();
  instances.push(instanceB);

  populateDropdown();
  setupEventListeners();

  const select = document.getElementById("instance-select");
  const instance = instances[Number(select.value)] || instances[0];
  updateRankDisplay(instance);

}

function populateDropdown() {
  const select = document.getElementById("instance-select");
  instances.forEach((instance, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = instance.name;
    select.appendChild(option);
  });

  // インスタンス選択時に順位を表示
  select.addEventListener("change", () => {
    const selectedIndex = select.value;
    const instance = instances[selectedIndex];
    updateRankDisplay(instance);
  });
}

function setupEventListeners() {
  const calculateBtn = document.getElementById("calculate-btn");
  calculateBtn.addEventListener("click", () => {
    const select = document.getElementById("instance-select");
    const selectedIndex = select.value;
    const instance = instances[selectedIndex];

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
    document.getElementById("result").innerHTML =
      `<pre style="font-size: 18px;">MAX: ${Math.floor(result1)}\nMIN: ${Math.floor(result2)}</pre>`;

  });

  const inputsDiv = document.getElementById("inputs");
  for (let i = 0; i < 6; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.id = `input-${i}`;
    const placeholders = ["総合力", "スキル1", "スキル2", "スキル3", "スキル4", "スキル5"];
    input.placeholder = placeholders[i];    
    inputsDiv.appendChild(input);

    if (i > 0) {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "selection";
      radio.value = i;
      inputsDiv.appendChild(radio);

      const span = document.createElement("span");
      span.id = `rank-${i}`;
      span.style.marginLeft = "8px";
      inputsDiv.appendChild(span);
    }

    inputsDiv.appendChild(document.createElement("br"));
  }

  const select = document.getElementById("instance-select");
  select.addEventListener("change", () => {
    const selectedIndex = select.value;
    const instance = instances[selectedIndex];
    updateRankDisplay(instance);
  });
}


initialize();
