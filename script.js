import { addBookmark } from "./alina/bookmarkForm.js";
import { getLikeCount, likeBookmark } from "./alina/likes.js";
import { displayBookmarks } from "./bookmarkDisplay.js";
import { createDropdown } from "./dropDown.js";
import { getData } from "./storage.js";

const select = createDropdown();
const form = document.querySelector("#bookmark-form");
const bookmarksContainer = document.querySelector("#bookmarks");

let currentUserId = select.value;

async function copyToClipboard(text) {
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function showBookmarks() {
  const bookmarks = getData(currentUserId) || [];
  bookmarksContainer.innerHTML = "";

  if (bookmarks.length === 0) {
    const message = document.createElement("p");
    message.setAttribute("role", "status");
    message.textContent = "This user has no bookmarks yet.";
    bookmarksContainer.appendChild(message);
    return;
  }

  displayBookmarks(bookmarks, bookmarksContainer, {
    onCopy: copyToClipboard,
    onLike: likeBookmark,
    getLikeCount,
  });
}

select.addEventListener("change", () => {
  currentUserId = select.value;
  showBookmarks();
});

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
