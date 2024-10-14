let display = document.getElementById("screen").querySelector("p");
let buttons = document.querySelectorAll("li");
let clearButton = document.getElementById("clear");
let inputString = "";

clearButton.addEventListener("click", () => {
    clearScreen();
});

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

function handleInput(value) {
    const operators = ["+", "-", "x", "/", "%", "v"];

    const lastChar = inputString[inputString.length - 1];
    if (operators.includes(value) && operators.includes(lastChar)) {
        return;
    }

    if (value === "x") {
        value = "*";
    }

    if (value === "%") {
        inputString = (parseFloat(inputString) / 100).toString();
        display.innerText = inputString;
    } else if (value === "v") {
        inputString = Math.sqrt(parseFloat(inputString)).toString();
        display.innerText = inputString;
    } else {
        inputString += value;
        display.innerText = inputString;
    }
}

function calculateResult() {
    try {
        let result = eval(inputString);
        display.innerText = result;
        inputString = result.toString();
    } catch (error) {
        display.innerText = "Erreur";
        inputString = "";
    }
}

function clearScreen() {
    inputString = "";
    display.innerText = "";
}

// Gestion orientation de l'écran
function requestFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((error) => {
            console.log("Erreur lors de la demande de plein écran:", error);
        });
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen().catch((error) => {
            console.log("Erreur lors de la demande de plein écran (Firefox):", error);
        });
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen().catch((error) => {
            console.log("Erreur lors de la demande de plein écran (Webkit):", error);
        });
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen().catch((error) => {
            console.log("Erreur lors de la demande de plein écran (IE/Edge):", error);
        });
    }
}

function requestExitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen().catch((error) => {
            console.log("Erreur lors de la sortie du plein écran:", error);
        });
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen().catch((error) => {
            console.log("Erreur lors de la sortie du plein écran (Firefox):", error);
        });
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch((error) => {
            console.log("Erreur lors de la sortie du plein écran (Webkit):", error);
        });
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen().catch((error) => {
            console.log("Erreur lors de la sortie du plein écran (IE/Edge):", error);
        });
    }
}

document.getElementById('fullscreen-btn').addEventListener('click', function () {
    requestFullScreen();
});

document.getElementById("exitFullscreen-btn").addEventListener("click", function () {
    requestExitFullScreen();
})

const blok = document.querySelector('.blok');
const endBlok = document.querySelector('.end-blok');

blok.addEventListener('click', function () {
    if (endBlok.style.display === 'none' || endBlok.style.display === '') {
        endBlok.style.display = 'block';
    } else {
        endBlok.style.display = 'none';
    }
});

window.addEventListener("orientationchange", function () {
    if (window.screen?.orientation?.lock) {
        if (window.screen.orientation.type.startsWith("landscape")) {
            try {
                window.screen.orientation.lock("portrait").catch(error => {
                    console.log("Verrouillage échoué :", error);
                });
            } catch (error) {
                console.log("Impossible de verrouiller l'orientation :", error);
            }
        }
    } else {
        console.log("Le verrouillage de l'orientation n'est pas supporté par ce navigateur.");
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

endBlok.style.display = 'none';


// window.addEventListener("orientationchange", function () {
//     if (window.screen.orientation.type.startsWith("landscape")) {
//         try {
//             window.screen.orientation.lock("portrait");
//         } catch (error) {
//             console.log("Impossible de verrouiller l'orientation :", error);
//         }
//     }
// });
