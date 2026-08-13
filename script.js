// Html selectors //
const redLight =
    document.querySelector(".red-light");

const redLightLens =
    document.querySelector(".red-light-lens");

const yellowLight =
    document.querySelector(".yellow-light");

const yellowLightLens =
    document.querySelector(".yellow-light-lens");

const greenLight =
    document.querySelector(".green-light");

const greenLightLens =
    document.querySelector(".green-light-lens");

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

const daySwitch = 
    document.querySelector("#day-switch");

const dayNightImage = 
    document.querySelector(".day-night-img");

const trafficLightBg =
    document.querySelector(".traffic-light-container");

const trafficLightImage =
    document.querySelector(".traffic-light-image");

const streetlight = 
    document.querySelector(".streetlight-glow");

const streetlightSpill =
    document.querySelector(".streetlight-spill");

const sunImage = 
    document.querySelector(".sun-image");

const moonImage = 
    document.querySelector(".moon-image");

const streetLightSound = new Audio("audio/streetLightSound.mp3");

const morningSound = new Audio("audio/morningBirds.mp3");

const timeLimits = 
    document.querySelector("#time-limits");

const locationsDialog =
    document.querySelector("#locations-dialog");

const locationsContinue = 
    document.querySelector("#locations-continue");

const locationsDecline =
    document.querySelector("#locations-decline");

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

let redTime = 5000;
let greenTime = 5000;
let yellowTime = 1000;

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
        redLightFlash();
    }
    else if (currentLight === "yellow") {
        yellowButton.classList.add("paused");
        yellowLightFlash();
    }
    else {
        greenButton.classList.add("paused");
        greenLightFlash();
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

        removeYellowLightFlash();
        removeRedLightFlash();
        removeGreenLightFlash();
    }
    else if (currentLight === "green") {
        timer = setTimeout(() => {
            selectYellow();
        },remainingTime);

        greenButton.classList.remove("paused");

        removeRedLightFlash();
        removeYellowLightFlash();
        removeGreenLightFlash();
    }
    else {
        timer = setTimeout(() => {
            selectRed();
        },remainingTime);

        yellowButton.classList.remove("paused");

        removeYellowLightFlash();
        removeRedLightFlash();
        removeGreenLightFlash();
    }

    startCountdown();
    
    isPaused = false;
};

