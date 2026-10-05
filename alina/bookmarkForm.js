import { getData, setData } from "../storage.js";

export function addBookmark(userId, bookmark) {
  const bookmarks = getData(userId) || [];

  const updatedBookmarks = [...bookmarks, bookmark];

  setData(userId, updatedBookmarks);

  return updatedBookmarks;
}
