const LIKES_KEY = "bookmark-likes";

function getLikes() {
  return JSON.parse(localStorage.getItem(LIKES_KEY)) || {};
}

function getBookmarkId(bookmark) {
  return `${bookmark.url}-${bookmark.createdAt}`;
}

export function getLikeCount(bookmark) {
  const likes = getLikes();
  const bookmarkId = getBookmarkId(bookmark);

  return likes[bookmarkId] || 0;
}

export function likeBookmark(bookmark) {
  const likes = getLikes();
  const bookmarkId = getBookmarkId(bookmark);

  likes[bookmarkId] = (likes[bookmarkId] || 0) + 1;

  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));

  return likes[bookmarkId];
}
