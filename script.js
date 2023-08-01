'use strict';

///////////////////// globals /////////////////////
const themeRadios = document.querySelectorAll('input[type="radio"]');
const display = document.querySelector('.screen');
const keys = document.querySelectorAll('.key');
const keyPad = document.querySelector('.keypad');
let dotCount = 0;

///////////////////// handlers /////////////////////

///////////////////// events /////////////////////
keys.forEach((key) => {
	key.addEventListener('click', () => {
		handleKey(key);
	});
});

window.addEventListener('keyup', (e) => {
	const key = keyPad.querySelector(`[keycode="${e.keyCode}"]`);
	console.log(e.keyCode);
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

			writeDisplay(hodnota);
		}
	} else {
		switch (hodnota) {
			case 'del':
				deleteLast();
				break;

			case '-':
				minus();
				break;
		}
	}
}

function getDisplayValue() {
	return display.textContent;
}

function writeDisplay(value) {
	display.textContent += value;
}

function deleteLast() {
	let obsah = getDisplayValue();
	obsah = obsah.slice(0, -1);
	display.textContent = obsah;
}

function deleteWhole() {
	display.textContent = '';
}

function minus() {
	if (getDisplayValue() === '') {
		writeDisplay('-');
	}
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
