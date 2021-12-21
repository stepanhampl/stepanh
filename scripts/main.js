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
const name = document.getElementsByClassName("name");
const welcomeText = document.getElementsByClassName("welcome-text");

const toCopy = document.getElementsByClassName("to-copy");
const btnCopy = document.getElementsByClassName("btn-copy");
const bottom = document.getElementById("bottom");


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

// hamburger.onclick() function() { expandMenu() }

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

//Is welcome Shown?
let welcomeShow
document.addEventListener("scroll", () => {
    let welcomeTop = welcome.getBoundingClientRect().top;
    if (welcomeTop > -500) {
        welcomeShow = true;
    } else {
        welcomeShow = false;
    }
})

// test whether navbar reached top by geting absolute top position of div above (welcome). 
if (window.innerHeight - navbar.getBoundingClientRect().bottom > 0) { //if bottom of navbar is more than 0
    bottom.style.display = "initial"
}

document.addEventListener("scroll", () => {
    let welcomeTop = welcome.getBoundingClientRect().top;
    let navbarTop = 500 + welcomeTop;
    let navbarBottom = window.innerHeight - navbar.getBoundingClientRect().bottom;
    if (welcomeTop > -500) { //welcome is shown
        navbar.style.top = navbarTop + "px";
        if (navbarBottom <= 0) {
            bottom.style.display = "";
        } else {
            bottom.style.display = "initial";
        }
    } else {
        navbar.style.top = 0;
    }
})



// controlling welcome animation by adding class .after to .welcome-leter after some amount of time
// let indexCount = 0;

// function showLetters(numLetters) {
//     if (indexCount < numLetters) {
//         welcomeLetter[indexCount].classList.add("after");
//         indexCount++;
//     }
//     else {
//         clearInterval(intervalLetters)
//     }
// };

// let intervalLetters = setInterval(function () { showLetters(7) }, 100);

// function to clear selection
function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
}

// copy text on click
btnCopy[0].onclick = function () { copy() };

function copy() {
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
function letterByLetter(element, addedClass) {
    let length = element.innerHTML.length;
    // let inner = element.innerHTML;
    let newInner = ""
    for (let numLetter = 0; numLetter < length; numLetter++) {
        let beforeEach = `<span class="${addedClass}">`;
        let letter = element.innerHTML.charAt(numLetter);
        let charCode = element.innerHTML.charCodeAt(numLetter);

        // loop intil tag ends
        let newTag = "";
        if (letter == "<") {
            // newTag += letter; //newTag = "<"
            // numLetter++; //numletteer incremented
            for (; letter != ">"; numLetter++) { //repeats until tag is whole
                letter = element.innerHTML.charAt(numLetter);
                newTag += letter; //
                console.log(newTag)
            };
            newInner += newTag;
        } else {
            if (charCode == 32) {
                newInner += `<span class="${addedClass}">&nbsp</span>`
            };
            let afterEach = `</span>`;
            newInner += beforeEach + letter + afterEach;
        };


    }
    element.innerHTML = newInner;
};

// letterByLetter(welcomeText[0], "js-added-welcome-text");

// this function executes provided function with all elements of provided class on specific timeout (gap between executions)
function executeClass(func, timeout, initialClass, arg2, arg3, arg4, arg5) {
    let i = 0;
    function loop() {
        let element = initialClass[i];
        if (arg2 != null && arg3 != null && arg4 != null && arg5 != null) {
            func(element, arg2, arg3, arg4, arg5);
        } else if (arg2 != null && arg3 != null && arg4 != null) {
            func(element, arg2, arg3, arg4);
        } else if (arg2 != null && arg3 != null) {
            func(element, arg2, arg3);
        } else if (arg2 != null) {
            console.log("loop is executed");
            func(element, arg2);
        } else {
            func(element);
        };
        i++;
        if (i <= document.getElementsByClassName(initialClass).length) {
            setTimeout(function () {
                loop();
            }, timeout)
        }
    };
    loop();
};

executeClass(letterByLetter, 1000, welcomeText, "js-added-welcome-text");

// adds class to all element with provided class with specific timeout
function addClassToClass(initialClass, addedClass, timeout) {
    let i = 0;
    function loop() {
        setTimeout(function () {
            let element = document.getElementsByClassName(initialClass)[i];
            element.classList.add(addedClass);
            i++;
            if (i < document.getElementsByClassName(initialClass).length) { // repet until there are some elements with this class left
                loop();
            }
        }, timeout)
    }
    loop();
};

addClassToClass("js-added-welcome-text", "js-added-00", 100);