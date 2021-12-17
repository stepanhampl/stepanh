const navbarLinks = document.getElementsByClassName("navbar-links")[0];
const hamburger = document.getElementsByClassName("hamburger")[0];
const nonNavbar = document.getElementById("non-navbar");
const animation01 = document.getElementsByClassName("animation-01")[0];
const navbarLogo = document.getElementsByClassName("navbar-logo")[0];
const navbar = document.getElementsByClassName("navbar")[0];
const welcome = document.getElementsByClassName("welcome")[0];

// this gives me const, that doesnt say, which element exactly it is, because [0] is missing
const navbarButtonExpand = document.getElementsByClassName("navbar-button-expand");
const welcomeLetter = document.getElementsByClassName("welcome-letter");
const text = document.getElementsByClassName("text");

const toCopy = document.getElementsByClassName("to-copy");
const btnCopy = document.getElementsByClassName("btn-copy");


// show/hide menu on click on .hamburger (which is active while screen is small (now: max-width=700px))
hamburger.addEventListener("click", () => {
    if (navbarLinks.style.display != "flex") {
        navbarLinks.style.display = "flex";
        nonNavbar.style.top = "7.5rem";
    } else {
        navbarLinks.style.display = "";
        nonNavbar.style.top = "0";
    }
});

// hide potentially shown menu while screen is getting bigger than 700px
window.addEventListener("resize", function (event) {
    if (window.matchMedia("(min-width: 700px)").matches) {
        navbarLinks.style.display = "";
        nonNavbar.style.top = "0";
    }
});

// on click on .navbar-logo, shows up rendom emoji, which is in .animation-01 on random fixed place on page
navbarLogo.addEventListener("click", () => {
    let randLeft = Math.floor(Math.random() * 101);
    let randTop = Math.floor(Math.random() * 101);

    let emojiNum = Math.floor(Math.random() * (129510 - 129296 + 1) + 129296);
    animation01.innerHTML = `&#${emojiNum};`;
    animation01.style.left = randLeft + "%";
    animation01.style.top = randTop + "%";
    animation01.style.display = "initial";
    let delayDisappear = 200;
    animation01.style.animation = `disappear  ${delayDisappear}ms`;
    setTimeout(function () {
        animation01.style.display = "none";
    }, delayDisappear)
})

// test whether navbar reached top by geting absolute top position of div above (welcome). 
// Also including test for navbar-button-expand, since it is not realative to navbar
document.addEventListener("scroll", () => {
    let welcomeTop = welcome.getBoundingClientRect().top;
    if (welcomeTop <= -500) {
        nonNavbar.classList.add("below-sticky-non-navbar");
        navbar.classList.add("sticky-navbar");
        // loop, until class is added to all three navbar-button-expand
        for (let index = 0; index < 3; index++) {
            navbarButtonExpand[index].classList.add("sticky-navbar-button-expand");
        };
    } else if (welcomeTop > -500) {
        nonNavbar.classList.remove("below-sticky-non-navbar");
        navbar.classList.remove("sticky-navbar");

        // loop, until class is removed from all three navbar-button-expand
        for (let index = 0; index < 3; index++) {
            navbarButtonExpand[index].classList.remove("sticky-navbar-button-expand");
        };
    }
});

// controlling welcome animation by adding class .after to .welcome-leter after some amount of time
let indexCount = 0;

function showLetters(numLetters) {
    if (indexCount < numLetters) {
        welcomeLetter[indexCount].classList.add("after");
        indexCount++;
    }
    else {
        clearInterval(intervalLetters)
    }
};

let intervalLetters = setInterval(function () { showLetters(7) }, 100);

// function to clear selection
function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
}

// copy text on click
btnCopy[0].onclick = function () { copy() };

function copy() {
    console.log("btn was clicked");
    toCopy[0].select();
    selected = window.getSelection().toString();
    navigator.clipboard.writeText(selected);
    setTimeout(function () {
        window.getSelection().removeAllRanges();
        document.getSelection.empty()
    }, 100)
};


// creating animations with each letter separately (eg. on hover)

const letters = document.getElementsByClassName("letters")[0];

// separates inner text of HTML element into span per letter
// currently unused
function letterByLetter(element) {
    let length = element.innerHTML.length;
    // let inner = element.innerHTML;
    let newInner = ""
    for (let numLetter = 0; numLetter < length; numLetter++) {
        let beforeEach = `<span class="js-added-letter">`;
        let letter = element.innerHTML.charAt(numLetter);
        let afterEach = `</span>`;
        newInner += beforeEach + letter + afterEach;
    }
    element.innerHTML = newInner;
};
