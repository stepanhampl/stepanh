const navbarLinks = document.getElementsByClassName("navbar-links")[0]
const hamburger = document.getElementsByClassName("hamburger")[0]



hamburger.addEventListener("click", () => {
    if (navbarLinks.style.display != "flex") {
        navbarLinks.style.display = "flex";
    } else {
        navbarLinks.style.display = "";
    }
})

// hamburger.addEventListener("click", () => {
//     navbarLinks.classList.toggle("visible")
// })