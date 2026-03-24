'use strict';

const disp = document.getElementById("disp");

let current = "";
let previous = "";
let operator = "";

updateDisplay();

function updateDisplay() {
    if (current !== "") {
        disp.textContent = current;
        return;
    }
    if (previous !== "") {
        disp.textContent = previous;
        return;
    }
    disp.textContent = "0";
}

function inputNumber(num) {
    
    if (current === "Err" || current === "0") {
        current = num;
        updateDisplay();
        return;
    }
    
    if (current.length > 10) {
        current = "Err";
    };
    
    current += num;
    updateDisplay();
}

function inputOperator(op) {
    if (current === "" && previous === "") return;

    if (current === "Err") return;

    if (current === "") {
        operator = op;
        updateDisplay();
        return;
    };

    previous = current;
    current = "";
    operator = op;
    updateDisplay();
}

function calculate() {
if (current === "" || previous === "") return;

    let a = Number(previous);
    let b = Number(current);

    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    }
    if(!operations[operator]) return;

    if (operator === "/" && b === 0) {
        current = "Err";
        previous = "";
        operator = "";
        updateDisplay();
        return;
    }

    const result = operations[operator](a, b);

    current = String(Number(result.toFixed(10)));
    previous = current;
    operator = "";
    updateDisplay();
}

function clearAll() {
    current = "";
    previous = "";
    operator = "";
    updateDisplay();
}

function inputDot() {
    if(current === "Err") return;

    if(current.includes(".")) return;

    if(current === "") {
        current = "0.";
        updateDisplay();
        return
    }

    current += ".";
    updateDisplay();
}

const activeSound = document.getElementById("activeSound");
document.querySelectorAll("[data-num]").forEach(btn => {
    btn.addEventListener("click", () => {
        inputNumber(btn.dataset.num);
        activeSound.currentTime = 0;
        activeSound.play();
    });
});
document.querySelectorAll("[data-op]").forEach(btn => {
    btn.addEventListener("click", () => {
        inputOperator(btn.dataset.op);
        activeSound.currentTime = 0;
        activeSound.play();
    });
});
document.getElementById("clear").addEventListener("click", () => {
    clearAll();
    activeSound.currentTime = 0;
    activeSound.play();
});
document.getElementById("equal").addEventListener("click", () => {
    calculate();
    activeSound.currentTime = 0;
    activeSound.play();
});
document.getElementById("dot").addEventListener("click", () => {
    inputDot();
    activeSound.currentTime = 0;
    activeSound.play();
});