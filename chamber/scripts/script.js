// transition effect for discover page
// credit to Beyond Fireship
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        }
    })
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// JavaScript for displaying visit messages
document.addEventListener('DOMContentLoaded', function() {
    let lastVisit = localStorage.getItem('lastVisit');
    let currentDate = Date.now();
    let oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    if (!lastVisit) {
        document.getElementById('visits').innerText = "Welcome! Let us know if you have any questions.";
    } else {
        lastVisit = parseInt(lastVisit);
        let daysPassed = Math.round(Math.abs((currentDate - lastVisit) / oneDay));
        
        if (daysPassed < 1) {
            document.getElementById('visits').innerText = "Back so soon! Awesome!";
        } else {
            let message = "You last visited " + daysPassed + " day";
            if (daysPassed > 1) {
                message += "s";
            }
            message += " ago.";
            document.getElementById('visits').innerText = message;
        }
    }

    localStorage.setItem('lastVisit', currentDate);
});



document.getElementById('lastModified').textContent = document.lastModified;