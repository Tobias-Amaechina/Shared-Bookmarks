function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function sortBookmarks(bookmarks) {
  return [...bookmarks].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export function displayBookmarks(bookmarks, container) {
  const sortedBookmarks = sortBookmarks(bookmarks);

  container.innerHTML = "";

  sortedBookmarks.forEach((bookmark) => {
    const bookmarkElement = createBookmarkElement(bookmark);
    container.appendChild(bookmarkElement);
  });
}

function createBookmarkElement(bookmark) {
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
  actionsContainer.className = "bookmark-actions";

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.textContent = "Copy to clipboard";

  const likeButton = document.createElement("button");
  likeButton.type = "button";
  likeButton.className = "like-button";
  likeButton.textContent = "❤️ 0";

  const copyStatus = document.createElement("span");
  copyStatus.setAttribute("role", "status");
  copyStatus.setAttribute("aria-live", "polite");

  copyButton.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(bookmark.url);
        copyStatus.textContent = "✓ Copied URL to clipboard";

        setTimeout(() => {
          copyStatus.textContent = "";
        }, 2000);
      } else {
        copyStatus.textContent = "✗ Copy not supported";
      }
    } catch (err) {
      copyStatus.textContent = "✗ Unable to copy URL";
    }
  });

  bookmarkElement.appendChild(titleHeading);
  bookmarkElement.appendChild(description);
  bookmarkElement.appendChild(timestamp);

  actionsContainer.appendChild(copyButton);
  actionsContainer.appendChild(copyStatus);
  actionsContainer.appendChild(likeButton);

  bookmarkElement.appendChild(actionsContainer);

  return bookmarkElement;
}
