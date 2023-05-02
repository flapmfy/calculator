"use strict";

// globals
const radioBoxes = document.querySelectorAll(".radio");

// events
radioBoxes.forEach(radio => {
    radio.addEventListener('change', () => {
        setTheme(getTheme());
    })
});

// handlers
function getTheme() {
    for (let radio of radioBoxes) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

// functions
function setTheme(theme) {
    document.documentElement.className = theme;
}