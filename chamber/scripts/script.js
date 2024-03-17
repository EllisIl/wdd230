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

const weatherLink = "https://api.openweathermap.org/data/2.5/weather?lon=77.31&appid=ae15d82d0f9a8a3a6ddde1bf9172ddc0&lat=38.55&units=imperial"

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');

async function apiFetch(link) {
    try {
        const response = await fetch(link);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

/* Weather on Home Page */
async function displayWeather() {
    const data = await apiFetch(weatherLink);
    currentTemp.innerHTML= `${data.main.temp}&deg;F`
    let desc = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${desc}.png`
    weatherIcon.setAttribute('src', iconsrc)
    weatherIcon.setAttribute('alt', desc)
}
displayWeather();


/* Directory Page */
const memberLink = "data/members.json"
const cards = document.querySelector('#cards')
async function displayMembers() {
    const data = await apiFetch(memberLink);
    const members = data.members
    console.log(members)

    members.forEach((member) => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let image = document.createElement('img');
        let address = document.createElement('h3');
        let phone = document.createElement('h3');

        let hours = document.createElement('h3');

        name.textContent = member.name;

        address.textContent = member.address;
        phone.textContent = member.phone;
        member.hours.forEach((times) => {
            hours.textContent += times;
        })
        hours.textContent = member.hours;

        image.setAttribute('src', member.image);
        image.setAttribute('alt', member.name);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(image);
        card.appendChild(hours);

        cards.appendChild(card);
    })
}
displayMembers();
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}


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
            document.getElementById('visits').innerText = "Back so soon? Awesome!";
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