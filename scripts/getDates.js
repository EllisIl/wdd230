var currentYear = new Date().getFullYear();
document.getElementById("year").textContent = `${currentYear}${'\u00A9'} | Elijah Foard | USA`;

var lastModified = document.lastModified
document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;