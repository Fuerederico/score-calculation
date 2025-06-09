import { Score } from "./Score.js";
import { instanceA } from "./instanceA.js";

let instances = [instanceA];

const instanceSelect = document.getElementById("instance-select");
const inputsContainer = document.getElementById("inputs-container");
const calculateBtn = document.getElementById("calculate-btn");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");

// インスタンスをセレクトボックスに追加
instances.forEach(inst => {
  const option = document.createElement("option");
  option.value = inst.name;
  option.textContent = inst.name;
  instanceSelect.appendChild(option);
});

function createInputs() {
  inputsContainer.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.type = "number";
    input.className = "input-box";
    input.dataset.index = i;

    div.appendChild(input);
    if (i > 0) {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "selected";
      radio.value = i;
      div.appendChild(radio);
    }
    inputsContainer.appendChild(div);
  }
}

createInputs();

calculateBtn.addEventListener("click", () => {
  const selectedName = instanceSelect.value;
  const instance = instances.find(i => i.name === selectedName);
  const inputs = document.querySelectorAll(".input-box");
  const radios = document.querySelectorAll("input[type=radio][name=selected]");

  const values = Array.from(inputs).map(input => Number(input.value));
  const selectedRadio = Array.from(radios).find(r => r.checked);
  const selectedValue = selectedRadio ? values[selectedRadio.value] : 0;

  const total = values.reduce((sum, v) => sum + v, 0);

  const output = instance.calculate(total, selectedValue);
  result1.textContent = `計算結果: ${output.toFixed(2)}`;
  result2.textContent = `インスタンス: ${instance.name}, level: ${instance.level}`;
});
