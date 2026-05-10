const form = document.querySelector('#random-form');
const resultNode = document.querySelector('#random-result');
const minInput = document.querySelector('#min-value');
const maxInput = document.querySelector('#max-value');

const state = {
  min: 1,
  max: 10,
  result: 2,
};

const integerPattern = /^[+-]?\d+$/;

function syncUi() {
  minInput.value = String(state.min);
  maxInput.value = String(state.max);
  resultNode.textContent = String(state.result);
}

function parseInteger(rawValue) {
  const value = rawValue.trim();

  if (!value || !integerPattern.test(value)) {
    return null;
  }

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function readRange() {
  const min = parseInteger(minInput.value);
  const max = parseInteger(maxInput.value);

  if (min === null || max === null || min > max || !Number.isSafeInteger(max - min)) {
    return null;
  }

  return { min, max };
}

function restoreLastValidValues() {
  minInput.value = String(state.min);
  maxInput.value = String(state.max);
}

function commitRange(range) {
  state.min = range.min;
  state.max = range.max;
  restoreLastValidValues();
}

function randomIntegerInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleBlur() {
  const range = readRange();

  if (!range) {
    restoreLastValidValues();
    return;
  }

  commitRange(range);
}

function handleSubmit(event) {
  event.preventDefault();

  const range = readRange();

  if (!range) {
    restoreLastValidValues();
    return;
  }

  commitRange(range);
  state.result = randomIntegerInclusive(state.min, state.max);
  resultNode.textContent = String(state.result);
}

minInput.addEventListener('blur', handleBlur);
maxInput.addEventListener('blur', handleBlur);
form.addEventListener('submit', handleSubmit);

syncUi();
