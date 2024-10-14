let screen = document.getElementById("screen").querySelector("p");
let buttons = document.querySelectorAll("li");
let clearButton = document.getElementById("clear");
let inputString = "";

clearButton.addEventListener("click", () => {
    clearScreen();
})

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let buttonValue = button.innerText;

        if (buttonValue === "=") {
            calculateResult();
        } else if (buttonValue === "Clear") {
            clearScreen();
        } else {
            handleInput(buttonValue);
        }
    });
});

function handleInput(value) {
    const operators = ["+", "-", "x", "/", "%", "v"];

    const lastChart = inputString[inputString.length - 1];
    if (operators.includes(value) && operators.includes(lastChart)) {
        return;
    }

    if (value === "x") {
        value = "*";
    }

    if (value === "%") {
        inputString = (parseFloat(inputString) / 100).toString();
        screen.innerText = inputString;
    } else if (value === "v") {
        inputString = Math.sqrt(parseFloat(inputString)).toString();
        screen.innerText = inputString;
    } else {
        inputString += value;
        screen.innerText = inputString;
    }
}

function calculateResult() {
    try {
        let result = eval(inputString);
        screen.innerText = result;
        inputString = result.toString();
    } catch (error) {
        screen.innerText = "Erreur";
        inputString = "";
    }
}

function clearScreen() {
    inputString = "";
    screen.innerText = "";
}

window.addEventListener("orientationchange", function () {
    if (screen.orientation.type.startsWith("landscape")) {
        try {
            screen.orientation.lock("portrait");
        } catch (error) {
            console.log("Impossible de verrouiller l'orientation :", error);
        }
    }
});