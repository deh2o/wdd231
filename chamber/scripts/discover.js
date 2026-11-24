import { places } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

function displayPlaces() {
  discoverGrid.innerHTML = "";

  places.forEach((place, index) => {
    const card = document.createElement("article");
    card.className = `discover-card place-${index + 1}`;

    const heading = document.createElement("h2");
    heading.textContent = place.name;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = `../images/${place.image}`;
    image.alt = place.alt;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";
    figure.append(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const moreText = document.createElement("p");
    moreText.className = "discover-more";
    moreText.textContent = place.more;
    moreText.hidden = true;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "learn-more";
    button.textContent = "Learn more";
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      moreText.hidden = isExpanded;
      button.setAttribute("aria-expanded", String(!isExpanded));
      button.textContent = isExpanded ? "Learn more" : "Show less";
    });

    card.append(heading, figure, address, description, moreText, button);
    discoverGrid.append(card);
  });
}

function displayVisitMessage() {
  const storageKey = "abakalikiDiscoverLastVisit";
  const currentVisit = Date.now();
  const previousVisit = localStorage.getItem(storageKey);

  if (!previousVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const elapsedMilliseconds = currentVisit - Number(previousVisit);
    const oneDay = 24 * 60 * 60 * 1000;

    if (elapsedMilliseconds < oneDay) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(elapsedMilliseconds / oneDay);
      const dayWord = days === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${days} ${dayWord} ago.`;
    }
  }

  localStorage.setItem(storageKey, String(currentVisit));
}

displayPlaces();
displayVisitMessage();