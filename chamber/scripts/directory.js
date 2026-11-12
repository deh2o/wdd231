
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        displayMembers(data.members);
    } catch (error) {
        console.error("Unable to load chamber members:", error);

        membersContainer.innerHTML =
            "<p class='error-message'>Sorry, the business directory could not be loaded. Please try again later.</p>";
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const heading = document.createElement("div");
        heading.classList.add("member-heading");

        const name = document.createElement("h2");
        name.textContent = member.name;

        const tagline = document.createElement("p");
        tagline.classList.add("tagline");
        tagline.textContent = member.tagline;

        heading.appendChild(name);
        heading.appendChild(tagline);

        const details = document.createElement("div");
        details.classList.add("member-details");

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} business`;
        image.loading = "lazy";
        image.width = 150;
        image.height = 120;

        const information = document.createElement("div");
        information.classList.add("member-information");

        const address = document.createElement("p");
        address.innerHTML = "<strong>Address:</strong> ";
        address.append(document.createTextNode(member.address));

        const phone = document.createElement("p");
        phone.innerHTML = "<strong>Phone:</strong> ";
        phone.append(document.createTextNode(member.phone));

        const email = document.createElement("p");
        email.innerHTML = "<strong>Email:</strong> ";
        email.append(document.createTextNode(member.email));

        const website = document.createElement("p");
        website.innerHTML = "<strong>Website:</strong> ";

        const websiteLink = document.createElement("a");
        websiteLink.href = member.website;
        websiteLink.textContent = "Visit Website";
        websiteLink.target = "_blank";
        websiteLink.rel = "noopener noreferrer";

        website.appendChild(websiteLink);

        const membership = document.createElement("p");
        membership.innerHTML = "<strong>Membership:</strong> ";
        membership.append(
            document.createTextNode(getMembershipName(member.membership))
        );

        const description = document.createElement("p");
        description.classList.add("member-description");
        description.textContent = member.description;

        information.append(
            address,
            phone,
            email,
            website,
            membership,
            description
        );

        details.append(image, information);
        card.append(heading, details);

        membersContainer.appendChild(card);
    });
}

function getMembershipName(level) {
    const membershipLevels = {
        1: "Member",
        2: "Silver",
        3: "Gold"
    };

    return membershipLevels[level] || "Member";
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("members-grid");
    membersContainer.classList.remove("members-list");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("members-list");
    membersContainer.classList.remove("members-grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

getMembers();
