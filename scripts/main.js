const navbarLinks = document.getElementsByClassName("navbar-links")[0];
const hamburger = document.getElementsByClassName("hamburger")[0];
const nonNavbar = document.getElementById("non-navbar");
const animation01 = document.getElementsByClassName("animation-01")[0];
const navbarLogo = document.getElementsByClassName("navbar-logo")[0];


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

// on click on .navbar-logo, show up emoji (maybe random in future), which is in .animation-01 on random fixed place on page
navbarLogo.addEventListener("click", () => {
    let randLeft = Math.floor(Math.random() * 101);
    let randTop = Math.floor(Math.random() * 101);

    // loop ensuring, that real entity code has been displayed
    // while (animation01.offsetHeight == "auto") {}
    // come up with random number. 127344 ~ minimal HTML entity, 129510 ~ maximal HTML entity.
    do {
        let emojiNum = Math.floor(Math.random() * (129510 - 127344 + 1) + 127344);
        animation01.innerHTML = `&#${emojiNum};`;
        animation01.style.display = "initial";
        animation01.style.left = randLeft + "%";
        animation01.style.top = randTop + "%";
    } while (animation01.offsetHeight > 0);

    // make the emoji disappear
    let delay = 200;
    animation01.style.animation = `disappear  ${delay}ms`;
    setTimeout(function () {
        animation01.style.display = "none"
    }, delay);
})