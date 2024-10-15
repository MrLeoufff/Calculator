const display = document.getElementById("screen").querySelector("p");
const buttons = document.querySelectorAll("li");
const clearButton = document.getElementById("clear");
const blok = document.querySelector('.blok');
const endBlok = document.querySelector('.end-blok');
let inputString = "";
let resetOnNextInput = false;
let lastActionWasOperator = false;

function clearScreen() {
    inputString = "";
    display.innerText = "0";
    resetOnNextInput = false;
    lastActionWasOperator = false;
    // console.log("Screen vide");
}

clearButton.addEventListener("click", () => {
    clearScreen();
});


function handleInput(value) {
    const operators = ["+", "-", "x", "/", "%", "√"];
    const lastChar = inputString[inputString.length - 1];

    // console.log("handleInput - value:", value);
    // console.log("resetOnNextInput avant:", resetOnNextInput);

    if (inputString.length >= 30 && !operators.includes(value)) {
        // console.log("Maximum de 30 chiffres atteint");
        return;
    }

    if (resetOnNextInput && !operators.includes(value)) {
        inputString = "";
        resetOnNextInput = false;
        // console.log("Input reset");
    }

    if (operators.includes(value)) {
        lastActionWasOperator = true;
        // console.log("Operator type:", value);
        resetOnNextInput = false;
    } else {
        lastActionWasOperator = false;
    }

    if (operators.includes(value) && operators.includes(lastChar)) {
        // console.log("Consecutive operators detecté, saisie ignorée");
        return;
    }

    if (value === "x") {
        value = "*";
    }

    if (value === "%") {
        inputString = (parseFloat(inputString) / 100).toString();
    } else if (value === "√") {
        inputString = Math.sqrt(parseFloat(inputString)).toString();
        resetOnNextInput = true;
    } else {
        inputString += value;
    }

    updateDisplay(inputString);
    // display.innerText = formatNumberDisplay(inputString);
    // console.log("Updated inputString:", inputString);
}

function formatNumberDisplay(numberString) {
    if (numberString.length > 30) {
        return numberString.slice(0, 30);
    }
    return numberString.replace(/(.{15})/g, "$1\n");
}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        let buttonValue = button.innerText;
        if (buttonValue === "=") {
            calculateResult();
        } else {
            handleInput(buttonValue);
        }
    });
});

function calculateResult() {
    try {
        let result = eval(inputString);
        display.innerText = result;
        inputString = result.toString();
        resetOnNextInput = true;
        lastActionWasOperator = false;
        // console.log("Calcule ok, result:", result);
    } catch (error) {
        display.innerText = "Erreur";
        inputString = "";
        // console.log("Error :", error);
    }
}

function checkLineOverflow() {
    const screenElement = document.querySelector(".screen");

    if (screenElement.scrollHeight > screenElement.clientHeight) {
        screenElement.classList.add("multi-line");
    } else {
        screenElement.classList.remove("multi-line");
    }
}

function updateDisplay(content) {
    const screenElement = document.querySelector(".screen p");
    screenElement.innerText = formatNumberDisplay(content);
    checkLineOverflow();
}

// Gestion orientation de l'écran
function requestFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((error) => {
            // console.log("Erreur lors de la demande de plein écran:", error);
        });
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen().catch((error) => {
            // console.log("Erreur lors de la demande de plein écran (Firefox):", error);
        });
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen().catch((error) => {
            // console.log("Erreur lors de la demande de plein écran (Webkit):", error);
        });
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen().catch((error) => {
            // console.log("Erreur lors de la demande de plein écran (IE/Edge):", error);
        });
    }
}

function requestExitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen().catch((error) => {
            // console.log("Erreur lors de la sortie du plein écran:", error);
        });
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen().catch((error) => {
            // console.log("Erreur lors de la sortie du plein écran (Firefox):", error);
        });
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch((error) => {
            // console.log("Erreur lors de la sortie du plein écran (Webkit):", error);
        });
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen().catch((error) => {
            // console.log("Erreur lors de la sortie du plein écran (IE/Edge):", error);
        });
    }
}

document.getElementById('fullscreen-btn').addEventListener('click', function () {
    requestFullScreen();
});

document.getElementById("exitFullscreen-btn").addEventListener("click", function () {
    requestExitFullScreen();
})

blok.addEventListener('click', function () {
    if (endBlok.style.display === 'none' || endBlok.style.display === '') {
        endBlok.style.display = 'block';
    } else {
        endBlok.style.display = 'none';
    }
});

document.addEventListener('fullscreenchange', function () {
    if (document.fullscreenElement) {
        blok.style.display = 'none';
        endBlok.style.display = 'block';
    } else {
        blok.style.display = 'block';
        endBlok.style.display = 'none';
    }
});

window.addEventListener("orientationchange", function () {
    if (window.screen?.orientation?.lock) {
        if (window.screen.orientation.type.startsWith("landscape")) {
            try {
                window.screen.orientation.lock("portrait").catch(error => {
                    // console.log("Verrouillage échoué :", error);
                });
            } catch (error) {
                // console.log("Impossible de verrouiller l'orientation :", error);
            }
        }
    } else {
        // console.log("Le verrouillage de l'orientation n'est pas supporté par ce navigateur.");
    }
});

endBlok.style.display = 'none';

