'use strict';

///////////////////// globals /////////////////////
const themeRadios = document.querySelectorAll('input[type="radio"]');
const display = document.querySelector('.screen');
const keys = document.querySelectorAll('.key');
const keyPad = document.querySelector('.keypad');
let dotCount = 0;

let result = null;
let secondNumber = 0;
let currentOperation = '';
let isOperating = false;
///////////////////// handlers /////////////////////

///////////////////// events /////////////////////
keys.forEach((key) => {
	key.addEventListener('click', () => {
		handleKey(key);
	});
});

window.addEventListener('keyup', (e) => {
	let key = keyPad.querySelector(`[keycode="${e.keyCode}"]`);
	console.log(key);
	if (key) {
		handleKey(key);
	}
});

///////////////////// onload /////////////////////
document.onload = retrieveTheme();

///////////////////// functions /////////////////////
function handleKey(key) {
	let hodnota = key.textContent;

	if (key.classList.contains('num')) {
		if (hodnota !== '.' || dotCount === 0) {
			if (hodnota === '.') {
				dotCount++;
			}

			if (getDisplayValue() === '0' || isOperating) {
				setDisplay(hodnota);
				isOperating = false;
			} else {
				writeDisplay(hodnota);
			}
		}
	} else {
		switch (hodnota) {
			case 'del':
				deleteLast();
				break;

			case 'reset':
				reset();
				break;

			default:
				handleOperation(key.id);
		}
	}
}

function getDisplayValue() {
	return display.textContent;
}

function writeDisplay(value) {
	display.textContent += value;
}

function setDisplay(value) {
	display.textContent = value;
}

function deleteLast() {
	let displayValue = getDisplayValue();
	displayValue = displayValue.slice(0, -1);

	if (displayValue === '') {
		displayValue = 0;
	}

	setDisplay(displayValue);
}

///////////////////// operations /////////////////////
function divide(num1, num2) {
	if (num2 === 0) {
		return 'ERROR';
	}

	return num1 / num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function reset() {
	display.textContent = 0;
	result = null;
	currentOperation = '';
}

function operate(num1, num2, operation) {
	//return operation(num1, num2);
	if (operation === 'add') {
		return add(num1, num2);
	} else if (operation === 'subtract') {
		return subtract(num1, num2);
	} else if (operation === 'multiply') {
		return multiply(num1, num2);
	} else if (operation === 'divide') {
		return divide(num1, num2);
	}
}

function handleOperation(operation) {
	isOperating = true;
	const currentValue = +getDisplayValue();

	if (!currentValue) {
		result = 0;
	}

	if (result === null) {
		result = currentValue;
	}

	if (currentOperation) {
		result = operate(result, currentValue, currentOperation);
	}

	currentOperation = operation;

	setDisplay(result);
	dotCount = 0;

	console.log('result: ' + result);
	console.log('currentvalue: ' + currentValue);
	console.log('operator: ' + currentOperation);
}

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
