"use strict";

///////////////////// globals /////////////////////
const radioBoxes = document.querySelectorAll(".radio");
const display = document.querySelector(".screen");
const keys = document.querySelectorAll(".key");
let dotCount = 0;

///////////////////// handlers /////////////////////
function getTheme() {
    for (let radio of radioBoxes) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

///////////////////// events /////////////////////
radioBoxes.forEach(radio => {
    radio.addEventListener('change', () => {
        setTheme(getTheme());
    })
});

keys.forEach(key => {
    key.addEventListener('click', e => {
        handleKey(e);
    })
});

///////////////////// on start /////////////////////
trySavedTheme();

///////////////////// functions /////////////////////
function handleKey(e) {
    let hodnota = e.target.textContent;

    if (e.target.classList.contains("num")) {
        if (hodnota !== "." || dotCount === 0) {
            if (hodnota === ".") {
                dotCount++;
            }

            appendDisplay(hodnota);
        }
    } else if (e.target.classList.contains("action")) {
        switch (hodnota) {
            case "del":
                deleteLast();
                break;

            case "-":
                minus();
                break;
        }
    }
}

function getDisplayValue() {
    return display.textContent;
}

function appendDisplay(value) {
    display.textContent += value;
}

function deleteLast() {
    let obsah = getDisplayValue();
    obsah = obsah.slice(0, -1);
    display.textContent = obsah;
}

function deleteWhole() {
    display.textContent = "";
}

function minus() {
    if (getDisplayValue() === "") {
        writeDisplay("-");
    }


}

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
