// Define baseURL
const baseURL = "https://ellisil.github.io/wdd230/";

// Define linksURL
const linksURL = baseURL + "data/links.json";

// Asynchronous function to get the links data
async function getLinks() {
  try {
    const response = await fetch(linksURL);
    const data = await response.json();
    console.log(data); // Testing JSON result
    displayLinks(data.weeks);
  } catch (error) {
    console.error('Error fetching links data:', error);
  }
}

// Function to display links
function displayLinks(weeks) {
  const linksContainer = document.getElementById('links-container'); // Assuming you have a container element with id 'links-container' in your HTML
  weeks.forEach(week => {
    const weekHeader = document.createElement('h2');
    weekHeader.textContent = week.week;
    linksContainer.appendChild(weekHeader);
    
    const linksList = document.createElement('ul');
    week.links.forEach(link => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = link.url;
      anchor.textContent = link.title;
      listItem.appendChild(anchor);
      linksList.appendChild(listItem);
    });
    
    linksContainer.appendChild(linksList);
  });
}

// Call the getLinks function to initiate the process
getLinks();
