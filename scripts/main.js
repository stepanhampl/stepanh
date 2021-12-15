const navbarLinks = document.getElementsByClassName("navbar-links")[0];
const hamburger = document.getElementsByClassName("hamburger")[0];
const nonNavbar = document.getElementById("non-navbar");


// BELOW: show/hide menu on click on .hamburger (which is active while screen is small (now: max-width=700px))
hamburger.addEventListener("click", () => {
    if (navbarLinks.style.display != "flex") {
        navbarLinks.style.display = "flex";
        nonNavbar.style.top = "7.5rem";
    } else {
        navbarLinks.style.display = "";
        nonNavbar.style.top = "0";
    }
});

// BELOW: hide potentially shown menu while screen is getting bigger than 700px
window.addEventListener("resize", function (event) {
    if (window.matchMedia("(min-width: 700px)").matches) {
        navbarLinks.style.display = "";
        nonNavbar.style.top = "0";
    }
});

//BELOW: on click on .navbar-logo, show up emoji (maybe random in future), which is in .animation-01 on random fixed place on page
