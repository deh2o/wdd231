
const spotlightsContainer = document.querySelector("#spotlights");

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Unable to load business members.");
    }

    const data = await response.json();
    const members = data.members;

    // Select only Gold (3) and Silver (2) members
    const eligibleMembers = members.filter(
      (member) => member.membership === 3 || member.membership === 2
    );

    // Randomly shuffle eligible members
    const shuffledMembers = [...eligibleMembers];

    for (let i = shuffledMembers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledMembers[i], shuffledMembers[j]] = [
        shuffledMembers[j],
        shuffledMembers[i],
      ];
    }

    // Select up to 3 random members
    const selectedMembers = shuffledMembers.slice(0, 3);

    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error("Error loading spotlights:", error);
    spotlightsContainer.textContent = "Unable to load business spotlights.";
  }
}

function displaySpotlights(members) {
  spotlightsContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.loading = "lazy";

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const address = document.createElement("p");
    address.textContent = member.address;

    const membership = document.createElement("p");
    membership.textContent =
      member.membership === 3 ? "Gold Member" : "Silver Member";

    const website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    card.append(name, image, phone, address, membership, website);

    spotlightsContainer.appendChild(card);
  });
}

getSpotlights();
