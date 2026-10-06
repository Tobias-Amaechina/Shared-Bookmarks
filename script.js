// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";
import { addBookmark } from "./alina/bookmarkForm.js";
import { getLikeCount, likeBookmark } from "./alina/likes.js";

window.onload = function () {
  const users = getUserIds();
  document.querySelector("body").innerText = `There are ${users.length} users`;
};

import { createDropdown } from "./dropDown.js";

window.onload = function () {
  createDropdown();
};
const users = getUserIds();
const currentUserId = users[0];

const form = document.querySelector("#bookmark-form");
const bookmarksContainer = document.querySelector("#bookmarks");

function showBookmarks() {
  const bookmarks =
    JSON.parse(localStorage.getItem(`stored-data-user-${currentUserId}`)) || [];

  bookmarksContainer.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    const bookmarkElement = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = bookmark.title;

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.url;
    link.target = "_blank";

    const likeButton = document.createElement("button");
    likeButton.textContent = `❤️ ${getLikeCount(bookmark)}`;

    likeButton.addEventListener("click", () => {
      const newCount = likeBookmark(bookmark);
      likeButton.textContent = `❤️ ${newCount}`;
    });

    bookmarkElement.appendChild(title);
    bookmarkElement.appendChild(description);
    bookmarkElement.appendChild(link);
    bookmarkElement.appendChild(likeButton);

    bookmarksContainer.appendChild(bookmarkElement);
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
