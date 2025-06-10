//エラーメッセージ表示
window.onerror = function(message, source, lineno, colno, error) {
  alert(`Error: ${message}\nSource: ${source}\nLine: ${lineno}, Column: ${colno}`);
};

import { loadInstanceA } from './instanceA.js';

const instances = [];

async function initialize() {
  const instanceA = await loadInstanceA();
  instances.push(instanceA);

  populateDropdown();
  setupEventListeners();
}

function populateDropdown() {
  const select = document.getElementById("instance-select");
  instances.forEach((instance, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = instance.name;
    select.appendChild(option);
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
    const selectedValue = selectedRadio ? Number(selectedRadio.value) : 0;

    const result = instance.calculate(inputValues, selectedValue);
    document.getElementById("result").textContent = result.toFixed(2);
  });

  const inputsDiv = document.getElementById("inputs");
  for (let i = 0; i < 6; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.id = `input-${i}`;
    input.placeholder = `入力${i + 1}`;
    inputsDiv.appendChild(input);

    if (i > 0) {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "selection";
      radio.value = i;
      inputsDiv.appendChild(radio);
    }

    inputsDiv.appendChild(document.createElement("br"));
  }
}

initialize();