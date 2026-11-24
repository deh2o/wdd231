
const params = new URLSearchParams(window.location.search);

function displayFormValue(fieldName, elementId) {
  const value = params.get(fieldName);
  const output = document.getElementById(elementId);

  if (output) {
    output.textContent = value || "Not provided";
  }
}

displayFormValue("firstName", "summary-first-name");
displayFormValue("lastName", "summary-last-name");
displayFormValue("email", "summary-email");
displayFormValue("phone", "summary-phone");
displayFormValue("organization", "summary-organization");

const timestamp = params.get("timestamp");
const timestampOutput = document.querySelector("#summary-timestamp");

if (timestamp && timestampOutput) {
  const parsedDate = new Date(timestamp);

  timestampOutput.textContent = Number.isNaN(parsedDate.getTime())
    ? timestamp
    : parsedDate.toLocaleString();
}
