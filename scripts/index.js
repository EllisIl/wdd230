/* Year */
var currentYear = new Date().getFullYear();
document.getElementById("year").textContent = `${currentYear}\u00A9 | Elijah Foard | USA`;

var lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

/* Menu */
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

/* Dark Mode */
const modeButton = document.querySelector(".switch input");
const body = document.body;

function toggleColor() {
    body.classList.toggle("dark-mode");
}

modeButton.addEventListener("click", toggleColor);
