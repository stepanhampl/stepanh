var navbarLinks = document.getElementsByClassName("navbar-links");
var hamburger = document.getElementsByClassName("hamburger");
var hamburgerToggle = false

var navbar = document.getElementsByClassName("navbar")


hamburger.onclick = function () {
    hamburgerToggle = !hamburgerToggle;
    if (hamburgerToggle === true) {
        navbarLinks.style.display = "flex";
    };
}

hamburger.onclick = function () {
    navbar.style.display = "none"
}
