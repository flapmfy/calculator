'use strict';

class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  operate() {
    const prev = Number.parseFloat(this.previousOperand);
    const curr = Number.parseFloat(this.currentOperand);
    let result;

    if (isNaN(prev) || isNaN(curr) || !this.operation) return;

    switch (this.operation) {
      case '÷':
        if (curr === 0) {
          result = 'ERROR';
          break;
        }

        result = prev / curr;
        break;

      case '×':
        result = prev * curr;
        break;

      case '+':
        result = prev + curr;
        break;

      case '-':
        result = prev - curr;
        break;
    }

    this.currentOperand = result;
    this.previousOperand = '';
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    } else if (number === '.' && this.currentOperand === '') {
      number = '0.';
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  getOperation(operation) {
    if (isNaN(this.currentOperand) || this.currentOperand === '') return;
    if (this.previousOperand) {
      this.operate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  formatNumber(numberString) {
    let digits = '';
    let floats = '';

    if (numberString.includes('.')) {
      numberString = numberString.split('.');
      digits = numberString[0];
      floats = numberString[1];

      return `${digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}.${floats}`;
    } else {
      digits = numberString;
      return `${digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`;
    }
  }

  updateDisplay() {
    this.currentText.innerText = this.formatNumber(this.currentOperand.toString());
    if (this.previousOperand) {
      this.previousText.innerText = `${this.formatNumber(this.previousOperand.toString())} ${this.operation}`;
    } else {
      this.previousText.innerText = '';
    }
  }
}

const themeRadios = document.querySelectorAll('input[type="radio"]');

const previousText = document.querySelector('.previous-text');
const currentText = document.querySelector('.current-text');
const numberKeys = document.querySelectorAll('[data-num]');
const operationKeys = document.querySelectorAll('[data-operation]');
const deleteKey = document.querySelector('[data-delete]');
const clearKey = document.querySelector('[data-clear]');
const equalsKey = document.querySelector('[data-equals]');

const calculator = new Calculator(previousText, currentText);

numberKeys.forEach((key) =>
  key.addEventListener('click', () => {
    calculator.appendNumber(key.innerText);
    calculator.updateDisplay();
  })
);

operationKeys.forEach((operation) =>
  operation.addEventListener('click', () => {
    calculator.getOperation(operation.innerText);
    calculator.updateDisplay();
  })
);

clearKey.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteKey.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalsKey.addEventListener('click', () => {
  calculator.operate();
  calculator.updateDisplay();
});

window.addEventListener('keydown', (e) => {
  e.preventDefault();
  const activatedKey = document.querySelector(`[data-key="${e.key}"`);

  if (Array.from(numberKeys).includes(activatedKey)) {
    calculator.appendNumber(activatedKey.innerText);
    calculator.updateDisplay();
  } else if (Array.from(operationKeys).includes(activatedKey)) {
    calculator.getOperation(activatedKey.innerText);
    calculator.updateDisplay();
  } else if (activatedKey === clearKey) {
    calculator.clear();
    calculator.updateDisplay();
  } else if (activatedKey === deleteKey) {
    calculator.delete();
    calculator.updateDisplay();
  } else if (activatedKey === equalsKey) {
    calculator.operate();
    calculator.updateDisplay();
  }
});

///////////////////// onload /////////////////////
document.onload = retrieveTheme();

///////////////////// theme setter /////////////////////
themeRadios.forEach((radio) => {
  radio.addEventListener('click', () => {
    const activeTheme = radio.id;
    localStorage.setItem('theme', activeTheme);

    setTheme(activeTheme);
  });
});

function retrieveTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    themeRadios.forEach((radio) => {
      if (radio.id === savedTheme) {
        radio.checked = true;
      }
    });

    setTheme(savedTheme);
  }
}

function setTheme(theme) {
  document.documentElement.className = theme;
}