function startCountdown() {
    clearInterval(timeInterval);

    timeInterval = setInterval(() => {   
        let elapsedTime = Date.now() - timerStart;
        remainingTime = Math.max(0,currentDuration - elapsedTime);

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

    currentDuration = redTime;

    yellowLight.classList.remove("on");
    greenLight.classList.remove("on");

    redLight.classList.add("on");

    timerStart = Date.now();

    removeYellowLightFlash();
    removeGreenLightFlash();
    removeRedLightFlash();
    startCountdown();

    timer = setTimeout(() => {
        selectGreen();
    }, redTime);
};


function selectYellow() {
    currentLight = "yellow";
    clearTimeout(timer);

    currentDuration = yellowTime;

    redLight.classList.remove("on");
    greenLight.classList.remove("on");

    yellowLight.classList.add("on");

    timerStart = Date.now();

    removeRedLightFlash();
    removeGreenLightFlash();
    removeYellowLightFlash();

    startCountdown();

    timer = setTimeout(() => {
        selectRed();
    }, yellowTime);
};

function selectGreen() {
    currentLight = "green";
    clearTimeout(timer);

    currentDuration = greenTime;

    yellowLight.classList.remove("on");
    redLight.classList.remove("on");

    greenLight.classList.add("on");

    timerStart = Date.now();

    removeRedLightFlash();
    removeYellowLightFlash();
    removeGreenLightFlash();

    startCountdown();

    timer = setTimeout(() => {
        selectYellow();
    }, greenTime);
};

function greenLightFlash() {
    redLight.classList.add("green-flash");
    yellowLight.classList.add("green-flash");
    greenLight.classList.add("green-flash");

    redLightLens.src = "stoplightImage/greenLightLens.png";
    yellowLightLens.src = "stoplightImage/greenLightLens.png";
}

function removeGreenLightFlash() {
    redLight.classList.remove("green-flash");
    yellowLight.classList.remove("green-flash");
    greenLight.classList.remove("green-flash");

    redLightLens.src = "stoplightImage/redLightLens.png";
    yellowLightLens.src = "stoplightImage/yellowLightLens.png";
}

function redLightFlash() {
    redLight.classList.add("red-flash");
    yellowLight.classList.add("red-flash");
    greenLight.classList.add("red-flash");

    yellowLightLens.src = "stoplightImage/redLightLens.png";
    greenLightLens.src = "stoplightImage/redLightLens.png";
}

function removeRedLightFlash() {
    redLight.classList.remove("red-flash");
    yellowLight.classList.remove("red-flash");
    greenLight.classList.remove("red-flash");

    yellowLightLens.src = "stoplightImage/yellowLightLens.png";
    greenLightLens.src = "stoplightImage/greenLightLens.png";
}
function yellowLightFlash() {
    redLight.classList.add("yellow-flash");
    yellowLight.classList.add("yellow-flash");
    greenLight.classList.add("yellow-flash");

    redLightLens.src = "stoplightImage/yellowLightLens.png";
    greenLightLens.src = "stoplightImage/yellowLightLens.png";
}

function removeYellowLightFlash() {
    redLight.classList.remove("yellow-flash");
    yellowLight.classList.remove("yellow-flash");
    greenLight.classList.remove("yellow-flash");

    redLightLens.src = "stoplightImage/redLightLens.png";
    greenLightLens.src = "stoplightImage/greenLightLens.png";
}

function resizeTimeLimit() {
    const selectedText =
        timeLimits.options[timeLimits.selectedIndex].text;
    
    const measuringSpan =
        document.createElement("span");

        measuringSpan.textContent = selectedText;
    
    const selectStyles = window.getComputedStyle(timeLimits); 

        measuringSpan.style.font = selectStyles.font;

        measuringSpan.style.position = "absolute";
        measuringSpan.style.visibility = "hidden";
        measuringSpan.style.whiteSpace = "nowrap";
        document.body.appendChild(measuringSpan);

    const textWidth =
        measuringSpan.offsetWidth;

        timeLimits.style.width = `${textWidth + 30}px`;

        measuringSpan.remove();
}
// Functions for sun/moon animations //


function setDayState() {
    isDay = true;

    moonImage.src = "stoplightImage/moon.png";
    sunImage.src = "stoplightImage/sun.png";

    dayNightImage.src = "stoplightImage/moon.png";
    dayNightImage.alt = "Set to Night Mode";

    trafficLightBg.classList.add("sky-transition-day");
    trafficLightBg.classList.remove("sky-transition-night");
    
    streetlight.classList.remove("night");
    streetlightSpill.classList.remove("night");

    moonImage.classList.remove("in");
    moonImage.classList.add("out");

    sunImage.classList.remove("out");
    sunImage.classList.add("in");

    streetLightSound.pause();
    streetLightSound.currentTime = 0;
    morningSound.play();

}

function setNightState() {
    isDay = false;

    moonImage.src = "stoplightImage/moon.png";
    sunImage.src = "stoplightImage/sun.png";

    dayNightImage.src = "stoplightImage/sun.png";
    dayNightImage.alt = "Set to Day Mode";

    trafficLightBg.classList.remove("sky-transition-day");
    trafficLightBg.classList.add("sky-transition-night");

    streetlight.classList.add("night");
    streetlightSpill.classList.add("night");

    sunImage.classList.remove("in");
    sunImage.classList.add("out");

    moonImage.classList.remove("out");
    moonImage.classList.add("in");
    startNightSoud();
}

function startNightSound() {
    streetLightSound.play();
}

function restartNightFlicker() {

    streetlightSpill.classList.remove("night");
    void streetlightSpill.offsetWidth;

    streetlightSpill.classList.add("night");
}

// Geolocation API for Day/Night at Startup //

function requestLocation() {
    navigator.geolocation.getCurrentPosition((position) => {

    resizeTimeLimit();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiURL =  `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;

    fetch(apiURL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const sunrise = data.results.sunrise;
            const sunset = data.results.sunset;

        

    const sunriseTime = new Date(sunrise);
    const sunsetTime = new Date(sunset);
    const now = new Date();

        if (now > sunriseTime && now < sunsetTime) {
            isDay = true;
            setDayState();
        }
        else {
            isDay = false;
            setNightState();
            
            // startNightSound();
        }
    });
    selectRed();
});

}
// Startup Modal //
resizeTimeLimit();
locationsDialog.showModal();

locationsContinue.addEventListener("click", () => {

    locationsDialog.close();
    requestLocation();

   
    resizeTimeLimit();

});

locationsDecline.addEventListener("click", () => {

    locationsDialog.close();
    setDayState();

    resizeTimeLimit();
});
// Event listener //



buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const clickedButton = event.currentTarget.id;
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
daySwitch.addEventListener("mousedown", () => {
    daySwitch.classList.add("pressed")
});


daySwitch.addEventListener("mouseup", () => {
    if (isDay) {
        isDay = true;
        
        setNightState();  
          
        }
    
    
    else {

        setDayState();
        }
});

streetLightSound.addEventListener("ended", () => {
    if (isDay === false) {
        restartNightFlicker();
        startNightSound();
    }
});

timeLimits.addEventListener("change", () => {
    if (timeLimits.value === "short") {
        redTime = 5000;
        yellowTime = 1000;
        greenTime = 5000
    }
    else if (timeLimits.value === "medium") {
        redTime = 10000;
        yellowTime = 2000;
        greenTime = 10000;
    }
    else if (timeLimits.value === "long") {
        redTime = 15000;
        yellowTime = 3000;
        greenTime = 15000;
    }

    resizeTimeLimit();
});