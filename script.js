// Html selectors //
const redLight =
    document.querySelector(".red-light");

const yellowLight =
    document.querySelector(".yellow-light");

const greenLight =
    document.querySelector(".green-light");

const redButton =
    document.querySelector("#red-button");

const yellowButton = 
    document.querySelector("#yellow-button");

const greenButton =
    document.querySelector("#green-button");

const buttons =
    [redButton,yellowButton, greenButton];

const lightChoiceMap = {
    red: redLight,
    yellow: yellowLight,
    green: greenLight
};

const choices = [redLight, yellowLight, greenLight];

let timer;
let timerStart;
let remainingTime;
let currentDuration;

let isPaused = false;
let currentLight = null;

// Functions for lighting up //

function selectRed() {
    currentLight = "red";
    clearTimeout(timer);
    currentDuration = 10000;

    yellowLight.classList.remove("on");
    greenLight.classList.remove("on");

    redLight.classList.add("on");

    timerStart = Date.now();

    timer = setTimeout(() => {
        selectGreen();
    }, 10000);
};

function selectYellow() {
    currentLight = "yellow";
    clearTimeout(timer);
    currentDuration = 2000

    redLight.classList.remove("on");
    greenLight.classList.remove("on");

    yellowLight.classList.add("on");

    timerStart = Date.now();

    timer = setTimeout(() => {
        selectRed();
    }, 2000);
};

function selectGreen() {
    currentLight = "green";
    clearTimeout(timer);
    currentDuration = 10000;

    yellowLight.classList.remove("on");
    redLight.classList.remove("on");

    greenLight.classList.add("on");

    timerStart = Date.now();

    timer = setTimeout(() => {
        selectYellow();
    }, 10000);
};

function pauseTimer() {

    let elapsedTime = Date.now() - timerStart;

    remainingTime = currentDuration - elapsedTime;
    clearTimeout(timer);

    if (currentLight === "red") {
        redButton.classList.add("paused");
    }
    else if (currentLight === "yellow") {
        yellowButton.classList.add("paused");
    }
    else {
        greenButton.classList.add("paused");
    }

    isPaused = true;
}

function resumeTimer() {
    currentDuration = remainingTime;

    timerStart = Date.now();
    
    if (currentLight === "red") {
        timer = setTimeout(() => { 
            selectGreen();
        }, remainingTime);

        redButton.classList.remove("paused");
    }
    else if (currentLight === "green") {
        timer = setTimeout(() => {
            selectYellow();
        },remainingTime);

        greenButton.classList.remove("paused");
    }
    else {
        timer = setTimeout(() => {
            selectRed();
        },remainingTime);

        yellowButton.classList.remove("paused");
    }
    
    
    isPaused = false;
}
// Event listener //

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const clickedButton = event.target.id;
        let clickedLight;

        if (clickedButton === "red-button") {
            clickedLight = "red";
        }
       
        else if (clickedButton === "yellow-button") {
            clickedLight = "yellow";
        }
        
        else {
            clickedLight = "green";
        }

        if (currentLight === clickedLight) {
            if (isPaused) {
                resumeTimer();
            }
            else {
                pauseTimer();
            }
        }
        else {
            isPaused = false;

            if (clickedLight === "red") {

                selectRed();

                greenButton.classList.remove("paused");
                yellowButton.classList.remove("paused");               
            }

            else if (clickedLight === "yellow") {

                selectYellow();

                greenButton.classList.remove("paused");
                redButton.classList.remove("paused");
            }

            else {
                selectGreen();

                redButton.classList.remove("paused");
                yellowButton.classList.remove("paused");
                
            }

        };
    });
});