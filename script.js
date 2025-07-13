let display = document.getElementById("display");
let currentInput = '';
let resultShown = false;

function appendNumber(number) {
  if (resultShown) {
    currentInput = '';
    resultShown = false;
  }
  if (number === '.' && currentInput.slice(-1) === '.') return;
  currentInput += number;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === '') return;
  if (isOperator(currentInput.slice(-1))) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay();
}

function isOperator(char) {
  return ['+', '-', '*', '/', '%'].includes(char);
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    let finalInput = currentInput.replace(/%/g, '/100');
    let result = eval(finalInput);
    if (result === Infinity || isNaN(result)) throw Error("Math Error");
    display.textContent = result;
    currentInput = result.toString();
    resultShown = true;
  } catch (e) {
    display.textContent = "Error";
    currentInput = '';
    resultShown = true;
  }
}

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

// Keyboard support
document.addEventListener("keydown", function (e) {
  if (!isNaN(e.key) || e.key === '.') {
    appendNumber(e.key);
  } else if (['+', '-', '*', '/', '%'].includes(e.key)) {
    appendOperator(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    deleteLast();
  } else if (e.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
