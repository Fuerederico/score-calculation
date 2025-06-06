import { InstanceType } from './instance.js';

const inputArea = document.getElementById('inputs');
const calculateBtn = document.getElementById('calculate-btn');
const resultDisplay = document.getElementById('result');
const instanceSelect = document.getElementById('instance-select');

// 入力6個とラジオボタンを生成するのだ
const inputCount = 6;
const radioName = 'selector';

for (let i = 0; i < inputCount; i++) {
  const div = document.createElement('div');

  const input = document.createElement('input');
  input.type = 'number';
  input.id = `input-${i}`;

  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = radioName;
  radio.value = i;

  div.appendChild(document.createTextNode(`入力${i + 1}: `));
  div.appendChild(input);
  div.appendChild(radio);
  inputArea.appendChild(div);
}

calculateBtn.addEventListener('click', () => {
  const selectedInstance = instanceSelect.value;
  const instance = new InstanceType(selectedInstance);

  const values = [];
  for (let i = 0; i < inputCount; i++) {
    const val = parseFloat(document.getElementById(`input-${i}`).value);
    values.push(isNaN(val) ? 0 : val);
  }

  const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
  if (!selectedRadio) {
    alert('どれか1つラジオボタンを選んでほしいのだ！');
    return;
  }
  const selectedIndex = parseInt(selectedRadio.value);
  const selectedValue = values[selectedIndex];

  const sum = values.reduce((a, b) => a + b, 0);
  const result = instance.calculate(sum, selectedValue);

  resultDisplay.textContent = result.toFixed(2);
});
