"use strict";

///////////////////// globals /////////////////////
const radioBoxes = document.querySelectorAll(".radio");

///////////////////// handlers /////////////////////
function getTheme() {
    for (let radio of radioBoxes) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

///////////////////// events /////////////////////
trySavedTheme();

radioBoxes.forEach(radio => {
    radio.addEventListener('change', () => {
        setTheme(getTheme());
    })
});

///////////////////// functions /////////////////////
function setTheme(theme) {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
}

function trySavedTheme() {
    const theme = localStorage.getItem('theme');
    for (let radio of radioBoxes) {
        if (radio.value === theme) {
            radio.checked = true;
            break;
        }
    }
    theme && setTheme(theme);
}