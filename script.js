import { addBookmark } from "./alina/bookmarkForm.js";
import { getLikeCount, likeBookmark } from "./alina/likes.js";
import { createDropdown } from "./dropDown.js";
import { displayBookmarks } from "./bookmarkDisplay.js";

const select = createDropdown();
let currentUserId = select.value;

const form = document.querySelector("#bookmark-form");
const bookmarksContainer = document.querySelector("#bookmarks");

select.addEventListener("change", function () {
  currentUserId = select.value;
  showBookmarks();
});

function showBookmarks() {
  const bookmarks =
    JSON.parse(localStorage.getItem(`stored-data-user-${currentUserId}`)) || [];

  if (bookmarks.length === 0) {
    bookmarksContainer.innerHTML = "";
    const message = document.createElement("p");
    message.textContent = "This user has no bookmarks yet.";
    bookmarksContainer.appendChild(message);
    return;
  }

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
