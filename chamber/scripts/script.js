// transition effect for discover page
// credit to Beyond Fireship
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

/* Basic "API data -> json" function */
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

function getDayFromNum(num) {
  let parsedNum = num % 7;

  switch (parsedNum) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

/* Banner on Home Page */
document.addEventListener("DOMContentLoaded", function() {
  const banner = document.getElementById("meet-and-greet-banner");
  const closeButton = document.getElementById("close-banner-btn");

  if (banner) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    
    if (currentDay >= 0 && currentDay < 4) {
      banner.style.display = "block";
      console.log("valid");
      console.log(currentDay);
    }
  
    closeButton.addEventListener("click", function() {
      banner.style.display = "none";
    });
  }
});

/* Weather on Home Page */
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherLink = "https://api.openweathermap.org/data/2.5/weather?lon=77.31&appid=ae15d82d0f9a8a3a6ddde1bf9172ddc0&lat=38.55&units=imperial";
const forecastLink = "https://api.openweathermap.org/data/2.5/forecast?lon=77.31&appid=ae15d82d0f9a8a3a6ddde1bf9172ddc0&lat=38.55&units=imperial";
async function displayWeather() {
  const data = await apiFetch(weatherLink);
  currentTemp.innerHTML = `${data.main.temp}&deg;F and the weather is ${data.weather[0].description}`;
  let desc = data.weather[0].icon;
  const iconsrc = `https://openweathermap.org/img/wn/${desc}.png`;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", desc);
}
if (currentTemp) {
  displayWeather();
}
/* Forecast on Home Page */
const forecasts = document.querySelector("#forecast");
async function displayForecast() {
  const data = await apiFetch(forecastLink);
  const days = data.list;

  var today = new Date();
  var date = today.getDay();

  for (let i = 1; i <= 3; i++) {
    let forecase = days[i];

    let temp = forecase.main.temp + `°F`;
    let cond = forecase.weather[0].description;
    let icon = forecase.weather[0].icon;
    let iconsrc = `https://openweathermap.org/img/wn/${icon}.png`;

    let forecard = document.createElement("div");
    let dayName = document.createElement("h1");
    let tempEl = document.createElement("h2");
    let iconEl = document.createElement("img");
    let condEl = document.createElement("h3");

    let dayOfWeek = getDayFromNum(date + i);

    tempEl.textContent = temp;
    condEl.textContent = cond;
    dayName.textContent = dayOfWeek;

    iconEl.setAttribute("src", iconsrc);
    iconEl.setAttribute("alt", cond);
    iconEl.setAttribute("loading", "lazy");

    forecard.setAttribute("id", "day");

    forecard.appendChild(dayName);
    forecard.appendChild(tempEl);
    forecard.appendChild(iconEl);
    forecard.appendChild(condEl);

    forecasts.appendChild(forecard);
  }
}
if (forecasts) {
    displayForecast();
}

/* Spotlight on Home Page */
function findValidMembers(members) {
  return members.filter(member => {
    return member.level == 'Gold' || member.level == 'Silver';
  });
}
function selectMembers(members) {
  const randSels = [];

  while (randSels.length < 3) {
    const randIndex = Math.floor(Math.random() * members.length);
    if (!randSels.includes(randIndex)) {
      randSels.push(randIndex);
    }
  }
  const randomMembers = randSels.map(index => members[index]);
  return randomMembers;
}
function displayMember(member, parent) {
  let card = document.createElement("section");
  let name = document.createElement('p');
  let image = document.createElement("img");

  name.textContent = member.name;
  image.setAttribute("src", member.image);
  image.setAttribute("alt", member.name);
  image.setAttribute("loading", "lazy");
  image.setAttribute("width", "100px");
  image.setAttribute("height", "100px");

  card.appendChild(name);
  card.appendChild(image);

  parent.appendChild(card);
}
const memberLink = "data/members.json";
const sldiv = document.querySelector('#spotlight')

async function slMem() {
  data = await apiFetch(memberLink);
  validMems = findValidMembers(data.members);
  mems = selectMembers(validMems);
  mems.forEach(member => {
    displayMember(member, sldiv);
  })
}
if (sldiv) {
  slMem();
}

/* Directory Page */
const cards = document.querySelector("#cards");

async function displayMembers() {
  const data = await apiFetch(memberLink);
  const members = data.members;

  members.forEach((member) => {
    let card = document.createElement("section");
    let name = document.createElement("a");
    let image = document.createElement("img");
    let address = document.createElement("h3");
    let phone = document.createElement("h3");
    let hours = document.createElement("div");
    let level = document.createElement("h4");

    name.textContent = member.name;
    name.href = member.url;
    name.target = "_blank";
    address.textContent = member.address;
    phone.textContent = member.phone;

    let memberLevel = member.level;

    let sign = "🥇";

    if (memberLevel == "Silver") {
      sign = "🥈";
    } else if (memberLevel == "Bronze") {
      sign = "🥉";
    }

    level.textContent = sign + member.level + " Level Member";

    member.hours.forEach((time) => {
      let timeElement = document.createElement("h5");
      timeElement.textContent = time;
      hours.appendChild(timeElement);
    });

    image.setAttribute("src", member.image);
    image.setAttribute("alt", member.name);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "100px");
    image.setAttribute("height", "440px");

    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(image);
    card.appendChild(hours);
    card.appendChild(level);

    cards.appendChild(card);
  });
}
if (cards) {
  displayMembers();
}

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

if (gridbutton) {
  gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
  });

  listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
  });
}

// JavaScript for displaying visit messages
document.addEventListener("DOMContentLoaded", function () {
  let currentDate = Date.now();
  if (document.getElementById("visits")) {
    let lastVisit = localStorage.getItem("lastVisit");
    let oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    if (!lastVisit) {
      document.getElementById("visits").innerText =
        "Welcome! Let us know if you have any questions.";
    } else {
      lastVisit = parseInt(lastVisit);
      let daysPassed = Math.round(Math.abs((currentDate - lastVisit) / oneDay));

      if (daysPassed < 1) {
        document.getElementById("visits").innerText = "Back so soon? Awesome!";
      } else {
        let message = "You last visited " + daysPassed + " day";
        if (daysPassed > 1) {
          message += "s";
        }
        message += " ago.";
        document.getElementById("visits").innerText = message;
      }
    }
  }
  localStorage.setItem("lastVisit", currentDate);
});

document.getElementById("lastModified").textContent = document.lastModified;
