import { getUserIds } from "./storage.js";

export function createDropdown() {
  const wrapper = document.querySelector("#user-selector");
  const label = document.createElement("label");
  const select = document.createElement("select");
  label.setAttribute("for", "user-select");
  label.textContent = "User";
  select.id = "user-select";
  select.name = "user";

  const userIds = getUserIds();

  for (let i = 0; i < userIds.length; i++) {
    const option = document.createElement("option");
    option.value = userIds[i];
    option.textContent = "User " + userIds[i];
    select.appendChild(option);
  }

  const target = wrapper || document.body;
  target.appendChild(label);
  target.appendChild(select);

  // Give the dropdown back, so other files can read the selected user.
  return select;
}
