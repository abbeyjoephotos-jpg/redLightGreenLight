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
    document.querySelector("#green-button")

const lightChoiceMap = {
    red: redLight,
    yellow: yellowLight,
    green: greenLight
};

const choices = [redLight, yellowLight, greenLight];

let timer;
// Functions for lighting up //

function selectRed() {
    clearTimeout(timer);

    yellowLight.classList.remove("on");
    greenLight.classList.remove("on");

    redLight.classList.add("on");

    timer = setTimeout(() => {
        selectGreen();
    }, 10000);
};

function selectYellow() {
    clearTimeout(timer);

    redLight.classList.remove("on");
    greenLight.classList.remove("on");

    yellowLight.classList.add("on");

    timer = setTimeout(() => {
        selectRed();
    }, 2000);
};

function selectGreen() {
    clearTimeout(timer);

    yellowLight.classList.remove("on");
    redLight.classList.remove("on");

    greenLight.classList.add("on");

    timer = setTimeout(() => {
        selectYellow();
    }, 10000);
};

// Event listener //
redButton.addEventListener("click", function() {
    selectRed();
});

yellowButton.addEventListener("click", function() {
    selectYellow();
});
greenButton.addEventListener("click", function() {
    selectGreen();
});


timer = setTimeout(() => {
    console.log("Times up!");
}, 3000);
clearTimeout(timer);
console.log("timer cancelled")
