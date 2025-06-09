import { loadInstanceA } from './instanceA.js';

let instances = [];

document.addEventListener("DOMContentLoaded", async () => {
  const instanceA = await loadInstanceA();
  instances.push(instanceA);

  populateDropdown(instances);
  setupEventListeners(instances);
});

function populateDropdown(instances) {
  const select = document.getElementById("scoreSelect");
  instances.forEach((instance, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = instance.name;
    select.appendChild(option);
  });
}

function setupEventListeners(instances) {
  document.getElementById("calculateBtn").addEventListener("click", () => {
    const selectedIndex = document.getElementById("scoreSelect").value;
    const instance = instances[selectedIndex];

    const inputs = [...document.querySelectorAll(".input-box")].map(input => Number(input.value));
    const radios = [...document.querySelectorAll("input[name='radioGroup']")];
    const selectedRadio = radios.find((r, i) => r.checked && i > 0); // 最初の入力はラジオなし

    if (!selectedRadio) {
      alert("ラジオボタンを1つ選択してくださいなのだ。");
      return;
    }

    const selectedIndexRadio = radios.findIndex((r, i) => r.checked && i > 0);
    const selectedValue = inputs[selectedIndexRadio];

    const total = inputs.reduce((a, b) => a + b, 0);
    const result = instance.calculate(total, selectedValue);

    document.getElementById("output1").textContent = `結果: ${result}`;
    document.getElementById("output2").textContent = `選択値: ${selectedValue}`;
  });
}
