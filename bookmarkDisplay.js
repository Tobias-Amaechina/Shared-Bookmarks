export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function displayBookmarks(bookmarks, container) {
  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    return (b.createdAt || 0) - (a.createdAt || 0);
  });

  container.innerHTML = "";

  sortedBookmarks.forEach((bookmark) => {
    const bookmarkElement = createBookmarkElement(bookmark);
    container.appendChild(bookmarkElement);
  });
}

export function createBookmarkElement(bookmark) {
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

  bookmarkElement.appendChild(titleHeading);
  bookmarkElement.appendChild(description);
  bookmarkElement.appendChild(timestamp);

  return bookmarkElement;
}

export function getBookmarksForUser(userId) {
  const stored = localStorage.getItem(`stored-data-user-${userId}`);
  return stored ? JSON.parse(stored) : [];
}
