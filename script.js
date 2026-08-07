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

const daytimeChoices = ["day", "night"];

const choices = [redLight, yellowLight, greenLight];

const daySwitch = 
    document.querySelector("#day-switch");

const dayNightImage = 
    document.querySelector(".day-night-img");

const trafficLightBg =
    document.querySelector(".traffic-light-container");

const streetlight = 
    document.querySelector(".streetlight-glow");

const streetlightSpill =
    document.querySelector(".streetlight-spill");

const sunImage = 
    document.querySelector(".sun-image");

const moonImage = 
    document.querySelector(".moon-image");



// Timer display //

const digitsMap = {
    0: ["top", "upper-left","upper-right", "bottom-left", "bottom-right", "bottom"],
    1: ["upper-right","bottom-right"],
    2: ["top", "upper-right", "middle", "bottom-left", "bottom"],
    3: ["top", "upper-right", "middle", "bottom-right", "bottom"],
    4: ["upper-left", "upper-right", "middle", "bottom-right"],
    5: ["top", "upper-left", "middle", "bottom-right", "bottom"],
    6: ["top", "upper-left", "middle", "bottom-left", "bottom-right", "bottom"],
    7: ["top", "upper-right", "bottom-right"],
    8: ["top", "upper-left", "upper-right", "middle", "bottom-left", "bottom-right", "bottom"],
    9: ["top", "upper-left", "upper-right", "middle", "bottom-right", "bottom"]
};

const tens = document.querySelector("#tens");
const ones = document.querySelector("#ones");
const milliseconds = document.querySelector("#milliseconds");

// Variables //
let timer;
let timeInterval;

let timerStart;
let remainingTime;
let currentDuration;

let isPaused = false;
let currentLight = null;

let isDay = true;
// Functions for lighting up  and timer //

function displayDigit(display, digit) {
    const segments = display.querySelectorAll(".segment");
    const activeSegments = digitsMap[digit];

    segments.forEach((segment) => {
        const position = segment.classList[1];

        if (activeSegments.includes(position)) {
            segment.classList.add("on");
        } else {
            segment.classList.remove("on");
        }
    });
};

function pauseTimer() {
    clearTimeout(timer);
    clearInterval(timeInterval);

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
};

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

    startCountdown();
    
    isPaused = false;
};

function startCountdown() {
    clearInterval(timeInterval);

    timeInterval = setInterval(() => {   
        let elapsedTime = Date.now() - timerStart;
        remainingTime = currentDuration - elapsedTime;

        let millisecondsDigit = Math.floor(remainingTime / 100) % 10;
        displayDigit(milliseconds, millisecondsDigit);

        let seconds = Math.floor(remainingTime / 1000);

        let onesDigit = seconds % 10;
        displayDigit(ones, onesDigit);
        
        let tensDigit = Math.floor(seconds / 10);
        displayDigit(tens, tensDigit);
    }, 100);
}


function selectRed() {
    currentLight = "red";
    clearTimeout(timer);

    currentDuration = 10000;

    yellowLight.classList.remove("on");
    greenLight.classList.remove("on");

    redLight.classList.add("on");

    timerStart = Date.now();

    startCountdown();

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

    startCountdown();

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

    startCountdown();

    timer = setTimeout(() => {
        selectYellow();
    }, 10000);
};

// Functions for sun/moon animations //

function handleSunAnimationEnd(event) {
    if (event.animationName === "sun-exit") {
        moonImage.classList.remove("moon-exit");
        moonImage.classList.add("moon-enter");
    };
    if(event.animationName === "sun-enter") {
        sunImage.classList.remove("sun-enter");
        sunImage.classList.add("sun-shine");
    }
}

function handleMoonAnimationEnd(event) {
    if (event.animationName === "moon-exit") {
        sunImage.classList.remove("sun-exit");
        sunImage.classList.add("sun-enter");
    };
    if (event.animationName ==="moon-enter") {
        moonImage.classList.remove("moon-enter");
        moonImage.classList.add("moon-shine");
    }
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


daySwitch.addEventListener("click", () => {
    if (isDay) {
        isDay = false;
    
        dayNightImage.src = "stoplightImage/sun.png";
        dayNightImage.alt = "Switch to Night Mode";
        
        
        streetlight.classList.add("night");
        streetlightSpill.classList.add("night");

        trafficLightBg.classList.remove("sky-transition-day");
        trafficLightBg.classList.add("sky-transition-night");
        sunImage.classList.remove("sun-shine");
        sunImage.classList.add("sun-exit");
        
    }

    else {
        isDay = true

        dayNightImage.src = "stoplightImage/moon.png";
        dayNightImage.alt = "Switch to Day Mode";
       
        
        streetlight.classList.remove("night");
        streetlightSpill.classList.remove("night");

        trafficLightBg.classList.remove("sky-transition-night");
        trafficLightBg.classList.add("sky-transition-day");
        moonImage.classList.remove("moon-enter");
        moonImage.classList.remove("moon-shine");
        moonImage.classList.add("moon-exit");
    }

  
});

sunImage.addEventListener("animationend", handleSunAnimationEnd);

moonImage.addEventListener("animationend", handleMoonAnimationEnd);