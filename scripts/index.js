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


document.addEventListener('DOMContentLoaded', function () {
    // Page visit counter
    let visitCount = localStorage.getItem('visitCount');
    if (!visitCount) {
        visitCount = 0;
    }
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    document.getElementById('visitCount').textContent = visitCount;

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Set last modified date in footer
    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = 'Last modified: ' + lastModified;
});

function validateForm() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var email = document.getElementById("email").value;
    var emailPattern = /[a-zA-Z0-9._%+-]+@byui\.edu$/;

    if (password.length < 8 || !password.match(/^[a-zA-Z0-9]+$/)) {
        alert("Password must be at least eight characters long and can only contain alphanumeric characters.");
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
        document.getElementById("password").focus();
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
        document.getElementById("password").focus();
        return false;
    }

    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address from the byui.edu domain.");
        document.getElementById("email").value = "";
        document.getElementById("email").focus();
        return false;
    }

    return true;
}