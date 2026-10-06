// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { addBookmark } from "./alina/bookmarkForm.js";
import { getLikeCount, likeBookmark } from "./alina/likes.js";
import { createDropdown } from "./dropDown.js";
import { displayBookmarks } from "./bookmarkDisplay.js";

const select = createDropdown();

// The user that is selected in the dropdown.
let currentUserId = select.value;

const form = document.querySelector("#bookmark-form");
const bookmarksContainer = document.querySelector("#bookmarks");

// When another user is selected, show the bookmarks of that user.
select.addEventListener("change", function () {
  currentUserId = select.value;
  showBookmarks();
});

function showBookmarks() {
  const bookmarks =
    JSON.parse(localStorage.getItem(`stored-data-user-${currentUserId}`)) || [];

  bookmarksContainer.innerHTML = "";

  // If the user has no bookmarks, show a message to explain this.
  if (bookmarks.length === 0) {
    const message = document.createElement("p");
    message.textContent = "This user has no bookmarks yet.";
    bookmarksContainer.appendChild(message);
    return;
  }

  bookmarks.forEach((bookmark) => {
    const bookmarkElement = document.createElement("div");

  displayBookmarks(bookmarks, bookmarksContainer);

  const bookmarkElements =
    bookmarksContainer.querySelectorAll(".bookmark-item");

  bookmarkElements.forEach((element, index) => {
    const bookmark = [...bookmarks].sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0),
    )[index];

    const likeButton = document.createElement("button");
    likeButton.textContent = `❤️ ${getLikeCount(bookmark)}`;

    likeButton.addEventListener("click", () => {
      const newCount = likeBookmark(bookmark);
      likeButton.textContent = `❤️ ${newCount}`;
    });

    element.appendChild(likeButton);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const bookmark = {
    url: form.elements.url.value,
    title: form.elements.title.value,
    description: form.elements.description.value,
    createdAt: Date.now(),
  };

  addBookmark(currentUserId, bookmark);
  form.reset();
  showBookmarks();
});

showBookmarks();
