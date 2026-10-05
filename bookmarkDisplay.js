import { getLikeCount, likeBookmark } from "./likes.js";

export function displayUserBookmarks(userId, bookmarksList, getData) {
  const data = getData(userId);

  bookmarksList.innerHTML = "";

  if (!data || data.length === 0) {
    const message = document.createElement("p");
    message.textContent = "This user has no bookmarks yet.";
    bookmarksList.appendChild(message);
    return;
  }

  // Robust reverse-chronological sort handling numbers, date strings, or missing dates
  const sortedBookmarks = [...data].sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });

  sortedBookmarks.forEach((bookmark) => {
    const article = document.createElement("article");

    // Title Link
    const titleLink = document.createElement("a");
    titleLink.href = bookmark.url;
    titleLink.textContent = bookmark.title;
    titleLink.target = "_blank";

    // Description
    const description = document.createElement("p");
    description.textContent = bookmark.description;

    // Timestamp
    const createdAt = document.createElement("time");
    if (bookmark.createdAt) {
      createdAt.textContent = new Date(bookmark.createdAt).toLocaleString();
    }

    // Copy Button
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.textContent = "Copy to clipboard";
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(bookmark.url).then(() => {
        copyButton.textContent = "Copied!";
        setTimeout(() => {
          copyButton.textContent = "Copy to clipboard";
        }, 2000);
      });
    });

    // Like Button
    const likeButton = document.createElement("button");
    likeButton.type = "button";
    likeButton.textContent = `❤️ ${getLikeCount(bookmark)}`;
    likeButton.addEventListener("click", () => {
      const newCount = likeBookmark(bookmark);
      likeButton.textContent = `❤️ ${newCount}`;
    });

    article.appendChild(titleLink);
    article.appendChild(description);
    article.appendChild(createdAt);
    article.appendChild(copyButton);
    article.appendChild(likeButton);

    bookmarksList.appendChild(article);
  });
}
