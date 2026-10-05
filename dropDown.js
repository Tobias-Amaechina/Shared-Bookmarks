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

  // The bookmarks of the selected user go in this box.
  const container = document.createElement("div");

  // When another user is selected, show the bookmarks of that user.
  select.addEventListener("change", function () {
    showBookmarks(select.value, container);
  });

  document.body.appendChild(select);
  document.body.appendChild(container);

  // Show the bookmarks of the first user when the page opens.
  showBookmarks(select.value, container);
}

function showBookmarks(userId, container) {
  // Remove what was shown for the user that was selected before.
  container.innerHTML = "";

  const bookmarks = getData(userId);

  // If the user has no bookmarks, show a message to explain this.
  if (bookmarks === null || bookmarks.length === 0) {
    const message = document.createElement("p");
    message.textContent = "This user has no bookmarks yet.";
    container.appendChild(message);
    return;
  }

  const list = document.createElement("ul");

  for (let i = 0; i < bookmarks.length; i++) {
    const item = document.createElement("li");
    item.textContent = bookmarks[i].title + ": " + bookmarks[i].description;
    list.appendChild(item);
  }

  container.appendChild(list);
}
