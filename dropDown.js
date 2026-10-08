import { getUserIds } from "./storage.js";

export function createDropdown() {
  const select = document.createElement("select");
  select.setAttribute("aria-label", "Select a user");
  const userIds = getUserIds();

  for (let i = 0; i < userIds.length; i++) {
    const option = document.createElement("option");
    option.value = userIds[i];
    option.textContent = "User " + userIds[i];
    select.appendChild(option);
  }

  document.querySelector("#user-selection").appendChild(select);

  // Give the dropdown back, so other files can read the selected user.
  return select;
}
