export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function sortBookmarks(bookmarks) {
  return [...bookmarks].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export function displayBookmarks(bookmarks, container, actions) {
  const sortedBookmarks = sortBookmarks(bookmarks);
  container.innerHTML = "";

  sortedBookmarks.forEach((bookmark) => {
    const bookmarkElement = createBookmarkElement(bookmark, actions);
    container.appendChild(bookmarkElement);
  });
}

export function createBookmarkElement(bookmark, actions = {}) {
  const onCopy = actions.onCopy || (async () => false);
  const onLike = actions.onLike || (() => 0);
  const getLikeCount = actions.getLikeCount || (() => 0);

  const bookmarkElement = document.createElement("div");
  bookmarkElement.className = "bookmark-item";

  const titleLink = document.createElement("a");
  titleLink.href = bookmark.url;
  titleLink.textContent = bookmark.title;
  titleLink.target = "_blank";
  titleLink.rel = "noopener noreferrer";

  const titleHeading = document.createElement("h3");
  titleHeading.appendChild(titleLink);

  const description = document.createElement("p");
  description.textContent = bookmark.description;

  const timestamp = document.createElement("p");
  timestamp.textContent = `Created: ${formatDate(bookmark.createdAt)}`;

  const actionsContainer = document.createElement("div");

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.textContent = "Copy to clipboard";

  const copyStatus = document.createElement("span");
  copyStatus.setAttribute("role", "status");
  copyStatus.setAttribute("aria-live", "polite");

  copyButton.addEventListener("click", async () => {
    const copied = await onCopy(bookmark.url);
    copyStatus.textContent = copied
      ? "Copied URL to clipboard."
      : "Unable to copy URL.";
  });

  const likeButton = document.createElement("button");
  likeButton.type = "button";

  const updateLikeText = (count) => {
    likeButton.textContent = `❤️ ${count}`;
  };

  updateLikeText(getLikeCount(bookmark));

  likeButton.addEventListener("click", () => {
    const newCount = onLike(bookmark);
    updateLikeText(newCount);
  });

  actionsContainer.appendChild(copyButton);
  actionsContainer.appendChild(copyStatus);
  actionsContainer.appendChild(likeButton);

  bookmarkElement.appendChild(titleHeading);
  bookmarkElement.appendChild(description);
  bookmarkElement.appendChild(timestamp);
  bookmarkElement.appendChild(actionsContainer);

  return bookmarkElement;
}
