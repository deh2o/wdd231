const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";

const cards = document.querySelector("#cards");

// Fetch prophet data from the JSON resource
async function getProphetData() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request Failed: ${response.status}`);
    }

    const data = await response.json();

    // Temporary testing
    // console.table(data.prophets);

    displayProphets(data.prophets);
  } catch (error) {
    console.error("Error fetching prophet data:", error);
    cards.textContent = "Sorry, the prophet information could not be loaded.";
  }
}

// Display prophet cards
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create HTML elements
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const portrait = document.createElement("img");
    const birthDate = document.createElement("p");
    const birthPlace = document.createElement("p");

    // Build the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Build the prophet's portrait
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `Portrait of ${prophet.name} ${prophet.lastname}`,
    );
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    // Add birth information
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Append elements to the card
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);

    // Add the completed card to the page
    cards.appendChild(card);
  });
};

// Call the function
getProphetData();
