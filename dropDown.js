import { getUserIds, getData } from "./storage.js";

export function createDropdown() {
  const select = document.createElement("select");

  const userIds = getUserIds();

  for (let i = 0; i < userIds.length; i++) {
    const option = document.createElement("option");
    option.value = userIds[i];
    option.textContent = "User " + userIds[i];
    select.appendChild(option);
  }

  // The bookmarks of the selected user go in this list.
  const list = document.createElement("ul");

  // When another user is selected, show the bookmarks of that user.
  select.addEventListener("change", function () {
    showBookmarks(select.value, list);
  });

  document.body.appendChild(select);
  document.body.appendChild(list);

  // Show the bookmarks of the first user when the page opens.
  showBookmarks(select.value, list);
}

function showBookmarks(userId, list) {
  // Remove the bookmarks of the user that was selected before.
  list.innerHTML = "";

  const bookmarks = getData(userId);

  // A user with no saved bookmarks gives null, so there is nothing to show.
  if (bookmarks === null) {
    return;
  }

  for (let i = 0; i < bookmarks.length; i++) {
    const item = document.createElement("li");
    item.textContent = bookmarks[i].title + ": " + bookmarks[i].description;
    list.appendChild(item);
  }
}
