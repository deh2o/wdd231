
const timestampField = document.querySelector("#timestamp");

// Store the date and time when the application page is loaded.
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// Open the membership dialog linked from each card.
const modalLinks = document.querySelectorAll(".modal-link");

modalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const modalId = link.dataset.modal;
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.showModal();
    }
  });
});

// Close a dialog using its Close button.
document.querySelectorAll(".modal-close").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// Close a dialog when the user clicks its backdrop.
document.querySelectorAll(".membership-modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});
